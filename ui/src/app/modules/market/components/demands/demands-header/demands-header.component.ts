import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-demands-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './demands-header.component.html',

})
export class DemandsHeaderComponent { }
