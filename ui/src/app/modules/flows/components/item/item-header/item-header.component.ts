import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl : './item-header.component.html',

})
export class ItemHeaderComponent { }
