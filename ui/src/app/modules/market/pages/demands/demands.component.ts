import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-demands',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './demands.component.html',

})
export class DemandsComponent {

  onShowItem = false;


}
