import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Permite usar <ion-icon>
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.setupMenu();
    this.createBurndownChart();
  }

  private setupMenu() {
    const list = document.querySelectorAll(".navigation li");

    list.forEach((item) => {
      item.addEventListener("mouseover", () => {
        list.forEach((i) => i.classList.remove("hovered"));
        item.classList.add("hovered");
      });

      item.addEventListener("mouseout", () => {
        item.classList.remove("hovered");
        const activeItem = document.querySelector(".navigation li a.active");
        if (activeItem) {
          const li = activeItem.closest("li");
          li?.classList.add("hovered");
        }
      });
    });

    const toggle = document.querySelector(".toggle");
    const navigation = document.querySelector(".navigation");
    const main = document.querySelector(".main");

    toggle?.addEventListener("click", () => {
      navigation?.classList.toggle("active");
      main?.classList.toggle("active");
    });

    const links = document.querySelectorAll(".navigation li a");

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        links.forEach((l) => l.classList.remove("active"));
        const clickedLink = event.currentTarget as HTMLElement;
        clickedLink.classList.add("active");
        list.forEach((i) => i.classList.remove("hovered"));
        clickedLink.closest("li")?.classList.add("hovered");

        const sectionTarget = clickedLink.getAttribute("data-section");
        if (!sectionTarget) return;

        document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));

        const targetSection = document.getElementById(`section-${sectionTarget}`);
        if (targetSection) {
          targetSection.classList.add("active");
        } else {
          console.warn(`Seção com id="section-${sectionTarget}" não encontrada.`);
        }
      });
    });
  }

  private createBurndownChart() {
    const totalDias = 7;
    const pontosTotais = 35;

    // Linha Ideal: linear, decrescendo de 35 a 0
    const ideal = Array.from({ length: totalDias }, (_, i) =>
      Math.round(pontosTotais - (pontosTotais / (totalDias - 1)) * i)
    );

    // Linha Real: exemplo de progresso real
    const real = [35, 33, 28, 26, 22, 18, 12]; // Você pode puxar isso da API depois

    const data = {
      labels: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'],
      datasets: [
        {
          label: 'Ideal',
          data: ideal,
          borderColor: '#999',
          borderDash: [10, 5],
          fill: false,
          tension: 0,
        },
        {
          label: 'Real',
          data: real,
          borderColor: '#4bc0c0',
          backgroundColor: '#4bc0c0',
          fill: false,
          tension: 0.2,
        }
      ]
    };

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Dia da Sprint',
            }
          },
          y: {
            title: {
              display: true,
              text: 'Pontos Restantes',
            },
            min: 0,
            max: pontosTotais
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Gráfico de Burndown - Ideal vs Real'
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    };

    new Chart('burndownCanvas', config);
  }
}
