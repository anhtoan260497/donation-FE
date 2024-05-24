

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    sepolia, bscTestnet, mainnet, bsc
} from 'wagmi/chains';


const config = getDefaultConfig({
    appName: 'Donation',
    projectId: '1b9dfe81327ff767685914b7f03e2ecf',
    chains: [sepolia, bscTestnet, mainnet, bsc],
    ssr: true,  // If your dApp uses server side rendering (SSR)
});

export default config