import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './item.component.html',

})
export class ItemComponent { }
