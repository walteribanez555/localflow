import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FlowChartService } from '../../../services/flow-chart.service';

@Component({
  selector: 'app-flow-card-node',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './flow-card-node.component.html',
  styleUrls: ['./flow-card-node.component.css'],

})
export class FlowCardNodeComponent {

  @Input() dataIn: any;
  constructor() { }

  private flowChartService = inject(FlowChartService);

  ngOnInit(): void {
  }

  callChilds(src: string, action: string): void {
    switch (action) {
      case 'youtubers':
        this.flowChartService.setDataYoutubers(src)
        break;
      default:
        this.flowChartService.setDataFromChild(src)
        break
    }

  }

 }
