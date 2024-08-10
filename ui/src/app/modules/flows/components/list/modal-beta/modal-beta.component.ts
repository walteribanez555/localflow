import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalContent } from '../../../../../shared/models/modal-content';
import { ActionModalListener } from '../../../../../shared/interfaces/ActionModalListener';
import { DynamicForm } from '../../../../../shared/types/dynamic.types';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-modal-beta',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
  ],
  templateUrl : './modal-beta.component.html',

})
export class ModalBetaComponent implements ModalContent {
  @Input() forms : DynamicForm[] = [];
  @Input() data : any;

}

