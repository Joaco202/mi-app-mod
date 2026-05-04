import { Component, input, output, inject, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { IProduct } from '../../../../product';
import { Star } from './star/star';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'app-product-list',
  imports: [Star, NgxBootstrapIconsModule, DatePipe],
  standalone: true,
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList implements OnInit, OnChanges, OnDestroy {
  products = input<IProduct[]>([],{alias: 'datos'});
  updatedProducts = output<IProduct[]>();
  datoEmitido = output<string>();
  imageWidth: number = 80;
  imageHeight: number = 50;
  imageMargin: number = 10;
  showImage: boolean = false;

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  private productService = inject(Product);

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

  deleteProduct(ProductId: number) {
    console.log('Borrando producto:', ProductId);
    this.productService.deleteProduct(ProductId).pipe(
      switchMap(() => this.productService.getProducts())
    ).subscribe({
      next: (products: IProduct[]) => {
        console.log('Llegó un dato');
        console.log('Producto eliminado', ProductId);
        this.updatedProducts.emit(products);
      },
      error: (error: any) => {
        console.error('Error al borrar producto:', error);
      },
      complete: () => console.log('Borrado de producto completado')
    });
  }
  
  editProduct(ProductId: number, product: IProduct) {
    let datos: any = {
      name: `Producto Actualizado ${Math.round(Math.random() * (100 - 1) + 1)}`,
      code: this.productService.generateProductCode(),
      date: '2024-01-01',
      price: Math.round(Math.random() * (40000 - 10000) + 10000),
      description: 'Descripción del producto nuevo',
      rate: Math.round(Math.random() * (200 - 1) + 1),
      image: 'ACME_logo.png'
    }
    
    this.productService.updateProduct(ProductId, datos).pipe(
      switchMap(() => this.productService.getProducts())
    ).subscribe({
      next: (products: IProduct[]) => {
        console.log('Llegó un dato');
        console.log('Producto actualizado', ProductId);
        this.updatedProducts.emit(products);
      },
      error: (error: any) => {
        console.error('Error al actualizar producto:', error);
      },
      complete: () => console.log('Actualización de producto completada')
    });
  }

  viewProduct(productId: number) {
    console.log('Viendo producto:', productId);
  }
}
