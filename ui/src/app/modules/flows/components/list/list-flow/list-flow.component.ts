import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlowItemComponent } from '../flow-item/flow-item.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-flow',
  standalone: true,
  imports: [
    CommonModule,
    FlowItemComponent,
    RouterModule,
  ],
  templateUrl : './list-flow.component.html',

})
export class ListFlowComponent { }
