import { ethers } from 'ethers';

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