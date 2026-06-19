import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-welcome',
  template: `
    <div class="welcome-container container-fluid py-4">
      <h1 class="mb-4 text-start fw-bold">Empresa ACME</h1>
      
      <div #carouselElement id="welcomeCarousel" class="carousel slide" data-bs-ride="carousel">
        <!-- Indicadores -->
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#welcomeCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#welcomeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#welcomeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#welcomeCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#welcomeCarousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
        </div>
        
        <!-- Diapositivas -->
        <div class="carousel-inner rounded shadow-sm">
          <div class="carousel-item active">
            <img src="img0.jpg" class="d-block w-100" alt="Empresa ACME Slide 1">
          </div>
          <div class="carousel-item">
            <img src="img1.jpg" class="d-block w-100" alt="Empresa ACME Slide 2">
          </div>
          <div class="carousel-item">
            <img src="img2.jpg" class="d-block w-100" alt="Empresa ACME Slide 3">
          </div>
          <div class="carousel-item">
            <img src="img3.jpg" class="d-block w-100" alt="Empresa ACME Slide 4">
          </div>
          <div class="carousel-item">
            <img src="img4.jpg" class="d-block w-100" alt="Empresa ACME Slide 5">
          </div>
        </div>
        
        <!-- Controles -->
        <button class="carousel-control-prev" type="button" data-bs-target="#welcomeCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#welcomeCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .welcome-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .carousel-item img {
      height: 450px;
      object-fit: cover;
    }
  `]
})
export class Welcome implements AfterViewInit {
  @ViewChild('carouselElement') carouselElement!: ElementRef;

  ngAfterViewInit() {
    if (typeof bootstrap !== 'undefined' && this.carouselElement) {
      new bootstrap.Carousel(this.carouselElement.nativeElement, {
        interval: 3500,
        ride: 'carousel',
        wrap: true
      });
    }
  }
}

