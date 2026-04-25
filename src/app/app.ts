import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IProduct } from './product';
import { ProductList } from './product/product-list/product-list';
import { ModalAdd } from './services/modal-add/modal-add';

import { Product } from './product/product';

import { Weather } from './services/weather';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ProductList, ModalAdd],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Empresa ACME');
  listFilter= signal('');
  datoRecibido = signal('');
  
  products = signal<IProduct[]>([]);

  weatherData = signal<any>(null);

  constructor(private productService: Product, private weatherService: Weather) {}

  ngOnInit(): void{
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.products.set(products);
      console.log(this.products());
    });
  }
  
  filteredProducts = computed(() => 
    this.products().filter(p => 
      p.productName.toLowerCase().includes(this.listFilter().toLowerCase()))
  );

  /*constructor() {
    console.log('Padre: constructor');
  }

  ngOnInit():void {
    console.log('Padre: ngOnInit');
  }*/

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

  crearProducto() {
    let datos: any = {
      name: `Producto Nuevo ${Math.round(Math.random() * (100 - 1) + 1)}`,
      code: this.productService.generateProductCode(),
      date: '2024-01-01',
      price: Math.round(Math.random() * (40000 - 10000) + 10000),
      description: 'Descripción del producto nuevo',
      rate: Math.round(Math.random() * (200 - 1) + 1),
      image: 'ACME_logo.png'
    }
  }

  guardarProdcuto(product: IProduct) {
    console.log('Producto guardado:', product);
    this.productService.saveProduct(product).pipe(
      switchMap(() => this.productService.getProducts())
    ).subscribe((products => this.products.set(products)));
  }

isModalOpen = signal(false);

abrirModal() {
  console.log('Abriendo modal');
  this.isModalOpen.set(true);
  console.log(this.isModalOpen());
}

cerrarModal() {
  console.log('Cerrando modal');
  this.isModalOpen.set(false);
}

ocultarModal() {
  this.cerrarModal();
}
}


