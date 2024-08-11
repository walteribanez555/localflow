import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl : './market.component.html',

})
export class MarketComponent {



 }
