import { ethers } from 'ethers';
import { Keypair } from '@solana/web3.js';
import * as bs58 from 'bs58';

// 创建以太坊钱包
export const createWallets = (numberOfWallets: number): { address: string; privateKey: string }[] => {
    let wallets: { address: string; privateKey: string }[] = [];
    for (let i = 0; i < numberOfWallets; i++) {
        let wallet = ethers.Wallet.createRandom(); // 创建随机钱包
        wallets.push({
            address: wallet.address,
            privateKey: wallet.privateKey
        });
    }
    return wallets;
}

// 创建 Solana 钱包
export const createSolWallets = (numberOfWallets: number): { address: string; privateKey: string }[] => {
    let wallets: { address: string; privateKey: string }[] = [];
    for (let i = 0; i < numberOfWallets; i++) {
        const wallet = Keypair.generate();
        const publicKey = wallet.publicKey.toBase58();
        const privateKey = wallet.secretKey.slice(0);
        wallets.push({
            address: publicKey,
            privateKey: bs58.encode(Uint8Array.from(privateKey))
        });
    }
    return wallets;
}