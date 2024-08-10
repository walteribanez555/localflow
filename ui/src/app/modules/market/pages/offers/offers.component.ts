import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OffersHeaderComponent } from '../../components/offers/offers-header/offers-header.component';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, OffersHeaderComponent],
  templateUrl: './offers.component.html',
})
export class OffersComponent {
  onShowItem = false;
}
