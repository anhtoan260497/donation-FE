import Header from '../components/Header/Header'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  bscTestnet,
  bsc,
  sepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'Rainbow',
  projectId: '1b9dfe81327ff767685914b7f03e2ecf',
  chains: [bscTestnet, mainnet, bsc, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});


function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider><Header />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </>
}

export default MyApp
