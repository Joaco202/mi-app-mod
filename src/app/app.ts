import { Component, computed, signal, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IProduct } from './product';
import { ProductList } from './features/products/components/product-list/product-list';
import { ModalAdd } from './features/products/components/modal-add/modal-add';

import { Product } from './features/products/interfaces/product';

import { switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ProductList, ModalAdd],
  templateUrl: './app.html',
  standalone: true,
  styleUrls: ['./app.css']
})
export class App implements OnInit, OnChanges, OnDestroy {
  protected readonly title = signal('Empresa ACME');
  listFilter= signal('');
  datoRecibido = signal('');
  isModalOpen = signal(false);

  constructor(private productService: Product) {}

  ngOnInit(): void{
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.productService.products.set(products);
    });
  }
  
  filteredProducts = computed(() => 
    this.productService.products().filter(p => 
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
    ).subscribe((products => this.productService.products.set(products)));
  }

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

onModalClose(products: IProduct[]) {
  if (products && products.length) {
    this.productService.products.set(products);
  }
  this.cerrarModal();
}

  onProductsUpdated(products: IProduct[]) {
    this.productService.products.set(products);
  }
}


