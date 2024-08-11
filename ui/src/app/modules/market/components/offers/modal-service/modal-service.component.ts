import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, ViewChild } from '@angular/core';
import { DcDirective } from 'src/app/shared/directives/dc.directive';
import { ActionModalListener } from 'src/app/shared/interfaces/ActionModalListener';
import { DynamicFormComponent } from 'src/app/shared/models/dynamic-form.component';
import { ModalContent } from 'src/app/shared/models/modal-content';
import { DynamicForm } from 'src/app/shared/types/dynamic.types';

@Component({
  selector: 'app-modal-service',
  standalone: true,
  imports: [
    CommonModule,
    DcDirective,

  ],
  templateUrl : './modal-service.component.html',

})
export class ModalServiceComponent implements ModalContent, OnInit, AfterViewInit {
  ngOnInit(): void {

  }

  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {

    const modalListener = this.createModalListener();
    this.loadComponent(this.actualFormIndex);
    this.onCreateModal.emit(modalListener);
    this.cdr.detectChanges();
  }



  loadComponent(itemPos : number){

    const item = this.forms[itemPos];



    const viewContainerRef = this.dcWrapper.viewContainerRef;
    viewContainerRef.clear();


    const componentRef = viewContainerRef.createComponent<DynamicFormComponent>(
      item.component
    )

    componentRef.instance.step = itemPos;
    componentRef.instance.fields  = item.dynamicFields;
    componentRef.instance.data = item.data;


    //Render again with the form
    componentRef.instance.renderForm();
    // componentRef.instance.formGroup = item.formGroup;


  }





  createModalListener() {
    const modalListener : ActionModalListener = {
      onNext : ( ) => {
        return this.nextStepForm();
      },
      onPrev : ( ) => {
        return this.prevStepForm();
      }
    }

    return modalListener
  }







  actionsModal?: ActionModalListener | undefined;
  onCreateModal = new EventEmitter<any>();
  actualFormIndex = 0;

  @ViewChild(DcDirective) dcWrapper! : DcDirective;

  @Input() forms : DynamicForm[] = [];
  @Input() data : any;


  nextStepForm(){
    if(this.actualFormIndex < this.forms.length - 1){
      this.actualFormIndex++;
    }
    this.loadComponent(this.actualFormIndex);
    return { actualForm :  this.forms[this.actualFormIndex], actualStep : this.actualFormIndex};
  }

  prevStepForm(){
    if(this.actualFormIndex > 0){
      this.actualFormIndex--;
    }
    this.loadComponent(this.actualFormIndex);
    return{ actualForm :  this.forms[this.actualFormIndex], actualStep : this.actualFormIndex};
  }









  //Cambiar a formulario dinamico
  //Establecer los eventos del formulario

}

