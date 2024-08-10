import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowChartService {
  public zoneDimensions$: BehaviorSubject<[number, number]> = new BehaviorSubject([0, 0])
  public data$: BehaviorSubject<any> = new BehaviorSubject(null)
  public dataChild$: BehaviorSubject<any> = new BehaviorSubject(null)
  public dataYoutubers$: BehaviorSubject<any> = new BehaviorSubject(null)
  constructor() { }

  calculateDimensions(el: HTMLElement): void {
    const { width, height } = el.getBoundingClientRect()
    this.zoneDimensions$.next([width - 5, height - 8])
  }

  setDataFrom(source: string): void {
    //TODO: Aqui podemos hacer un llamado a API HTTP!
    const httpMock: any = {
      angular: {
        id: 'first',
        label: 'A',
        data: {
          title: 'Angular 🎁',
          text: 'Inicio de conversacion'
        },
        action: {
          more: 'Ver ruta',
          src: 'angular',
          key: 'childs'
        }
      }
    }


    this.data$.next(httpMock[source])
  }

  setDataFromChild(source: string): void {
    //TODO: Aqui podemos hacer un llamado a API HTTP!
    const httpMock: any = {
      angular: {
        nodes: [

          {
            id: 'c1',
            label: 'C1',
            data: {
              title: 'Go ANGULAR!',
              img: 'https://i.imgur.com/Ajzts77.png',
              text: 'Menu del chatbot '
            }
          },
          {
            id: 'c2',
            label: 'C2',
            data: {
              title: 'TS 🤘',
              img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png',
              text: 'Comprar'
            },
            action: {
              more: 'Ver ruta',
              src: 'ts',
              key: 'youtubers'
            }
          },
          {
            id: 'c3',
            label: 'C3',
            data: {
              title: 'Alan 🤘',
              img: 'https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png',
              text: 'Ver Carrito'
            }
          },
          {
            id: 'c4',
            label: 'C4',
            data: {
              title: 'Alan 🤘',
              img: 'https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png',
              text: 'Final'
            }
          },
          {
            id: 'c5',
            label: 'C5',
            data: {
              title: 'Alan 🤘',
              img: 'https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png',
              text: 'Consulta confirmacion'
            }
          },
          {
            id: 'c6',
            label: 'C6',
            data: {
              title: 'Alan 🤘',
              img: 'https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png',
              text: 'Direccion de envio'
            }
          },
          {
            id: 'c7',
            label: 'C7',
            data: {
              title: 'Alan 🤘',
              img: 'https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png',
              text: 'Observaciones'
            }
          },
          {
            id: 'c8',
            label: 'C8',
            data: {
              title: 'Alan 🤘',
              img: 'https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png',
              text: 'Verificar'
            }
          },
          {
            id: 'c9',
            label: 'C9',
            data: {
              title: 'Alan 🤘',
              img: 'https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png',
              text: 'Eliminar'
            }
          }
        ],
        links: [

          {
            id: 'a',
            source: 'first',
            target: 'c1',
            label: 'is parent of'
          },
          {
            id: 'b',
            source: 'c1',
            target: 'c3',
            label: 'custom label'
          },
          {
            id: 'd',
            source: 'c1',
            target: 'c2',
            label: 'custom label'
          },
          {
            id: 'e',
            source: 'c1',
            target: 'c4',
            label: 'custom label'
          },
          {
            id: 'f',
            source: 'c2',
            target: 'c5',
            label: 'custom label'
          },
          {
            id: 'g',
            source: 'c5',
            target: 'c3',
            label: 'custom label'
          },
          {
            id: 'h',
            source: 'c5',
            target: 'c6',
            label: 'custom label'
          },
          {
            id: 'i',
            source: 'c6',
            target: 'c7',
            label: 'custom label'
          },
          {
            id: 'j',
            source: 'c7',
            target: 'c8',
            label: 'custom label'
          },
          {
            id: 'k',
            source: 'c8',
            target: 'c4',
            label: 'custom label'
          },
          {
            id: 'l',
            source: 'c3',
            target: 'c1',
            label: 'custom label'
          },
          {
            id: 'm',
            source: 'c5',
            target: 'c9',
            label: 'custom label'
          },
          {
            id: 'n',
            source: 'c9',
            target: 'c1',
            label: 'custom label'
          },
          {
            id: 'o',
            source: 'c5',
            target: 'c1',
            label: 'custom label'
          }
        ]
      }
    }
    this.dataChild$.next(httpMock[source])
  }

  setDataYoutubers(source: string): void {
    //TODO: Aqui podemos hacer un llamado a API HTTP!
    const httpMock: any = {
      angular: {
        nodes: [
          {
            id: 'c1',
            label: 'C1',
            data: {
              title: 'Go ANGULAR!',
              img: 'https://i.imgur.com/Ajzts77.png',
              text: '<b>Angular</b> es un framework opensource desarrollado por Google para facilitar la creación y programación de aplicaciones web de una sola página, las webs SPA (Single Page Application).'
            }
          },
          {
            id: 'c2',
            label: 'C2',
            data: {
              title: 'TS 🤘',
              img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png',
              text: 'Learn one way to build applications with Angular and reuse your code and abilities to build apps for any deployment target. For web, mobile web.'
            }
          },
          {
            id: 'c3',
            label: 'C3',
            data: {
              title: 'Alan 🤘',
              img: 'https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png',
              text: 'Learn one way to build applications with Angular'
            }
          }
        ],
        links: [
          {
            id: 'a',
            source: 'first',
            target: 'c1',
            label: 'is parent of'
          }, {
            id: 'b',
            source: 'c1',
            target: 'c3',
            label: 'custom label'
          }, {
            id: 'd',
            source: 'c1',
            target: 'c2',
            label: 'custom label'
          }, {
            id: 'e',
            source: 'c2',
            target: 'c3',
            label: 'first link'
          }
        ]
      },
      ts: {
        nodes: [
          {
            id: 'ts1',
            label: 'TS1',
            data: {
              title: 'Go ANGULAR!',
              img: 'https://alan-buscaglia-portfolio.netlify.app/static/media/who_am_i_2.2b08c9ab.jpg',
              text: '<b>Angular</b> es un framework opensource desarrollado por Google para facilitar la creación y programación de aplicaciones web de una sola página, las webs SPA (Single Page Application).'
            }
          },
          {
            id: 'ts2',
            label: 'TS2',
            data: {
              title: 'Go ANGULAR!',
              img: 'https://avatars.githubusercontent.com/u/7414771?v=4',
              text: '<b>Angular</b> es un framework opensource desarrollado por Google para facilitar la creación y programación de aplicaciones web de una sola página, las webs SPA (Single Page Application).'
            }
          }
        ],
        links: [
          {
            id: 't1',
            source: 'c2',
            target: 'ts1',
            label: 'is parent of'
          },
          {
            id: 't2',
            source: 'c2',
            target: 'ts2',
            label: 'is parent of'
          }
        ]
      }
    }
    this.dataYoutubers$.next(httpMock[source])
  }

}
