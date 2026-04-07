import { Component, computed, signal } from '@angular/core';

import { IProduct } from './product';

@Component({
  selector: 'app-root',
  /*imports: [ 
    RouterOutlet,
    NgFor,
    NgIf
  ],*/
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Empresa ACME');
  listFilter= signal('');

  products = signal<IProduct[]>([
    {
      productId: 1,
      productName: "AMD Ryzen 7 5800X",
      productCode: "P0001",
      releaseDate: "2024-02-04",
      price: 20000,
      description: "Para cosas",
      starRating: 4,
      imagenUrl: "/cpu.jpg"
    },    
    {
      productId: 2,
      productName: "NVIDIA GeForce GTX 1080-ti",
      productCode: "P0002",
      releaseDate: "2024-02-04",
      price: 20000,
      description: "Para cosas",
      starRating: 4,
      imagenUrl: "/1080ti.jpg"
    },    
    {
      productId: 3,
      productName: "Kingston Fury Beast (1 x 16 GB)",
      productCode: "P0003",
      releaseDate: "2024-06-04",
      price: 20000,
      description: "Para cosas",
      starRating: 4,
      imagenUrl: "/ram.jpg"
    },
  ]);

  filteredProducts = computed(() => 
    this.products().filter(product => 
      product.productName.toLowerCase().includes(this.listFilter().toLowerCase()))
  );
}
