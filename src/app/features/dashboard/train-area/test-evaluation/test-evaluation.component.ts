import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { ModelState } from '../../../../state/model.state';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DecimalPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
const ELEMENT_DATA: any[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-test-evaluation',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    AgGridModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    DecimalPipe,
    MatDividerModule,
  ],
  templateUrl: './test-evaluation.component.html',
  styleUrl: './test-evaluation.component.scss',
})
export class TestEvaluationComponent {
  modelState = inject(ModelState);

  metrics = inject(MAT_DIALOG_DATA).metrics;
}
