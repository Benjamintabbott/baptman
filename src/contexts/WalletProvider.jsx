'use client';

import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

export const WalletContextProvider = ({ children }) => {
  return (
    <AptosWalletAdapterProvider autoConnect={true}>
      {children}
    </AptosWalletAdapterProvider>
  );
};
