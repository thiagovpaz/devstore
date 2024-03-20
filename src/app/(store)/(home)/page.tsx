import Link from 'next/link';
import Image from 'next/image';

import { api } from '@/data/api';
import type { Product } from '@/data/types/product';

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60,
    },
  });

  return response.json();
}

export default async function Home() {
  const [mainProduct, ...products] = await getFeaturedProducts();

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${mainProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden justify-center items-end"
      >
        <Image
          src={mainProduct.image}
          width={920}
          height={920}
          quality={100}
          alt=""
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{mainProduct.title}</span>
          <span className="flex items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {mainProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>
      {products.map((product) => (
        <Link
          key={`product_${product.id}`}
          href={`/product/${product.slug}`}
          className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden justify-center items-end"
        >
          <Image
            src={product.image}
            width={920}
            height={920}
            quality={100}
            alt=""
            className="group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{product.title}</span>
            <span className="flex items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      ))}
      )
    </div>
  );
}
