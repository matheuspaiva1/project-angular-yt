import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { inject } from '@angular/core';
import { ProductsService } from './shared/services/products.service';

export const routes: Routes = [{
  path: '',
  resolve: {
    products: () => {
      const productsServices = inject(ProductsService)

      return productsServices.getAll()
    }
  },
  component: ListComponent
},
{
  path: 'create-product',
  //lazy loading
  loadComponent: ()=>  import('./features/create/create.component').then((m) => m.CreateComponent), 
},
{
  path: 'edit-product/:id',
  resolve: {
    product: (route: ActivatedRouteSnapshot) => {
      const productsService = inject(ProductsService)

      return productsService.get(route.paramMap.get('id') as string)
    }
  },
  //lazy loading
  loadComponent: () =>  
    import('./features/edit/edit.component').then((m) => m.EditComponent), 
},
];
