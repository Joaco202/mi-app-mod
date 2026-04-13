import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IProduct } from './product';
import { ProductList } from './product/product-list/product-list';

import { Product } from './product/product';

import { Weather } from './services/weather';

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
  
  products = signal<IProduct[]>([]);

  weatherData = signal<any>(null);

  constructor(private productService: Product, private weatherService: Weather) {}

  ngOnInit(): void{
    this.products.set(this.productService.getProducts());
    this.weatherService.getWeather('Chillan', 'CL').subscribe((data: any) => {
      console.log(data);
      this.weatherData.set(data);
    });
  }

  
  filteredProducts = computed(() => 
    this.products().filter(product => 
      product.productName.toLowerCase().includes(this.listFilter().toLowerCase()))
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
}
