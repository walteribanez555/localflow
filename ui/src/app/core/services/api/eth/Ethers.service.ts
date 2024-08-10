import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class EthersService {
  private contrato: ethers.Contract | undefined;
  private provider: ethers.JsonRpcProvider | undefined;
  private signer: ethers.JsonRpcSigner | undefined;

  constructor() { }

  async inicializarContrato(contratoAddress: string, contratoABI: any) {
    if (!(window as any).ethereum) {
      throw new Error("MetaMask no está instalado");
    }

    // Create provider and signer
    this.provider = new ethers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
    this.signer = await this.provider.getSigner();

    // Initialize contract
    this.contrato = new ethers.Contract(contratoAddress, contratoABI, this.signer);
  }

  async listarItem(nombre: string, precio: number) {
    if (!this.contrato) throw new Error("Contrato no inicializado");
    const transaccion = await this.contrato['listarItem'](nombre, ethers.parseEther(precio.toString()));
    await transaccion.wait();
  }

  async comprarItem(itemId: number) {
    if (!this.contrato) throw new Error("Contrato no inicializado");
    const item = await this.contrato['obtenerItem'](itemId);
    const precio = item[1];
    const transaccion = await this.contrato['comprarItem'](itemId, { value: precio });
    await transaccion.wait();
  }

  async obtenerItem(itemId: number) {
    if (!this.contrato) throw new Error("Contrato no inicializado");
    return this.contrato['obtenerItem'](itemId);
  }
}
