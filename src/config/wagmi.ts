import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  bsc,

} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'MuCoin',
  projectId: 'b1449e207723bd4c5d0fc9caad4d0ff5',
  chains: [
    bsc,
    mainnet,
    arbitrum,

  ],
  ssr: true,
});
