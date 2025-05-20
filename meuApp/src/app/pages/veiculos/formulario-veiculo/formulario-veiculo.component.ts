import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { VeiculosService } from '../service/veiculos.service';
import { Veiculo } from '../../../models/veiculo.type';

@Component({
  selector: 'app-formulario-veiculo',
  templateUrl: './formulario-veiculo.component.html',
  styleUrls: ['./formulario-veiculo.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FormularioVeiculoComponent implements OnInit {
  veiculo: Veiculo = {
    placa: '',
    modelo: '',
    marca: '',
    ano: new Date().getFullYear(),
    cor: '',
    status: 'ativo'
  };
  editando = false;

  constructor(
    private route: ActivatedRoute,
    private veiculosService: VeiculosService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.veiculosService.getById(+id).subscribe(veiculo => {
        this.veiculo = veiculo;
      });
    }
  }

  onSubmit() {
    if (this.editando && this.veiculo.id) {
      this.veiculosService.save(this.veiculo).subscribe({
        next: () => this.router.navigate(['/veiculos']),
        error: (err) => alert('Erro ao atualizar veículo: ' + err.message)
      });
    } else {
      this.veiculosService.save(this.veiculo).subscribe({
        next: () => this.router.navigate(['/veiculos']),
        error: (err) => alert('Erro ao criar veículo: ' + err.message)
      });
    }
  }

  onCancel() {
    this.router.navigate(['/veiculos']);
  }
}