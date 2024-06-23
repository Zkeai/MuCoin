import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  bsc,
  mainnet,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'MuCoin',
  projectId: 'b1449e207723bd4c5d0fc9caad4d0ff5',
  chains: [
    bsc,
    mainnet,
  ],
  ssr: true,
});
