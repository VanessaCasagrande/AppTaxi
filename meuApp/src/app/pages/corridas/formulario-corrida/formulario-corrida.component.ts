import { Component, EventEmitter, Input, Output, AfterViewInit, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Corrida } from '../../../models/corrida.type';
import { CalculadoraCorridaService } from '../service/calculadora-corrida.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { ClientesService } from '../../clientes/service/clientes.service';
import { MotoristasService } from '../../motoristas/service/motoristas.service';
import { VeiculosService } from '../../veiculos/service/veiculos.service';
import { Cliente } from '../../../models/cliente.type';
import { Motorista } from '../../../models/motorista.type';
import { Veiculo } from '../../../models/veiculo.type';

@Component({
  selector: 'app-formulario-corrida',
  templateUrl: './formulario-corrida.component.html',
  styleUrls: ['./formulario-corrida.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormularioCorridaComponent implements AfterViewInit, OnInit {
  @Input() corrida!: Corrida;
  @Input() editando = false;
  @Output() salvar = new EventEmitter<Corrida>();
  @Output() cancelar = new EventEmitter<void>();

  map!: L.Map;
  origemMarker?: L.Marker;
  destinoMarker?: L.Marker;
  rotaLayer?: L.Polyline;

  clientes: Cliente[] = [];
  motoristas: Motorista[] = [];
  veiculos: Veiculo[] = [];

  constructor(
    private calculadoraCorrida: CalculadoraCorridaService,
    private router: Router,
    private clientesService: ClientesService,
    private motoristasService: MotoristasService,
    private veiculosService: VeiculosService
  ) {}

  ngOnInit() {
    this.clientesService.getList().subscribe(clientes => this.clientes = clientes);
    this.motoristasService.getAll().subscribe(motoristas => this.motoristas = motoristas);
    this.veiculosService.getList().subscribe(veiculos => this.veiculos = veiculos);
  }

  ngAfterViewInit() {
    this.map = L.map('map').setView([-28.672566, -49.369687], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (!this.origemMarker) {
        this.origemMarker = L.marker(e.latlng, { draggable: true }).addTo(this.map);
        this.corrida.origem = `${e.latlng.lat},${e.latlng.lng}`;
      } else if (!this.destinoMarker) {
        this.destinoMarker = L.marker(e.latlng, { draggable: true }).addTo(this.map);
        this.corrida.destino = `${e.latlng.lat},${e.latlng.lng}`;
        this.tracarRota();
      }
    });
  }

  tracarRota() {
    if (!this.origemMarker || !this.destinoMarker) return;
    const origem = this.origemMarker.getLatLng();
    const destino = this.destinoMarker.getLatLng();
    fetch(`https://router.project-osrm.org/route/v1/driving/${origem.lng},${origem.lat};${destino.lng},${destino.lat}?overview=full&geometries=geojson`)
      .then(res => res.json())
      .then(data => {
        const coords = data.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
        if (this.rotaLayer) this.map.removeLayer(this.rotaLayer);
        this.rotaLayer = L.polyline(coords, { color: 'blue' }).addTo(this.map);
        this.map.fitBounds(this.rotaLayer.getBounds(), { maxZoom: 16, padding: [40, 40] });
        // Distância em km
        const distanciaKm = data.routes[0].distance / 1000;
        this.corrida.distanciaKm = distanciaKm;
        this.calcularValor();
      });
  }

  calcularValor() {
    // Exemplo: R$ 5,00 + R$ 2,00 por km
    this.corrida.valor = 5 + (this.corrida.distanciaKm * 2);
  }

  onSubmit() {
    this.salvar.emit(this.corrida);
    this.router.navigate(['/corridas']);
  }

  onCancel() {
    this.resetarMapa();
    this.cancelar.emit();
    this.router.navigate(['/corridas']);
  }

  usarGeolocalizacao() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.corrida.origem = `${lat},${lng}`;
          if (this.map) {
            if (this.origemMarker) {
              this.map.removeLayer(this.origemMarker);
            }
            this.origemMarker = L.marker([lat, lng], { draggable: true }).addTo(this.map);
          }
        },
        (error) => {
          alert('Não foi possível obter sua localização.');
        }
      );
    } else {
      alert('Geolocalização não suportada pelo navegador.');
    }
  }

  async geocodificarOrigem() {
    if (this.corrida.origem && !this.corrida.origem.match(/^[-+]?\d+\.\d+,\s*[-+]?\d+\.\d+$/)) {
      const coords = await this.geocodificarEndereco(this.corrida.origem);
      if (coords) {
        this.corrida.origem = `${coords.lat},${coords.lng}`;
        if (this.map) {
          if (this.origemMarker) this.map.removeLayer(this.origemMarker);
          this.origemMarker = L.marker([coords.lat, coords.lng], { draggable: true }).addTo(this.map);
        }
      }
    }
  }

  async geocodificarDestino() {
    if (this.corrida.destino && !this.corrida.destino.match(/^[-+]?\d+\.\d+,\s*[-+]?\d+\.\d+$/)) {
      const coords = await this.geocodificarEndereco(this.corrida.destino);
      if (coords) {
        this.corrida.destino = `${coords.lat},${coords.lng}`;
        if (this.map) {
          if (this.destinoMarker) this.map.removeLayer(this.destinoMarker);
          this.destinoMarker = L.marker([coords.lat, coords.lng], { draggable: true }).addTo(this.map);
        }
      }
    }
  }

  async geocodificarEndereco(endereco: string): Promise<{lat: number, lng: number} | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
    } catch (e) {
      // erro silencioso
    }
    return null;
  }

  resetarMapa() {
    if (this.map){
      if (this.origemMarker){
        this.map.removeLayer(this.origemMarker);
        this.origemMarker = undefined;
      }
      if (this.destinoMarker) {
        this.map.removeLayer(this.destinoMarker);
        this.destinoMarker = undefined;
      }
      if (this.rotaLayer) {
        this.map.removeLayer(this.rotaLayer);
        this.rotaLayer = undefined;
      }
    }
  }
} 