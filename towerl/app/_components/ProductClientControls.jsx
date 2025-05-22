"use client";
import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import GlobalApi from '../_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function ProdutClientControls({ productId, price, sellingPrice }) {
    const [quantity, setQuantity] = useState(1);
    const [jwt, setJwt] = useState(null);
    const [user, setUser] = useState(null);


    const router = useRouter();

    // Lấy jwt và user từ sessionStorage
    useEffect(() => {
        const jwtFromStorage = sessionStorage.getItem('jwt');
        const userFromStorage = sessionStorage.getItem('user');

        if (jwtFromStorage) setJwt(jwtFromStorage);
        if (userFromStorage) setUser(JSON.parse(userFromStorage));
    }, []);

    const handleQuantityIncrease = () => setQuantity(prev => prev + 1);
    const handleQuantityDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : prev));
    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) setQuantity(value);
    };

    const addToCart = () => {
        if (!jwt) {
            router.push('/sign-in');
            return;
        }

        if (!user || !user.id || !productId) {
            toast.error('Thiếu thông tin người dùng hoặc sản phẩm');
            console.warn('USER:', user);
            console.warn('PRODUCT:', productId);
            return;
        }

        const data = {
            data: {
                quantity,
                amount: (sellingPrice || price) * quantity,
                users_permissions_user: {
                    connect: [{ id: user.id }]
                },
                products: {
                    connect: [productId - 2]
                }
            }
        };

        console.log("Payload gửi đi:", data);

        GlobalApi.addToCart(data, jwt)
            .then(resp => {
                toast.success('Đã thêm vào giỏ hàng');
                console.log('Response:', resp);
            })
            .catch(err => {
                toast.error('Lỗi khi thêm vào giỏ hàng');
                console.error('Lỗi add to cart:', err.response?.data || err.message || err);
            });
    };

    return (
        <div>
            {/* quantity setting */}
            <div>
                <section className="flex items-center p-2 flex-wrap gap-4">
                    <h2 className="w-1/4 md:w-1/5 lg:w-1/5 pr-5 flex-shrink-0 text-sm text-gray-700">
                        Số Lượng
                    </h2>
                    <div className="flex items-center border border-gray-300 overflow-hidden">
                        <button
                            className="w-10 h-8 border-r border-gray-300 text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                            onClick={handleQuantityDecrease}
                        > - </button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleInputChange}
                            className="w-16 h-8 text-center outline-none"
                            min={1}
                            max={99}
                        />
                        <button
                            className="w-10 h-8 border-l border-gray-300 text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                            onClick={handleQuantityIncrease}
                        > + </button>
                    </div>
                    <p className="text-sm text-gray-600 whitespace-nowrap">
                        Còn lại: <span className="font-semibold">100 sản phẩm</span>
                    </p>
                </section>
            </div>

            {/* Add to cart button */}
            <section className="flex py-1 flex-wrap">
                <button
                    onClick={addToCart}
                    className="flex bg-red-100 items-center justify-around px-4 py-3 mx-2 my-1 border border-red-700 whitespace-nowrap hover:cursor-pointer hover:bg-red-50"
                >
                    <ShoppingCart className="text-red-700" />
                    <p className="text-red-700 text-sm ml-2">Thêm Vào Giỏ Hàng</p>
                </button>
                <button
                    className="flex bg-red-800 items-center justify-around px-8 py-3 mx-2 my-1 whitespace-nowrap hover:cursor-pointer hover:bg-red-700">
                    <h2 className="text-white text-sm">Mua Ngay</h2>
                </button>
            </section>
        </div>
    );
}

export default ProdutClientControls;
