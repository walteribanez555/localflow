import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './list.component.html',

})
export class ListComponent { }
