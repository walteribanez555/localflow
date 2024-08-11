import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ethers } from 'ethers';

@Component({
  selector: '[content-table-item]',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
  ],
  templateUrl : './content-items-table.component.html',

})
export class ContentItemsTableComponent {

  @Input() service! : any;
  @Output() toggleItem = new EventEmitter();



  service_id: number = 0;
  service_token: string = '';
  service_price: number = 0;
  service_name: string = '';
  service_status: number = 0;

  constructor() {}

  ngOnInit(): void {


    this.service_id = this.service[0];
    this.service_token = this.service[1];
    this.service_price = this.service[3];
    this.service_name = this.service[4];
    this.service_status = this.service[5];


    console.log(this.service);



  }


  onToggleItem () {
    this.toggleItem.emit(this.service);
  }

 }
