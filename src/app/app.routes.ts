import { Routes } from '@angular/router';

import { Product } from './features/products/components/product/product';
import { Welcome } from './features/home/welcome/welcome';
import { PageNotFound } from './features/not-found/page-not-found/page-not-found';
import { Login } from './features/auth/components/login/login';
import { Recovery } from './features/auth/components/recovery/recovery';
import { loginGuard } from './features/auth/guards/login-guard';
import { User } from './features/users/components/user/user';
import { Number } from './features/numbers/components/number/number';
import { ProductPagination } from './features/products/components/product-pagination/product-pagination';
import { Map } from './features/maps/components/map/map';

export const routes: Routes = [
  { path: 'home', component: Welcome, canActivate: [loginGuard] },
  { path: 'products', component: Product, canActivate: [loginGuard] },
  { path: 'products-pagination', component: ProductPagination, canActivate: [loginGuard] },
  { path: 'numbers', component: Number, canActivate: [loginGuard] },
  { path: 'users', component: User, canActivate: [loginGuard] },
  { path: 'maps', component: Map, canActivate: [loginGuard] },
  { path: 'login', component: Login },
  { path: 'recovery', component: Recovery },

  /* detalle de producto, usando estándar de recursos */
  // { path: 'products/:id', component: ProductId },

  // Redirección inicial
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Siempre al final para manejar rutas no definidas
  { path: '**', component: PageNotFound, canActivate: [loginGuard] }
];
