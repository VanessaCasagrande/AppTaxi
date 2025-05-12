import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DashboardPage implements OnInit {
  @ViewChild('corridasChart') corridasChart!: ElementRef;

  // Dados de exemplo
  totalMotoristas = 25;
  corridasHoje = 48;
  totalClientes = 156;
  faturamentoHoje = '1.250,00';

  ultimasCorridas = [
    {
      motorista: 'João Silva',
      origem: 'Centro',
      destino: 'Zona Sul',
      valor: '35,00',
      status: 'concluída'
    },
    {
      motorista: 'Maria Santos',
      origem: 'Zona Norte',
      destino: 'Aeroporto',
      valor: '85,00',
      status: 'em andamento'
    },
    {
      motorista: 'Pedro Oliveira',
      origem: 'Zona Leste',
      destino: 'Shopping',
      valor: '45,00',
      status: 'concluída'
    }
  ];

  constructor() {}

  ngOnInit() {
    // Inicialização do gráfico será feita após a view ser carregada
  }

  ngAfterViewInit() {
    this.inicializarGrafico();
  }

  private inicializarGrafico() {
    const ctx = this.corridasChart.nativeElement.getContext('2d');
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Corridas',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#FFD700',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Corridas por Dia da Semana'
          }
        }
      }
    });
  }
}
