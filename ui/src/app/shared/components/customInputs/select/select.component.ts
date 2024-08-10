import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CustomInput } from '../CustomInput.interface';
import { FormControl, FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { ItemListComponent } from '../../item-list/item-list.component';
import { ListviewComponent } from '../../listview/listview.component';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    ListviewComponent,
    FormsModule,
  ],
  templateUrl : './select.component.html',

})
export class SelectComponent implements CustomInput, OnInit {
  ngOnInit(): void {
    if (this.formControl.value && this.formControl.value.length > 0) {
      this.searchInput = this.formControl.value;
    }
  }

  searchTerm(event: any) {
    if (event.target.value) this.searchTerm$.next(event.target.value);
  }

  searchTerm$ = new Subject<string>();

  @Input() placeholder?: string | null | undefined;
  @Input() data?: any;
  @Input() formControl!: FormControl<any>;

  isToggle: boolean = false;
  searchInput: string = 'Select Country';

  searchText = '';

  onSelectItem = (item: ItemListComponent) => {
    this.formControl.setValue(item.name);
    this.searchInput = item.name;
    this.isToggle = false;
  };


  updateToggle() {
    this.isToggle = !this.isToggle;
  }



 }
