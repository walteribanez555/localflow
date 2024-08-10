import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ModalContent } from '../../../../../shared/models/modal-content';
import { FormGroup } from '@angular/forms';
import { DynamicForm } from '../../../../../shared/types/dynamic.types';
import { ActionModalListener } from '../../../../../shared/interfaces/ActionModalListener';

@Component({
  selector: 'app-notification-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './notification-form.component.html',
})
export class NotificationFormComponent implements ModalContent, AfterViewInit {
  actionsModal?: ActionModalListener | undefined;
  onCreateModal: any;
  @Input() forms!: DynamicForm[] | null;
  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  form: FormGroup | null = null;

  @Input() data!: any;



}
