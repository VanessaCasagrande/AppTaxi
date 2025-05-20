import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend } from 'chart.js';

// REGISTRE OS COMPONENTES ANTES DE USAR O CHART
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DashboardPage implements AfterViewInit {
  @ViewChild('corridasChart') corridasChartRef!: ElementRef;
  
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.inicializarGrafico();
    }, 100); // aumente o tempo aqui
  }

  private inicializarGrafico() {
    const ctx = this.corridasChartRef.nativeElement.getContext('2d');
    
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
        maintainAspectRatio: false,
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
