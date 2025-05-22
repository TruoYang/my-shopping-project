'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { use } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


function Header() {

  const [categoryList, setCategoryList] = useState([]);
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt')
    const userData = sessionStorage.getItem("user")
    if(jwt){
      GlobalApi.getUserInfo(jwt).then((res) => {
        console.log("User Infor:", res.data.username)
        setUser(res.data.username)
      })
    }
    if(userData){
      setUser(JSON.parse(userData))
    }
    setIsLogin(!!jwt)
    getCategoryList()
  }, [])

  const router = useRouter()
  // Fetching Category List
  // This function fetches the category list from the API and logs the response to the console.
  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      // console.log("CategoryList Resp:", resp.data.data);
      // console.log("Image URL:", process.env.NEXT_PUBLIC_BACKEND_URL + resp.data.data[0]?.icon?.[0]?.url);
      setCategoryList(resp.data.data);
    })
  }

  const onSignOut = () => {
    sessionStorage.clear()
    router.push('/sign-in')
  }

  
  return (
    <div className="p-3 shadow-sm flex justify-between mb-2">
      <div className="flex items-center gap-8">
        <Link href='http://localhost:3000'>
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </Link>
        <div className='hover:cursor-pointer flex gap-2 '>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h2 className="hidden md:flex gap-2 items-center
                    border rounded-full p-2 px-10 bg-slate-200 hover:bg-slate-300">
                <LayoutGrid className="h-5 w-5" /> Danh Mục
              </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Tìm kiếm danh mục:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categoryList.map((category, index) => (
                <Link href={'/products-category/' + encodeURIComponent(category?.name)} key={index}>
                  <DropdownMenuItem key={index} className='flex gap-items-center cursor-pointer'>
                    <Image src={
                      process.env.NEXT_PUBLIC_BACKEND_URL +
                      category?.icon?.[0]?.url
                    }
                      unoptimized={true}
                      alt="Icon" width={25} height={25}
                    />
                    <h2 className='flex gap-2 items-center'>
                      {category?.name}
                    </h2>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="md:flex gap-3 items-center 
            border rounded-full p-2 px-5
            hidden
            ">
          <Search className=" flex items-start" />
          <input type="text" placeholder="Tìm kiếm..."
            className='outline-none'
          />
        </div>
      </div>
      <div className='flex gap-2 items-center'>
        <h2 className='flex gap-2 items-center text-lg'><ShoppingBag /> 0</h2>

        {!isLogin ?
          <Link href="/sign-in">
            <Button className = "hover:cursor-pointer">Đăng Ký</Button>
          </Link>
          :
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound
                className="
                h-10 w-10 hover:bg-red-200 transition-500 rounded-full 
                text-primary outline-none hover:cursor-pointer" 
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Hi, {user}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Order</DropdownMenuItem>
              <DropdownMenuItem onClick = {() => onSignOut()} className = "cursor-pointer">Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
    </div>
  )
}

export default Header