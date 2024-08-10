import { inject, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ethers, Contract } from 'ethers';
import { ModalKeyIdComponent } from 'src/app/modules/market/components/modal-keyId/modal-keyId.component';
import { InputTextComponent } from 'src/app/shared/components/customInputs/input-text/input-text.component';
import { FormTemplateComponent } from 'src/app/shared/components/form-template/form-template.component';
import { ActionType } from 'src/app/shared/enum/action';
import { ModalService } from 'src/app/shared/services/Modal.service';
import { DynamicForm } from 'src/app/shared/types/dynamic.types';

@Injectable({
  providedIn: 'root',
})
export class EthersService {
  private contrato: ethers.Contract | undefined;
  private provider: ethers.JsonRpcProvider | ethers.BrowserProvider | undefined;
  private signer: ethers.Wallet | ethers.JsonRpcSigner | undefined;

  constructor() {}

  private modalService = inject(ModalService);

  async inicializarContrato(contratoAddress: string, contratoABI: any) {
    // if (typeof window.ethereum !== 'undefined') {
      if (false) {

      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider?.getSigner();

      this.contrato = new ethers.Contract(
        contratoAddress,
        contratoABI,
        this.signer
      );
    } else {
      let privateKey = '';

      const keyForm: DynamicForm = {
        component: FormTemplateComponent,
        data: {
          title: 'Ingresa tu clave privada',
          description: 'Es la clave privada de metamask',
        },
        dynamicFields: [
          {
            component: InputTextComponent,
            data: {
              placeholder: 'Clave privada',
              title: 'Metodo de compra',
            },
            fieldFormControl: new FormControl(''),
          },
        ],
      };

      this.modalService
        .open(ModalKeyIdComponent, {
          title: `Deseas generar la orden?`,
          size: 'sm',
          forms: [keyForm],
          data: {},
          icon: 'assets/icons/heroicons/outline/plus.svg',
          actions: [
            {
              action: ActionType.Create,
              title: 'Generar Nueva Orden',
            },
          ],
        })
        .subscribe({
          next:  async (resp) => {
            const { form } = resp;

            const dynamicFields = form[0].dynamicFields;


            privateKey = dynamicFields[0].fieldFormControl.value;


            // Create provider and signer
            this.provider = new ethers.JsonRpcProvider(
              'https://api.avax-test.network/ext/bc/C/rpc'
            );

            const block = await this.provider.getBlockNumber();

            this.signer = new ethers.Wallet(privateKey, this.provider);

            // // Initialize contract
            this.contrato = new ethers.Contract(
              contratoAddress,
              contratoABI,
              this.signer
            );

            console.log({ contrato: this.contrato });
          },
          error: (err) => {
            console.log({ err });
          },
          complete:() => {


          },
        });
    }

  }

  async listarItem(nombre: string, precio: number) {
    if (!this.contrato) throw new Error('Contrato no inicializado');

    // const precioEther = ethers.parseEther(precio.toString()); // Convert price to BigNumber
    const precioEther = ethers.parseUnits(precio.toString(), 'wei');
    const transaccion = await this.contrato['listService'](precioEther, nombre); // Call listService function

    await transaccion.wait(); // Wait for the transaction to be mined
  }

  async comprarItem(serviceId: number) {
    if (!this.contrato) throw new Error('Contrato no inicializado');

    const item = await this.contrato['services'](serviceId); // Call services mapping
    const precio = item.price; // Adjusted to access price
    const transaccion = await this.contrato['buyService'](serviceId, {
      value: precio,
    }); // Call buyService function
    await transaccion.wait(); // Wait for the transaction to be mined
  }

  async obtenerItems(): Promise<any[]> {
    if (!this.contrato) throw new Error('Contrato no inicializado');
    const serviceIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // Example service IDs, replace with actual IDs
    const items = await Promise.all(
      serviceIds.map((id) => this.contrato!['services'](id))
    );
    console.log('Ítems obtenidos:', items);
    return items.map(this.transformBigInts);
  }

  replacer(key: string, value: any): any {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  }

  async getBalance() {
    if (!this.signer) throw new Error('Signer no inicializado');
    const balance = await this.provider?.getBalance(this.signer.getAddress());
    console.log('Balance:', balance);
    // return ethers.utils.formatEther(balance);
  }

  transformBigInts(data: any): any {
    if (typeof data === 'bigint') {
      return data.toString();
    } else if (Array.isArray(data)) {
      return data.map(this.transformBigInts);
    } else if (data && typeof data === 'object') {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          this.transformBigInts(value),
        ])
      );
    }
    return data;
  }
}
