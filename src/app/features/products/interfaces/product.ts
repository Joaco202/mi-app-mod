import { Injectable } from '@angular/core';
import { IProduct } from '../../../product';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Product {
  products = signal<IProduct[]>([]);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    console.log('Fetching products from API...');
    return this.http.get<IProduct[]>('http://localhost:3000/productos').pipe(
      map((resp: any)=> resp.productos)
      
    );
  }

  generateProductCode(): string {
    const randomNum = Math.floor(Math.random() * (100 - 10) + 10);
    return `PROD-${randomNum.toString().padEnd(3, '0')}`;
  }

  saveProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('http://localhost:3000/productos', product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/productos/${id}`);
  }

  updateProduct(id: number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`http://localhost:3000/productos/${id}`, product);
  }

  searchProduct(code: string) {
    return timer(1000).pipe(switchMap(() => {
      return this.http.get<any>(`http://localhost:3000/existeproducto/${code}`).pipe(
        map((resp: any) => resp.data)
      );
    }));
  }
}
