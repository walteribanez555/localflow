import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./pages/list/list.component";
import { ItemComponent } from "./pages/item/item.component";
import { FlowsComponent } from "./flows.component";




const routes : Routes = [
  {
    path : '',
    component : FlowsComponent,
    children : [
      { path : 'list', component: ListComponent },
      { path : 'item', component : ItemComponent},


      { path : '', redirectTo : 'list', pathMatch : 'full' },
    ]
  },



  { path: '**', redirectTo: 'errors/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlowsRoutingModule {}

