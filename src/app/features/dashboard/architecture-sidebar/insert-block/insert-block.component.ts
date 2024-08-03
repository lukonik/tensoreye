import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BlockTypesState } from '../../../../state/block-types.state';
import { BlockTypesList } from '../../../../models/block-types.list';

@Component({
  selector: 'app-insert-block',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insert-block.component.html',
  styleUrl: './insert-block.component.scss',
})
export class InsertBlockComponent {
  blockTypesState = inject(BlockTypesState);
  blockTypes = this.blockTypesState.blockTypes;
  dialogRef = inject(MatDialogRef);

  blockType = model<BlockTypesList>(BlockTypesList.Dense);

  save() {
    this.dialogRef.close(this.blockType());
  }
}
