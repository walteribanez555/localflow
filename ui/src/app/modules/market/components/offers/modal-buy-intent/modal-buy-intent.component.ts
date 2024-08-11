import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActionModalListener } from 'src/app/shared/interfaces/ActionModalListener';
import { ModalContent } from 'src/app/shared/models/modal-content';
import { DynamicForm } from 'src/app/shared/types/dynamic.types';

@Component({
  selector: 'app-modal-buy-intent',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
  ],
  templateUrl : './modal-buy-intent.component.html',

})
export class ModalBuyIntentComponent implements ModalContent, OnInit {
  ngOnInit(): void {
    console.log({data : this.data})
  }
  @Input() forms!: DynamicForm[] | null;
  @Input() data!: any;
  actionsModal?: ActionModalListener | undefined;
  onCreateModal?: EventEmitter<any> | undefined;
}
