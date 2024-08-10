import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './list-header.component.html',

})
export class ListHeaderComponent { }
