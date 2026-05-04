import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { IProduct } from '../../../../product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modal-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-add.html',
  styleUrl: './modal-add.css',
})
export class ModalAdd {
  // Emit the refreshed products list after saving
  close = output<IProduct[]>();

  private productService = inject(Product);
  private fb = inject(FormBuilder);

  formProduct = this.fb.group({
    name: ['', Validators.required],
    code: ['', [Validators.required, Validators.minLength(7)], this.codeValidator()],
    date: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    description: ['', Validators.required],
    rating: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
  });

  ocultarModal(): void {
    this.close.emit([] as IProduct[]);
  }

  saveData(): void {
    console.log('Guardando producto:', this.formProduct.value);
    const payload = {
      name: this.formProduct.get('name')?.value,
      code: this.productService.generateProductCode(),
      date: this.formProduct.get('date')?.value,
      price: this.formProduct.get('price')?.value,
      description: this.formProduct.get('description')?.value || 'Sin descripción',
      rating: this.formProduct.get('rating')?.value || 0,
      image: 'ACME_logo.png'
    };

    this.productService.saveProduct(payload as any).subscribe({
      next: () => {
        this.productService.getProducts().subscribe((products) => {
          this.close.emit(products);
        });
      },
      error: (err) => {
        console.error('Error guardando producto', err);
      }
    });
  }

  codeValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      let code = control.value;
      console.log('cliente - code:', code);
      return this.productService.searchProduct(code)
        .pipe(
          map(res => {
            if (res) {
              console.log('Codigo encontrado:', res);
              return { codeExists: true };
            }
            console.log('Codigo no encontrado:', code);
            return null;
          })
        );
    };
  }
}
