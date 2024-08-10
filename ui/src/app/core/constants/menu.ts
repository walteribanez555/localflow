import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    // {
    //   group : 'configuracion',
    //   separator : false,
    //   items : [
    //     {
    //       icon : 'assets/icons/heroicons/outline/cog.svg',
    //       label : 'Configuraciones',
    //       route : '/config/configs'
    //     }
    //   ]
    // },
    {
      group : 'flows',
      separator : false,
      items : [
        {
          icon : 'assets/icons/heroicons/outline/adjustments-vertical.svg',
          label : 'Flows',
          route : '/flow/list'
        }
      ]
    },
    {
      group : 'market',
      separator : false,
      items : [
        {
          icon : 'assets/icons/heroicons/outline/currency-dolar.svg',
          label : 'Oferta',
          route : '/market/offers'
        },
        {
          icon : 'assets/icons/heroicons/outline/cash-register.svg',
          label : 'Demanda',
          route : '/market/demands'
        },

      ]
    }



  ];
}
