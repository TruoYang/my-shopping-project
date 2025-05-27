"use client";
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CircleUserRound, LayoutGrid, Search, ShoppingBasket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import GlobalApi from '../_utils/GlobalApi';
import { UpdateCartContext } from '../_context/UpdateCartContext';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartItemList from './CartItemList';
import { toast } from 'sonner';


function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const { updateCart } = useContext(UpdateCartContext);

  const router = useRouter();

  const [cartItemList, setCartItemList] = useState([]);

  const [subtotal, setSubtotal] = useState(0);
  // console.log("Cart items listtt:", cartItemList);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach(item => {
      total = total + item.amount
    });
    setSubtotal(total);
  }, [cartItemList])


  // ✅ Hàm lấy giỏ hàng – khai báo đúng cách, dùng lại được nhiều lần
  const getCartItems = async (userId, jwtToken) => {
    try {
      const cartItems = await GlobalApi.getCartItems(userId, jwtToken);
      setTotalCartItem(cartItems?.length || 0);
      setCartItemList([...cartItems]); // Cập nhật lại danh sách giỏ hàng
      console.log("Cart items:", cartItems);
      // console.log("Cart items:", cartItems);
    } catch (err) {
      console.error("Lỗi lấy giỏ hàng:", err);
    }
  };

  // ✅ Khi component load
  useEffect(() => {
    const jwtFromStorage = localStorage.getItem('jwt');
    const userFromStorage = localStorage.getItem('user');

    if (jwtFromStorage) {
      setJwt(jwtFromStorage);
      setIsLogin(true);
      GlobalApi.getUserInfo(jwtFromStorage).then((res) => {
        setUserName(res.data.username);
      });
    }

    if (userFromStorage) {
      const parsedUser = JSON.parse(userFromStorage);
      setUser(parsedUser);
    }

    getCategoryList();
  }, []);

  // ✅ Khi user và jwt đã sẵn sàng → Lấy giỏ hàng
  useEffect(() => {
    if (user && jwt) {
      getCartItems(user.id, jwt);
    }
  }, [user, jwt]);

  // ✅ Khi updateCart thay đổi → Refresh lại giỏ hàng
  useEffect(() => {
    if (user && jwt) {
      getCartItems(user.id, jwt);
    }
  }, [updateCart]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.data.data);
    });
  };


  const onDeleteItem = async (cartSlug) => {
  try {
    await GlobalApi.deleteCartItemBySlug(cartSlug, jwt);
    toast.success('Đã xoá khỏi giỏ hàng');

    // ⏳ Đợi backend xử lý xoá hoàn tất rồi mới gọi lại
    await new Promise(resolve => setTimeout(resolve, 400)); // Delay 300ms

    await getCartItems(user.id, jwt);
  } catch (err) {
    toast.error('Lỗi khi xoá sản phẩm');
    console.error('Xoá lỗi:', err);
  }
};



  const onSignOut = () => {
    localStorage.clear();
    setIsLogin(false);
    setUser(null);
    router.push('/sign-in');
  };

  return (
    <div className="p-3 shadow-sm flex justify-between mb-2">
      <div className="flex items-center gap-8">
        <Link href='/'>
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </Link>
        <div className="hover:cursor-pointer flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h2 className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 hover:bg-slate-300">
                <LayoutGrid className="h-5 w-5" /> Danh Mục
              </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Tìm kiếm danh mục:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categoryList.map((category, index) => (
                <Link
                  href={'/products-category/' + encodeURIComponent(category?.name)}
                  key={index}
                >
                  <DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
                    <Image
                      src={process.env.NEXT_PUBLIC_BACKEND_URL + category?.icon?.[0]?.url}
                      unoptimized
                      alt="Icon"
                      width={25}
                      height={25}
                    />
                    <span>{category?.name}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <Search className="flex items-start" />
          <input type="text" placeholder="Tìm kiếm..." className="outline-none" />
        </div>
      </div>
      <div className="flex gap-2 items-center">




        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 items-center text-lg bg-red-700 text-white py-1 px-3 rounded-md cursor-pointer">
              <ShoppingBasket />
              <span>{totalCartItem}</span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-red-700 text-white p-2 font-bold text-lg">
                Giỏ Hàng của tôi: ({totalCartItem})
              </SheetTitle>
            </SheetHeader>

            <div className="max-h-[100vh] overflow-y-auto pl-2">
              <CartItemList 
                key = {cartItemList.length}
                cartItemList={cartItemList}
                onDeleteItem={onDeleteItem}
              />
            </div>
            <div className="sticky w-full pr-4 bottom-0 flex flex-col bg-white items-center">
              <h2 className='py-2 text-lg font-bold text-black'>
                Tổng đơn hàng: {subtotal.toLocaleString('vi-VN')} vnđ
              </h2>
              <SheetClose asChild>
                <Button 
                onClick = {() => router.push( jwt ? '/checkout' : '/sign-in')}
                className='mb-2 w-full bg-red-800 border-2 cursor-pointer
                 hover:bg-red-700'>
                  Đi tới trang thanh toán
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>


        {!isLogin ? (
          <Link href="/sign-in">
            <Button className="hover:cursor-pointer">Đăng Ký</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className="h-10 w-10 hover:bg-red-200 transition-500 rounded-full text-primary outline-none hover:cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Hi, {userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Order</DropdownMenuItem>
              <DropdownMenuItem onClick={onSignOut} className="cursor-pointer">
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Header;
