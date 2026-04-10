import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IProduct } from './product';
import { ProductList } from './product/product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ProductList],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Empresa ACME');
  listFilter= signal('');
  datoRecibido = signal('');

  products = signal<IProduct[]>([
    {
      productId: 1,
      productName: "AMD Ryzen 7 5800X",
      productCode: "P0001",
      releaseDate: "2024-02-04",
      price: 20000,
      description: "Para cosas",
      starRating: 160,
      imagenUrl: "/cpu.jpg"
    },    
    {
      productId: 2,
      productName: "NVIDIA GeForce GTX 1080-ti",
      productCode: "P0002",
      releaseDate: "2024-02-04",
      price: 20000,
      description: "Para cosas",
      starRating: 200,
      imagenUrl: "/1080ti.jpg"
    },    
    {
      productId: 3,
      productName: "Kingston Fury Beast (1 x 16 GB)",
      productCode: "P0003",
      releaseDate: "2024-06-04",
      price: 20000,
      description: "Para cosas",
      starRating: 120,
      imagenUrl: "/ram.jpg"
    },
  ]);

  filteredProducts = computed(() => 
    this.products().filter(product => 
      product.productName.toLowerCase().includes(this.listFilter().toLowerCase()))
  );

  constructor() {
    console.log('Padre: constructor');
  }

  ngOnInit():void {
    console.log('Padre: ngOnInit');
  }

  ngOnChanges():void {
    console.log('Padre: ngOnChanges');
  }

  ngOnDestroy():void {
    console.log('Padre: ngOnDestroy');
  }

  showChildren =signal(true);
  toggleChildren(): void {
    this.showChildren.update(value => !value);
  }
}
