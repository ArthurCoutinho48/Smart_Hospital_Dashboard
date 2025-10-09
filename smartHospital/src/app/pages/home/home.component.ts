import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // <-- permite usar <ion-icon>
})
export class HomeComponent {
  ngAfterViewInit(): void {
    // add hovered class to selected list item
    let list = document.querySelectorAll(".navigation li");

    function activeLink(this: any) {
      list.forEach((item) => {
        item.classList.remove("hovered");
      });
      this.classList.add("hovered");
    }

    list.forEach((item) => item.addEventListener("mouseover", activeLink));

    // Menu Toggle
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    toggle?.addEventListener("click", function() {
      navigation?.classList.toggle("active");
      main?.classList.toggle("active");
    });
  }
}
