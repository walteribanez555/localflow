import { Contract, ethers } from 'ethers';

interface ContractType extends Contract {
    buyService(serviceId: number, overrides?: ethers.PayableOverrides): Promise<ethers.ContractTransaction>;
    services(serviceId: number): Promise<{
        id: ethers.BigNumber;
        provider: ethers.PayableAddress;
        consumer: ethers.PayableAddress;
        price: ethers.BigNumber;
        description: string;
        isCompleted: boolean;
    }>;
    estimateGas: {
        buyService(serviceId: number, overrides?: ethers.PayableOverrides): Promise<ethers.BigNumber>;
    };
    provider: ethers.providers.Provider;
    signer: ethers.Signer;
}
