import React from 'react';

import { CartProvider } from '@/contexts/cart-context';
import { Header } from '@/components/header';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="mx-auto grid grid-rows-app min-h-screen w-full max-w-[1600px] gap-5 px-8 py-8">
        <Header />

        {children}
      </div>
    </CartProvider>
  );
}
