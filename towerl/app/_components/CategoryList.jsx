import Image from 'next/image'
import Link from 'next/link'
// This file is a React component that renders a list of categories.
import React from 'react'

function CategoryList({ getCategoryList, selectedCategory }) {
    return (
        <div className="px-2 md:px-5 lg:px-10 py-3 lg:py-5">
            <h1 className="font-bold text-red-800 text-2xl">Danh Mục Sản Phẩm:</h1>
            {/*Layout for large screen with two rows */}
            <div className="lg:px-10 lg:pt-5 md:px-8 md:pt-4 px-5 pt-3">
                <div className="hidden lg:grid grid-cols-5 gap-6">
                    {getCategoryList.map((category, index) => (
                        <Link
                            href={'/products-category/' + encodeURIComponent(category?.name)}
                            // We use encodeURIComponent to encode the category name
                            // because it may contain special characters that are not allowed in URLs.
                            // For example, "/" is not allowed in URLs, so we replace it with "%2F".
                            key={index}
                            className={`w-[150px] flex flex-col gap-2 items-center justify-center
                                bg-red-200 p-2 rounded-lg
                                hover:cursor-pointer group transition-all hover:bg-red-400
                                duration-300 ease-in-out
                                ${selectedCategory==category.name&&'bg-red-700 text-white'}
                            `}>
                            {/* <Image src={category?.icon?.[0]?.url} alt = "Icon" width = {50} height = {50}/> */}
                            <Image
                                src={process.env.NEXT_PUBLIC_BACKEND_URL + category?.icon?.[0]?.url}
                                alt="Icon"
                                width={50} height={50}
                                className="transition-transform duration-300 ease-in-out group-hover:scale-115"
                            // We add group in dad-div to create a "group" effect, in son-Image we use
                            // group-hover to apply the effect when the parent div is hovered.
                            />
                            <h2 className={`text-center font-semibold
                                text-black
                                ${selectedCategory == category.name 
                                    ? 'text-white group-hover:text-white'
                                    : 'group-hover:text-white'
                                }
                            `}>
                                {category?.name}
                            </h2>
                        </Link>
                    ))}
                </div>
                {/* Layout cho màn hình nhỏ: scroll ngang */}
                <div className="lg:hidden flex gap-4 overflow-x-auto px-4 pb-2">
                    {getCategoryList.map((category, index) => (
                        <Link
                            href={'/products-category/' + encodeURIComponent(category?.name)}
                            key={index}
                            className="flex flex-col gap-2 items-center bg-red-200 p-4 rounded-lg
                            hover:cursor-pointer group transition-all hover:bg-red-400
                            duration-300 ease-in-out min-w-[130px] flex-shrink-0"
                        >
                            <Image
                                src={process.env.NEXT_PUBLIC_BACKEND_URL + category?.icon?.[0]?.url}
                                alt="Icon"
                                width={50}
                                height={50}
                                className="transition-transform duration-300 ease-in-out group-hover:scale-115"
                            />
                            <h2 className="text-center font-boldtext-black group-hover:text-white">{category?.name}</h2>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryList
