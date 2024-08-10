import { CommonModule } from '@angular/common';
import {  Component } from '@angular/core';
import { ListHeaderComponent } from '../../components/list/list-header/list-header.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ListHeaderComponent,
  ],
  templateUrl : './list.component.html',
})
export class ListComponent {

  onShowItem = false;
 }
