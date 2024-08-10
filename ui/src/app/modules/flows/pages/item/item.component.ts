import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ItemHeaderComponent } from '../../components/item/item-header/item-header.component';
import { FlowDetailComponent } from '../../components/item/flow-detail/flow-detail.component';
import { ViewFlowComponent } from '../../components/item/view-flow/view-flow.component';
import { ActivatedRoute } from '@angular/router';
import { DcDirective } from '../../../../shared/directives/dc.directive';
import { NodeFlowComponent } from '../../components/item/node-flow/node-flow.component';
import { NodeFlowListener } from '../../interfaces/NodeFlowListener';
import { FlowChartService } from '../../services/flow-chart.service';
import { ModalService } from '../../../../shared/services/Modal.service';
import { ModalBetaComponent } from '../../components/item/modal-beta/modal-beta.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    CommonModule,
    ItemHeaderComponent,
    FlowDetailComponent,
    ViewFlowComponent,
    DcDirective,
  ],
  templateUrl : './item.component.html',

})
export class ItemComponent {



  onShowItem = false;
  private activatedRouter = inject(ActivatedRoute);

  @ViewChild(ViewFlowComponent, { read: ElementRef }) viewFlowElementRef?: ElementRef;


  private flowChartService = inject(FlowChartService);
  private cdr = inject(ChangeDetectorRef);


  id : number | null = null;

  private modalService = inject(ModalService);


  constructor() { }

  ngOnInit(): void {


    const  params = this.activatedRouter.snapshot.queryParams;

    params['id'] ? this.id = params['id'] : this.id = null;


    this.modalService.open(ModalBetaComponent, {
      title: `Alerta`,
      size: 'sm',
      forms: null,
      data: null,
      icon: 'assets/icons/heroicons/outline/information-circle.svg',
      actions : []

    });

  }

  ngAfterViewInit() {

    const viewContainerRef = this.dcWrapper.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(NodeFlowComponent);
    componentFactory.instance.sidebarOrderListener = this.sidebarOrderListener;

    this.onShowItem = true;

    const el = this.viewFlowElementRef?.nativeElement;

    this.flowChartService.calculateDimensions(el);

    this.flowChartService.setDataFrom('angular');
    this.flowChartService.setDataFromChild('angular');
    // this.flowChartService.setDataFromChild('angular');
    this.cdr.detectChanges();

  }




  @ViewChild(DcDirective) dcWrapper! : DcDirective;

  sidebarOrderListener : NodeFlowListener = {
    close : ( ) => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
      this.cdr.detectChanges();
      const el = this.viewFlowElementRef?.nativeElement;
      this.flowChartService.calculateDimensions(el);
      this.cdr.detectChanges();

    },
    submit : () => {
      this.dcWrapper.viewContainerRef.clear();

      this.onShowItem = false;
      this.cdr.detectChanges();

      const el = this.viewFlowElementRef?.nativeElement;
      this.flowChartService.calculateDimensions(el);
      this.cdr.detectChanges();



    },
    cancel : () => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
      this.cdr.detectChanges();

      const el = this.viewFlowElementRef?.nativeElement;
      this.flowChartService.calculateDimensions(el);
      this.cdr.detectChanges();


    }
  }



  onOrderSelected() {


    const viewContainerRef = this.dcWrapper.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory = viewContainerRef.createComponent(NodeFlowComponent);
    componentFactory.instance.sidebarOrderListener = this.sidebarOrderListener;

    this.onShowItem = true;



  }

}
