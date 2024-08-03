import { Component, computed, inject, signal } from '@angular/core';
import { ArchitectureState } from '../../../../state/architecture.state';
import { BlockTypesState } from '../../../../state/block-types.state';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { BlockModel } from '../../../../models/block.model';
import { cloneObject } from '../../../../utils/clone-object';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDivider } from '@angular/material/divider';
import { BlockTypesList } from '../../../../models/block-types.list';
import { ArchitectureHelperService } from '../../../../state/architecture-helper.service';
import { DenseEditComponent } from './dense-edit/dense-edit.component';
import { DropoutEditComponent } from './dropout-edit/dropout-edit.component';
import { BatchNormalizationEditComponent } from './batch-normalization-edit/batch-normalization-edit.component';

@Component({
  selector: 'app-block-edit',
  standalone: true,
  imports: [
    FontAwesomeModule,
    MatDialogModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatDivider,
    DenseEditComponent,
    DropoutEditComponent,
    BatchNormalizationEditComponent
  ],
  templateUrl: './block-edit.component.html',
  styleUrl: './block-edit.component.scss',
  animations: [
    trigger('blockEdit', [
      transition(':enter', [
        style({ left: -100 }),
        animate('200ms', style({ left: 200 })),
      ]),
      transition(':leave', [animate('200ms', style({ left: -100 }))]),
    ]),
  ],
})
export class BlockEditComponent {
  archState = inject(ArchitectureState);
  blockTypesState = inject(BlockTypesState);
  blockTypes = this.blockTypesState.blockTypes;
  archHelper = inject(ArchitectureHelperService);
  faClose = faClose;
  dialogRef = inject(MatDialogRef);

  data = inject(MAT_DIALOG_DATA);

  block = signal<BlockModel>(cloneObject(this.data.block));

  blockType = computed(() => {
    return this.block().type;
  });

  BLOCK_TYPE_LIST = BlockTypesList;

  save($event: any) {
    this.dialogRef.close($event);
  }
}
