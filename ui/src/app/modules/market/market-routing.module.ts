import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./pages/list/list.component";
import { MarketComponent } from "./market.component";




const routes : Routes = [
  {
    path : '',
    component : MarketComponent,
    children : [
      { path : 'list', component: ListComponent },


      { path : '', redirectTo : 'list', pathMatch : 'full' },
    ]
  },



  { path: '**', redirectTo: 'errors/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketRoutingModule {}

