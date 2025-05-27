
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.locale('vi');
import ProductClientControls from '@/app/_components/ProductClientControls';
import RelatedProducts from '@/app/_components/RelatedProducts';
import Header from '@/app/_components/Header';

async function productDetail({ params }) {
    const productSlug = decodeURIComponent(params.productSlug);
    const productDetail = await GlobalApi.getProductDetailBySlug(productSlug);

    //////
    // Lấy danh sách sản phẩm thuộc category
    // Get current date and future date
    const formattedTime = dayjs().format('DD/MM/YYYY');
    const futureDateFrom = dayjs().add(2, 'day').format('dddd, DD/MM/YYYY');
    const futureDateTo = dayjs().add(4, 'day').format('dddd, DD/MM/YYYY');
    // console.log("product data hereeeeeee", productDetail);

    // console.log("Product's categories: ", productDetail?.[0]?.categories);
    // const productCategories = productDetail?.[0]?.categories;


    //////////////////////
    // List products with the same categories of product choosen
    const productCategories = productDetail?.[0]?.categories;
    const categoryId = productCategories?.[0]?.id;
    let relatedProducts = [];
    if (categoryId) {
        relatedProducts = await GlobalApi.getProductsByCategoryId(categoryId);
        // Remove the choosen product from list
        relatedProducts = relatedProducts.filter(p => p.id !== productDetail[0].id);
    }



    return (
        <div>

            <div className="px-5 py-5 sm:px-10 md:px-12 lg:px-15x">
                {productDetail.map((product) => (
                    console.log("product's id infor:", product.id),
                    console.log("type of product: ", typeof (product.id)),
                    <div key={product.id}>
                        <div className="flex flex-col sm:grid sm:grid-cols-3 p-5 bg-gray-50">
                            {/* Image */}
                            <div className="sm:col-span-1 rounded-2xl">
                                <Image
                                    src={
                                        process.env.NEXT_PUBLIC_BACKEND_URL +
                                        product?.images?.[0]?.url
                                    }
                                    alt={product?.name}
                                    width={300}
                                    height={300}
                                    className="w-full h-auto object-cover rounded-2xl border-2 border-red-300"
                                />
                            </div>

                            {/* Info */}
                            <div className="sm:col-span-2 sm:px-5 lg:px-10">

                                {/* Product's name */}
                                <h2 className="font-bold text-2xl mb-2">{product?.name}</h2>

                                {/* Number of sold product */}
                                <p>Sản Phẩm Đã Bán: {product?.numberOfProductPurchased}</p>

                                {/* Price */}
                                <div className="inline-flex items-center px-2 py-2">
                                    {
                                        product?.sellingPrice && product.sellingPrice < product.price ? (
                                            <div className="flex items-center">
                                                <span className="lg:text-2xl text-xl font-bold text-red-700 flex">
                                                    {product?.sellingPrice?.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    })}
                                                </span>
                                                <span className="text font-bold line-through text-gray-500 pl-7 flex items-start">
                                                    {product?.price?.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    })}
                                                </span>

                                            </div>
                                        ) : (
                                            <span className="lg:text-2xl text-xl font-bold text-red-700">
                                                {product?.price?.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </span>
                                        )
                                    }
                                </div>

                                <div className="flex flex-col">
                                    {/* Delivery :*/}
                                    <section className="flex p-2">
                                        <h2 className="items-start w-1/4 md:w-1/5 lg:w-1/5 flex-shrink-0 pr-5">Vận Chuyển</h2>
                                        <div>
                                            {/* Currently I do not have dynamic location of delivery, so I'll make it stay */}
                                            <p>Giao hàng từ <span className="font-semibold">Mỹ Đức - Hà Nội</span></p>
                                            <p>Thời gian nhận hàng dự kiến: {" "}
                                                <span className="font-semibold">
                                                    {futureDateFrom} - {futureDateTo}
                                                </span>
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Giao hàng miễn phí cho đơn hàng từ 500.000đ
                                            </p>
                                        </div>
                                    </section>
                                    {/* Offer policy: */}
                                    <section className="flex p-2">
                                        <h2 className="items-start w-1/4 md:w-1/5 lg:w-1/5 flex-shrink-0 pr-5">Ưu Đãi</h2>
                                        <div>
                                            <p className="">Giảm 10% khi mua từ 100 sản phẩm trở lên, không giới hạn</p>
                                            <p className="text-sm text-gray-600">Liên hệ hotline: {"uiia"} để hợp tác và tham khảo các ưu đãi lớn hơn khi mua sỉ</p>
                                        </div>
                                    </section>
                                    {/* Payment method */}
                                    <section className="flex p-2">
                                        <h2 className="items-start w-1/4 md:w-1/5 lg:w-1/5 flex-shrink-0 pr-5">Phương Thức Thanh Toán</h2>
                                        <div>
                                            <p>Thanh toán khi nhận hàng (COD)</p>
                                            <p className="text-sm text-gray-600">Chỉ áp dụng cho đơn hàng dưới 5 triệu</p>
                                        </div>
                                    </section>
                                    {/* Quantity: Because async function does not allow us to use useState
                                    so I have to create a new file to execute the quantity and put it into page.jsx 
                                */}

                                    <ProductClientControls
  productSlug={product.slug}  // hoặc đúng slug của product
  price={product.price}
  sellingPrice={product.sellingPrice}
/>



                                    {/* Add to cart button is also in ProductClientControls, 
                                    because I need to get the quantity client chooses to execute the next step 
                                */}

                                </div>
                            </div>
                        </div>
                        {/* Product's description here */}
                        <div className=" bg-gray-50 my-5 px-5">
                            <h2 className="font-bold text-2xl py-1">Mô Tả Sản Phẩm</h2>
                            <div className="prose whitespace-pre-line">
                                <ReactMarkdown>{product?.description}</ReactMarkdown>
                            </div>
                        </div>
                        <div className="bg-gray-50 my-5 px-5">
                            <h2 className="font-bold text-2xl pt-1 pb-3.5">Có Thể Bạn Thích</h2>
                            <RelatedProducts products={relatedProducts} />
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default productDetail;
