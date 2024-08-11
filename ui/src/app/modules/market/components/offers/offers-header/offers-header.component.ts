import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-offers-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './offers-header.component.html',
})
export class OffersHeaderComponent {


 @Output() onToggleCreate  = new EventEmitter();
 @Output() onReload = new EventEmitter();

 onSale(){
    this.onToggleCreate.emit();
 }

 onReloadToggle(){
    this.onReload.emit();
 }

}
