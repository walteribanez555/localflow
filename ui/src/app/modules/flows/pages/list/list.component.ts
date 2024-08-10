import { CommonModule } from '@angular/common';
import {  Component, inject, OnInit } from '@angular/core';
import { ListHeaderComponent } from '../../components/list/list-header/list-header.component';
import { ListFlowComponent } from '../../components/list/list-flow/list-flow.component';
import { ModalService } from '../../../../shared/services/Modal.service';
import { ModalBetaComponent } from '../../components/list/modal-beta/modal-beta.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ListHeaderComponent,
    ListFlowComponent,
  ],
  templateUrl : './list.component.html',
})
export class ListComponent implements OnInit {
  ngOnInit(): void {
    this.modalService.open(ModalBetaComponent, {
      title: `Alerta`,
      size: 'sm',
      forms: null,
      data: null,
      icon: 'assets/icons/heroicons/outline/information-circle.svg',
      actions : []

    });

  }

  onShowItem = false;
  private modalService = inject(ModalService);






 }
