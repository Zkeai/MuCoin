import { ethers } from 'ethers';
import {Keypair, PublicKey} from '@solana/web3.js'
import * as bs58 from 'bs58';


export const createWallets = (numberOfWallets) => {
    let wallets = [];
    for (let i = 0; i < numberOfWallets; i++) {
        let wallet = ethers.Wallet.createRandom(); // 创建随机钱包
        wallets.push({
            address: wallet.address,
            privateKey: wallet.privateKey
        });
    }
    return wallets;
}


export const createSolWallets = (numberOfWallets) =>{
    let wallets = [];
    for (let i = 0; i < numberOfWallets; i++) {
        const wallet = Keypair.generate()
        const publicKey = wallet.publicKey.toBase58();
        const privateKey = wallet.secretKey.slice(0);
        wallets.push({
            address: publicKey,
            privateKey: bs58.encode(Uint8Array.from(privateKey))
        });
    }
    return wallets;
}

