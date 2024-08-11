import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OffersHeaderComponent } from '../../components/offers/offers-header/offers-header.component';
import { TokenService } from 'src/app/core/services/api/cloud/token.service';
import { EthersService } from 'src/app/core/services/api/eth/Ethers.service';
import { TableMarketComponent } from '../../components/offers/table-market/table-market.component';
import { Token } from 'src/app/core/services/api/cloud/models/Token.model';
import { ModalService } from 'src/app/shared/services/Modal.service';
import { FormControl } from '@angular/forms';
import { InputTextComponent } from 'src/app/shared/components/customInputs/input-text/input-text.component';
import { FormTemplateComponent } from 'src/app/shared/components/form-template/form-template.component';
import { DynamicForm } from 'src/app/shared/types/dynamic.types';
import { ActionType } from 'src/app/shared/enum/action';
import { ModalServiceComponent } from '../../components/offers/modal-service/modal-service.component';
import { ModalBuyIntentComponent } from '../../components/offers/modal-buy-intent/modal-buy-intent.component';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, OffersHeaderComponent, TableMarketComponent],
  templateUrl: './offers.component.html',
})
export class OffersComponent {
  onShowItem = false;

  nombre: string = '';
  precio: number = 0;
  item: any;

  contratoAddress = '0xdF16012b1229A46605FCA5707949960D766F86B9'; // Reemplaza con la dirección de tu contrato
  contratoABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "serviceId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "reviewText",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "rating",
          "type": "uint256"
        }
      ],
      "name": "ReviewSubmitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "serviceId",
          "type": "uint256"
        }
      ],
      "name": "ServiceCompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "serviceId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        }
      ],
      "name": "ServiceDisputed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "serviceId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "name": "ServiceListed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "serviceId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        }
      ],
      "name": "ServicePurchased",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_serviceId",
          "type": "uint256"
        }
      ],
      "name": "buyService",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_serviceId",
          "type": "uint256"
        }
      ],
      "name": "completeService",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_serviceId",
          "type": "uint256"
        }
      ],
      "name": "disputeService",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_serviceId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_reviewText",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_rating",
          "type": "uint256"
        }
      ],
      "name": "leaveReview",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "listService",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "serviceCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "serviceReviews",
      "outputs": [
        {
          "internalType": "address",
          "name": "consumer",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "serviceId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "reviewText",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "rating",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "services",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "provider",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "consumer",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isCompleted",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  // servicioId: number = 6; // ID del servicio para ejemplo
  private ethereumService = inject(EthersService);
  private modalService = inject(ModalService);

  tokens: Token[] = [];

  services : any[]  = [];

  constructor() {}

  async ngOnInit() {
    try {
      await this.ethereumService.inicializarContrato(
        this.contratoAddress,
        this.contratoABI
      );
      console.log('Contrato inicializado');

        this.services =  await this.ethereumService.obtenerItems();
    } catch (error) {
      console.error('Error al inicializar el contrato', error);
    }

    // this.tokenService.get().subscribe({
    //   next: ( tokens) => {
    //     this.tokens = tokens;
    //     console.log({tokens});

    //   },
    //   error : ( err ) => {
    //     console.log({err});
    //   },
    //   complete : () => {
    //     console.log('complete');
    //   }
    // })

    // try {
    //   console.log("Inicia aqui");
    //   await this.ethereumService.initializeContract(this.contratoAddress, this.contratoABI);
    //   console.log('Contrato inicializado');
    //   await this.ethereumService.getBalance();
    // } catch (error) {
    //   console.error('Error al inicializar el contrato:', error);
    // }
  }


  onSelectItem( item  : any ) {
    this.modalService.open(ModalBuyIntentComponent, {
      title: `Comprar`,
      size: 'sm',
      forms: null,
      data: {item},
      icon: 'assets/icons/heroicons/outline/information-circle.svg',
      actions : [
        {
          action: ActionType.Create,
          title: 'Comprar'
        }
      ]
    }).subscribe({
      next: ( resp ) => {
        this.comprarItem(item[0]);
      },
      error : ( err ) => {

      },
      complete : () => {

      }
    })



  }

  async listarItem() {
    try {
      await this.ethereumService.listarItem(this.nombre, this.precio);
      console.log('Ítem listado con éxito');
    } catch (error) {
      console.error('Error al listar el ítem:', error);
    }
  }

  async comprarItem(itemId: number) {
    try {
      await this.ethereumService.comprarItem(itemId);
      console.log('Ítem comprado con éxito');
    } catch (error) {
      console.error('Error al comprar el ítem:', error);
    }
  }

  async obtenerItem() {
    try {
      this.item = await this.ethereumService.obtenerItems();
    } catch (error) {
      console.error('Error al obtener el ítem:', error);
    }
  }

  onCreateSale() {
    const chatbotForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Detalles de tu producto',
        description: 'Añade detalles de tu venta',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            placeholder: 'localflow',
            title: 'Escribe el nombre de tu producto',
          },
          fieldFormControl: new FormControl(''),
        },
        {
          component: InputTextComponent,
          data: {
            placeholder: '10',
            title: 'Cual es el costo de tu chatbot  (mein)',
          },
          fieldFormControl: new FormControl(''),
        },
      ],
    };

    this.modalService
      .open(ModalServiceComponent, {
        title: `Ingresa los detalles de tu chatbot`,
        size: 'sm',
        forms: [chatbotForm],
        data: {},
        icon: 'assets/icons/heroicons/outline/plus.svg',
        actions: [
          {
            action: ActionType.Create,
            title: 'Ingresar',
          },
        ],
      })
      .subscribe({
        next: (resp) => {
          const formValues: string[] = [];
          const form = resp.form[0];

          form.dynamicFields.forEach((field: any) => {
            const fieldValue: string = field.fieldFormControl.value;
            formValues.push(fieldValue);
          });

          // console.log(formValues);
          const name = formValues[0];
          const price = formValues[1];

          this.ethereumService.listarItem(name, parseFloat(price));





        },
        error: (err) => {},
        complete: () => {},
      });
  }


  async onReloadList() {
    this.services = await  this.ethereumService.obtenerItems();
  }

}




// Utility functions for handling BigInt in JSON
export function bigIntToJson(value: BigInt): string {
  return value.toString();
}

export function jsonToBigInt(value: string): BigInt {
  return BigInt(value);
}

interface FormValues {
  [key: string]: string;
}
