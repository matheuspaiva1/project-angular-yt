import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar Produto</h2>

    <mat-dialog-content>
      Tem certeza de que quer deletar?
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button (click)="onNo()">Não</button>
      <button mat-raised-button (click)="onYes()" cdkFocusInitial color="primary" >Ok</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef)

  onNo(){
    this.matDialogRef.close(false)
  }

  onYes(){
    this.matDialogRef.close(true)
  }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: Product[] = [];
  
  productsServices = inject(ProductsService)
  router = inject(Router)
  matDialog = inject(MatDialog)
  
  ngOnInit() {
    this.productsServices.getAll().subscribe((products) => {
      this.products = products
    })
  }
  
  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }
  onDelete(product: Product) {
    this.matDialog.open(ConfirmationDialogComponent).afterClosed().subscribe((answer: boolean) => {
      console.log('afterClosed',answer);
    })
  }
}


