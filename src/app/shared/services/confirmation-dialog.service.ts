import { Component, Injectable, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { ProductsService } from './products.service';


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

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  
  matDialog = inject(MatDialog)

  constructor() { }

  openDialog(): Observable<boolean> {
    return this.matDialog.open(ConfirmationDialogComponent)
    .afterClosed()
  }
}
