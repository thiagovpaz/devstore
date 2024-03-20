import { ImageResponse } from 'next/og';
import colors from 'tailwindcss/colors';

import { env } from '@/env';
import type { Product } from '@/data/types/product';
import { api } from '@/data/api';

export const runtime = 'edge';

export const alt = '';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 15, // 15 minutes
    },
  });

  return response.json();
}

export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  const productImageURL = new URL(product.image, env.APP_URL).toString();

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  );
}
