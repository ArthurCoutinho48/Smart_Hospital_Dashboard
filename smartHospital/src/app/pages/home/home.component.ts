import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Permite usar <ion-icon>
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // Selecionando a lista de itens de navegação
    const list = document.querySelectorAll(".navigation li");

    // Hover com restauração
    list.forEach((item) => {
      item.addEventListener("mouseover", () => {
        // Remover a classe 'hovered' de todos os itens
        list.forEach((i) => i.classList.remove("hovered"));
        // Adiciona 'hovered' no item atual
        item.classList.add("hovered");
      });

      item.addEventListener("mouseout", () => {
        // Remove a classe 'hovered' do item atual
        item.classList.remove("hovered");

        // Adiciona 'hovered' no item ativo (se houver)
        const activeItem = document.querySelector(".navigation li a.active");
        if (activeItem) {
          const li = activeItem.closest("li");
          li?.classList.add("hovered");
        }
      });
    });

    // Menu Toggle (abrir e fechar menu lateral)
    const toggle = document.querySelector(".toggle");
    const navigation = document.querySelector(".navigation");
    const main = document.querySelector(".main");

    toggle?.addEventListener("click", () => {
      navigation?.classList.toggle("active");
      main?.classList.toggle("active");
    });

    // Clique no menu e ativa a seção correspondente
    const links = document.querySelectorAll(".navigation li a");

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        // Remove 'active' de todos os links
        links.forEach((l) => l.classList.remove("active"));

        // Adiciona 'active' no link clicado
        const clickedLink = event.currentTarget as HTMLElement;
        clickedLink.classList.add("active");

        // Reaplica classe 'hovered' no li correspondente
        list.forEach((i) => i.classList.remove("hovered"));
        clickedLink.closest("li")?.classList.add("hovered");

        // Pega a seção alvo
        const sectionTarget = clickedLink.getAttribute("data-section");
        if (!sectionTarget) return;

        // Remove a classe 'active' de todas as seções
        document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));

        // Adiciona a classe 'active' na seção correspondente
        const targetSection = document.getElementById(`section-${sectionTarget}`);
        if (targetSection) {
          targetSection.classList.add("active");
        } else {
          console.warn(`Seção com id="section-${sectionTarget}" não encontrada.`);
        }
      });
    });
  }

}
