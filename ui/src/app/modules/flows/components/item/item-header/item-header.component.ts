import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-item-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './item-header.component.html',

})
export class ItemHeaderComponent { }
