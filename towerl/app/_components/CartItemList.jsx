import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function CartItemList({ cartItemList, onDeleteItem }) {
    
    return (
        <div>
            {cartItemList.map((cart, index) => (
                <div key={cart.cartSlug ? cart.cartSlug : `fallback-key-${index}`} className="my-2 flex">
                    <div className="flex gap-6 items-center">
                        <Image src={cart.image}
                            width={90}
                            height={90}
                            alt={cart.name}
                            className="border p-2"
                        />
                        <div>
                            <h2 className="font-bold text-black">Sản phẩm: {cart.name}</h2>
                            <h2>Số lượng: {cart.quantity}</h2>
                            <h2 className="text-black">Tổng số tiền: {cart.amount} vnđ</h2>
                        </div>
                        <div className=" right-[10px] cursor-pointer p-5">
                            <TrashIcon 
                                className="text-green-600"
                                onClick = {() => onDeleteItem(cart.cartSlug)}
                            />
                        </div>
                    </div>

                </div>
            ))}
            

        </div>
    )
}

export default CartItemList