import { Component, inject, model } from '@angular/core';
import { BlockEditComponent } from './block-edit/block-edit.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { AssembleEditComponent } from './assemble-edit/assemble-edit.component';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemMeta,
  MatListItemTitle,
  MatListModule,
  MatNavList,
} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { LayerMainPropPipe } from './layer-main-prop.pipe';
import { MatDialog } from '@angular/material/dialog';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ArchitectureHelperService } from '../../../state/architecture-helper.service';
import { ArchitectureState } from '../../../state/architecture.state';
import { ModelState } from '../../../state/model.state';
import { BlockTypesList } from '../../../models/block-types.list';
import { BlockModel } from '../../../models/block.model';
import { LearnEditComponent } from './learn-edit/learn-edit.component';
import { ModelPhaseState } from '../../../state/model-phase.state';
import { DenseEditComponent } from './block-edit/dense-edit/dense-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { BlockTypesState } from '../../../state/block-types.state';
import { FormsModule } from '@angular/forms';
import { DataSplitEditComponent } from './data-split-edit/data-split-edit.component';
import { InsertBlockComponent } from './insert-block/insert-block.component';
import { SelectColumnsEditComponent } from './select-columns-edit/select-columns-edit.component';
@Component({
  selector: 'app-architecture-sidebar',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    BlockEditComponent,
    MatIcon,
    MatListItem,
    MatListItemMeta,
    MatListModule,
    MatListItemTitle,
    MatNavList,
    MatMenuModule,
    LayerMainPropPipe,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    FormsModule,
  ],
  templateUrl: './architecture-sidebar.component.html',
  styleUrl: './architecture-sidebar.component.scss',
})
export class ArchitectureSidebarComponent {
  archState = inject(ArchitectureState);
  archHelper = inject(ArchitectureHelperService);
  blocks = this.archState.blocks;
  faCirclePlus = faCirclePlus;
  inputBlock = this.archState.inputBlock;
  uiDialog = inject(MatDialog);
  modelState = inject(ModelState);
  modelPhaseState = inject(ModelPhaseState);
  isStarted = this.modelPhaseState.isStarted;
  blockTypes = inject(BlockTypesState).blockTypes;
  selectedBlockType = model<BlockTypesList>(BlockTypesList.Dense);

  addBlock() {
    const block = this.archHelper.createBlock(this.selectedBlockType());
    this.archState.addBlock(block);
  }

  editSelectColumns() {
    this.uiDialog
      .open(SelectColumnsEditComponent, {
        width: '600px',
        data: {
          selectColumns: this.archState.selectColumns(),
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.archState.updateSelectColumns(data);
        }
      });
  }

  insertBlock(index: number) {
    this.uiDialog
      .open(InsertBlockComponent)
      .afterClosed()
      .subscribe((blockType) => {
        if (blockType) {
          const block = this.archHelper.createBlock(blockType);
          this.archState.insertBlock(index, block);
        }
      });
  }

  selectBlock(block: BlockModel) {
    this.uiDialog
      .open(BlockEditComponent, {
        data: {
          block,
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.archState.replaceBlock(block, data);
        }
      });
  }

  editDataSplit() {
    this.uiDialog
      .open(DataSplitEditComponent, {
        data: {
          dataSplit: this.archState.dataSplit(),
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.archState.updateDataSplit(data);
        }
      });
  }

  editAssemble() {
    this.uiDialog
      .open(AssembleEditComponent, {
        data: {
          assemble: this.archState.assemble(),
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.archState.updateAssemble(data);
        }
      });
  }

  editLearn() {
    this.uiDialog
      .open(LearnEditComponent, {
        data: {
          learn: this.archState.learn(),
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.archState.updateLearn(data);
        }
      });
  }

  removeBlock(block: BlockModel) {
    this.archState.removeBlock(block);
  }
}
