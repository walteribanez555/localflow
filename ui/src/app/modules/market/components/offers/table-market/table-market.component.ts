import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContentItemsTableComponent } from '../content-items-table/content-items-table.component';

@Component({
    selector: 'app-table-market',
    standalone: true,
    imports: [
        CommonModule,
        ContentItemsTableComponent,
    ],
    templateUrl : './table-market.component.html',
})
export class TableMarketComponent  implements OnInit {
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  @Input() services!: any[];

  @Output() onSelectItem = new EventEmitter();


  onSelectTable(item : any) {

    if(item[5]){
      return;
    }

    this.onSelectItem.emit(item);
  }


 }
