import { Injectable } from '@angular/core';
import { IProduct } from '../product';

@Injectable({
  providedIn: 'root',
})
export class Product {
  getProducts(): IProduct[]{
    return[{
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
    },]
  }
}
