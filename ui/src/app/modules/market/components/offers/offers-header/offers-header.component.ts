import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  NgModule,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EthersService } from 'src/app/core/services/api/eth/Ethers.service';

@Component({
  selector: 'app-offers-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './offers-header.component.html',
})
export class OffersHeaderComponent {
  nombre: string = '';
  precio: number = 0;
  item: any;

  contratoAddress = '0xc326D38e8deC84638C5eF5C9613390D5322faC99'; // Reemplaza con la dirección de tu contrato
  private contratoABI = [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_serviceId',
          type: 'uint256',
        },
      ],
      name: 'buyService',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_serviceId',
          type: 'uint256',
        },
      ],
      name: 'completeService',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_serviceId',
          type: 'uint256',
        },
      ],
      name: 'disputeService',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_serviceId',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: '_reviewText',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: '_rating',
          type: 'uint256',
        },
      ],
      name: 'leaveReview',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_price',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: '_description',
          type: 'string',
        },
      ],
      name: 'listService',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'serviceId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'consumer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'reviewText',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rating',
          type: 'uint256',
        },
      ],
      name: 'ReviewSubmitted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'serviceId',
          type: 'uint256',
        },
      ],
      name: 'ServiceCompleted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'serviceId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'consumer',
          type: 'address',
        },
      ],
      name: 'ServiceDisputed',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'serviceId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'price',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'provider',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'description',
          type: 'string',
        },
      ],
      name: 'ServiceListed',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'serviceId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'consumer',
          type: 'address',
        },
      ],
      name: 'ServicePurchased',
      type: 'event',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'serviceCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'serviceReviews',
      outputs: [
        {
          internalType: 'address',
          name: 'consumer',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'serviceId',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'reviewText',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'rating',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'services',
      outputs: [
        {
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          internalType: 'address payable',
          name: 'provider',
          type: 'address',
        },
        {
          internalType: 'address payable',
          name: 'consumer',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'price',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'description',
          type: 'string',
        },
        {
          internalType: 'bool',
          name: 'isCompleted',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  servicioId: number = 6; // ID del servicio para ejemplo
  private ethereumService = inject(EthersService);
  constructor() {}

  async ngOnInit() {
    try {
      await this.ethereumService.inicializarContrato(
        this.contratoAddress,
        this.contratoABI
      );
      console.log('Contrato inicializado');
    } catch (error) {
      console.error('Error al inicializar el contrato', error);
    }

    // try {
    //   console.log("Inicia aqui");
    //   await this.ethereumService.initializeContract(this.contratoAddress, this.contratoABI);
    //   console.log('Contrato inicializado');
    //   await this.ethereumService.getBalance();
    // } catch (error) {
    //   console.error('Error al inicializar el contrato:', error);
    // }
  }

  async listarItem() {
    try {
      await this.ethereumService.listarItem(this.nombre, this.precio);
      console.log('Ítem listado con éxito');
    } catch (error) {
      console.error('Error al listar el ítem:', error);
    }
  }

  async comprarItem() {
    try {
      await this.ethereumService.comprarItem(this.servicioId);
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
}

// Utility functions for handling BigInt in JSON
export function bigIntToJson(value: BigInt): string {
  return value.toString();
}

export function jsonToBigInt(value: string): BigInt {
  return BigInt(value);
}
