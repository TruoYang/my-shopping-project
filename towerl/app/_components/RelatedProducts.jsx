// app/_components/RelatedProducts.jsx
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function RelatedProducts({ products }) {
  if (!products || products.length === 0) return <p>Không có sản phẩm nào.</p>;

  console.log("Related products data:", products);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          className="border p-4 rounded-lg hover:scale-102 transition:ease-in-out duration-200"
          href={'/product/' + encodeURIComponent(product.slug)}
        >
          <Image
            src={process.env.NEXT_PUBLIC_BACKEND_URL + product?.images?.[0]?.url}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="flex justify-between mt-2 items-end">
            <div className="ml-auto">
              {product?.sellingPrice && product.sellingPrice < product.price ? (
                <div className="flex items-center">
                  <span className="text font-bold line-through text-gray-500">
                    {product?.price?.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </span>
                  <span className="text-2xl font-bold text-red-700 pl-3">
                    {product?.sellingPrice?.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-red-700">
                  {product?.price?.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              )}
            </div>
          </div>
          <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
          <p className="text-gray-600 line-clamp-2">{product.description}</p>
        </Link>
      ))}
    </div>
  );
}

export default RelatedProducts;
