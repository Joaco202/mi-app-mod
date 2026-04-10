import { Component, input, output } from '@angular/core';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { IProduct } from '../../product';
import { Star } from './star/star';

@Component({
  selector: 'app-product-list',
  imports: [Star, NgxBootstrapIconsModule],
  standalone: true,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products = input<IProduct[]>([],{alias: 'datos'});
  datoEmitido = output<string>();
  imageWidth: number = 80;
  imageHeight: number = 50;
  imageMargin: number = 10;
  showImage: boolean = false;

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  constructor() {
    console.log('Hijo: constructor');
  }

  ngOnInit():void {
    console.log('Hijo: ngOnInit');
  }

  ngOnChanges():void {
    console.log('Hijo: ngOnChanges');
  }

  ngOnDestroy():void {
    console.log('Hijo: ngOnDestroy');
  }

}
