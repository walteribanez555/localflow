import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path : 'flow',
    component : LayoutComponent,
    loadChildren: () => import('../flows/flows.module').then((m) => m.FlowsModule),
  },
  {
    path : 'market',
    component : LayoutComponent,
    loadChildren: () => import('../market/market.module').then((m) => m.MarketModule),
  },

  // {
  //   path : 'order',
  //   component: LayoutComponent,
  //   loadChildren: () => import('../order/order.module').then((m) => m.OrderModule),
  // },
  // {
  //   path: 'cashier',
  //   component: LayoutComponent,
  //   loadChildren: () => import('../cashier/cashier.module').then((m) => m.CashierModule),
  // },


  { path: '', redirectTo: 'flow', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
