import Image from 'next/image'
import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'


function ProductList({ getProductList }) {
    return (
        <div className="px-2 md:px-5 lg:px-10 py-3 lg:py-5">
            <h1 className="text-2xl font-bold text-red-800">Sản Phẩm Bán Chạy:</h1>
            <div

                className="
                grid grid-cols-2 gap-5 mt-1
                md:grid-cols-3 md:gap-5 md:mt-2
                lg:grid-cols-4 lg:gap-7 lg:mt-4"
            >
                {getProductList.map((product, index) => (
                    // console.log("Products:", product.name, "| Slug:", product.slug),
                    <div key={index}>
                        <Link
                            href={'/product/' + encodeURIComponent(product.slug)}
                            className=" border-2 rounded-2xl lg:p-3 md:p-2 flex flex-col 
                                        items-center justify-center lg:gap-2 md:gap-1
                                        lg:h-[300px] md:h-[250px] h-[200px] hover:cursor-pointer 
                                        group transition-all hover:scale-110"

                        >
                            <div className="relative overflow-hidden rounded-md">
                                {
                                    (product?.sellingPrice && product?.price !== product?.sellingPrice) ? (
                                        <div className="absolute right-0 top-0 flex items-center justify-center  w-2/5 h-1/6 z-10 bg-red-100 border-l-2 border-b-2 rounded-tr-md">
                                            <h1 className="font-bold text-red-500 text-xl items-center justify-center">-{Math.round(((product?.price - product?.sellingPrice) / product?.price * 100)).toLocaleString()}%</h1>
                                        </div>
                                    ) : (
                                        <div>
                                        </div>
                                    )
                                }
                                <Image
                                    src={process.env.NEXT_PUBLIC_BACKEND_URL + product?.images?.[0]?.url}
                                    alt="Product's image"
                                    width={200}
                                    height={200}
                                    className="lg:w-[200px] md:w-[170px] w-[140px] object-contain pointer-events-none border-2"
                                />

                            </div>
                            <div className="relative group w-10/12">
                                <p className="truncate items-center justify-center text-center font-bold">
                                    {product?.name}
                                </p>
                                <div className="absolute left-0 bottom-full mb-1 w-max max-w-10/12 px-2 py-1 text-sm bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-200 z-30 whitespace-normal">
                                    {product?.name}
                                </div>
                            </div>

                            <h3>
                                {
                                    (
                                        !product?.sellingPrice ||
                                        product?.sellingPrice === "" ||
                                        product?.sellingPrice === product?.price
                                    ) ? (
                                        <div>
                                            <h2>{product?.price.toLocaleString()} ₫</h2>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row gap-3">
                                            <h2 className="line-through text-red-600 font-bold">{product?.price.toLocaleString()} ₫</h2>
                                            <h2>{product?.sellingPrice.toLocaleString()} ₫</h2>
                                        </div>
                                    )
                                }
                            </h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList