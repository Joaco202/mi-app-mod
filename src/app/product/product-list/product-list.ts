import { Component, input } from '@angular/core';
import { IProduct } from '../../product';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products = input<IProduct[]>([],{alias: 'datos'});
  imageWidth: number = 80;
  imageHeight: number = 50;
  imageMargin: number = 10;
  showImage: boolean = false;

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
