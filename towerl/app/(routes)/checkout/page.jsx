'use client'

import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowBigRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner'; // nếu bạn dùng toast báo thành công

function CheckOut() {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressType, setAddressType] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    const jwtFromStorage = localStorage.getItem('jwt');

    if (userFromStorage && jwtFromStorage) {
      setUser(userFromStorage);
      setJwt(jwtFromStorage);

      // Khởi tạo giá trị form từ user
      setName(userFromStorage.username || '');
      setEmail(userFromStorage.email || '');
    }
  }, []);

  useEffect(() => {
    if (user && jwt) {
      getCartItems(user.id, jwt);
    }
  }, [user, jwt]);

  const getCartItems = async (userId, jwtToken) => {
    try {
      const cartItems = await GlobalApi.getCartItems(userId, jwtToken);
      setCartItemList(cartItems);
      setTotalCartItem(cartItems.length || 0);

      let total = 0;
      cartItems.forEach(item => {
        total += item.amount;
      });
      setSubtotal(total);
    } catch (error) {
      console.error("Lỗi lấy giỏ hàng:", error);
    }
  };

  const shippingFee = (subtotal > 300000 ? 0 : 15000);
  const extraFee = 0;
  const totalOrder = subtotal + shippingFee + extraFee;


  function generateUID() {
    // Tạo UID dạng chuỗi gồm timestamp + random 6 ký tự hex
    return (
      Date.now().toString(16) +
      Math.random().toString(16).slice(2, 8)
    );
  }
  const router = useRouter();

  const handleOrder = () => {
    if (!name || !email || !phone || !shippingAddress || cartItemList.length === 0) {
      alert('Vui lòng điền đầy đủ thông tin và kiểm tra giỏ hàng!');
      return;
    }

    const orderId = generateUID();
    const payload = {
      data: {
        orderId: orderId,
        totalOrderAmount: totalOrder,
        username: name,
        email: email,
        phone: phone,
        typeAddress: addressType,
        address: shippingAddress,
        userId: user.id,
        orderItemList: cartItemList.map(item => ({
          quantity: item.quantity,
          price: item.amount,
          product: item.productId,
        })),
      }
    };

    console.log('Sending payload:', payload);
    GlobalApi.createOrder(payload, jwt)
      .then(() => {
        // ✅ Sau khi đặt hàng thành công, xoá toàn bộ item trong giỏ hàng
        return Promise.all(
          cartItemList.map(item =>
            GlobalApi.deleteCartItemBySlug(item.cartSlug, jwt)
          )
        );
      })
      .then(() =>{
        return getCartItems(user.id, jwt)
      })
      .then(() => {
        toast.success("Đặt hàng thành công và đã xoá giỏ hàng!");
        router.push('/');
      })
      .catch(err => {
        console.error("Lỗi xoá giỏ hàng sau đặt hàng:", err);
        toast.error("Có lỗi khi xử lý đơn hàng hoặc xoá giỏ hàng!");
      });
  };


  return (
    <div>
      <h2 className='p-4 bg-red-400 text-xl font-bold text-center text-white'>Trang Thanh Toán</h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Thông Tin Đơn Hàng</h2>
          <div className="grid grid-cols-2 gap-10 mt-4 mb-6">
            <Input
              className="py-5 border-2 border-gray-500"
              placeholder="Tên khách hàng"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className="py-5 border-2 border-gray-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3 mb-6">
            <Input
              className="py-5 border-2 border-gray-500"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              className="py-5 border-2 border-gray-500"
              placeholder="Loại địa chỉ (nhà riêng, văn phòng...)"
              value={addressType}
              onChange={(e) => setAddressType(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <Input
              className="py-5 border-2 border-gray-500"
              placeholder="Địa chỉ giao hàng"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Chi tiết thanh toán ({totalCartItem} sản phẩm)
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Tổng tiền hàng: <span>{subtotal.toLocaleString('vi-VN')} vnđ</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Phí vận chuyển: <span>{shippingFee.toLocaleString('vi-VN')} vnđ</span>
            </h2>
            <h2 className="flex justify-between">
              Phụ phí (thuế, phí dịch vụ...): <span>{extraFee.toLocaleString('vi-VN')} vnđ</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Tổng đơn hàng: <span>{totalOrder.toLocaleString('vi-VN')} vnđ</span>
            </h2>
            <Button className="justify-center items-center" onClick={handleOrder}>
              Đặt hàng <ArrowBigRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
