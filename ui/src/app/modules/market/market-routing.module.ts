import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { ListComponent } from "./pages/list/list.component";
import { MarketComponent } from "./market.component";
import { OffersComponent } from "./pages/offers/offers.component";
import { DemandsComponent } from "./pages/demands/demands.component";




const routes : Routes = [
  {
    path : '',
    component : MarketComponent,
    children : [
      { path : 'offers', component : OffersComponent},
      { path : 'demands', component: DemandsComponent},

      { path : '', redirectTo : 'offers', pathMatch : 'full' },

      // { path : '', redirectTo : 'list', pathMatch : 'full' },
    ]
  },



  { path: '**', redirectTo: 'errors/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketRoutingModule {}

