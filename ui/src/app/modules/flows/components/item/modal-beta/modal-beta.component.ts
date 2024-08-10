import { CommonModule } from '@angular/common';
import {  Component, Input } from '@angular/core';
import { ModalContent } from '../../../../../shared/models/modal-content';
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

