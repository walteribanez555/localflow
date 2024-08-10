import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NodeFlowListener } from '../../../interfaces/NodeFlowListener';

@Component({
  selector: 'app-node-flow',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './node-flow.component.html',

})
export class NodeFlowComponent {

  @Input() sidebarOrderListener?: NodeFlowListener;

  close() {
    this.sidebarOrderListener?.close();
  }

 }
