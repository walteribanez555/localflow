import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    // {
    //   group: 'Ordenes',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/cash-register.svg',
    //       label: 'Nueva Orden',
    //       route: '/order/new-order',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/rectangle-list.svg',
    //       label: 'Ordenes',
    //       route: '/order/orders',
    //     },
    //   ],
    // },

    {
      group : 'configuracion',
      separator : false,
      items : [
        {
          icon : 'assets/icons/heroicons/outline/cog.svg',
          label : 'Configuraciones',
          route : '/config/configs'
        }
      ]
    },
    {
      group : 'flow',
      separator : false,
      items : [
        {
          icon : 'assets/icons/heroicons/outline/adjustments-vertical.svg',
          label : 'Flujos',
          route : '/flow/flows'
        }
      ]
    },
    {
      group : 'Archivos',
      separator : false,
      items : [
        {
          icon : 'assets/icons/heroicons/outline/inbox.svg',
          label : 'Archivos',
          route : '/file/files'
        }
      ]
    }



  ];
}
