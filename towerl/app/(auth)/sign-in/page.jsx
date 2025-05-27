"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";

export default function SigninPage() {
  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const [loader, setLoader] = useState()
  useEffect(() => {
    
    const jwt = localStorage.getItem('jwt');
    if(jwt){
      toast("You're already signed in")
      router.push('/')
    }
  }, [])

  const onSignIn = () => {
    setLoader(true)
    GlobalApi.postSigninInformation(userEmail, password).then(resp =>{
      console.log('username here: ', resp.data.user)
      console.log(localStorage.getItem('user'))
      console.log(resp.data.jwt)
      localStorage.setItem("user", JSON.stringify(resp.data.user)),
      localStorage.setItem("jwt", resp.data.jwt)

      toast("Login Successfully")
      router.push('/')
      setLoader(false)
    },(e) => {
      console.log("Help meeeeeeeeee", e)
      toast(e?.response?.data?.error?.message || "Something went wrong")
      setLoader(false)
    })
  }

  return (
    <div className="w-full h-screen flex">
      <div className="lg:w-7/12 md:w-5/12 md:block hidden">
        <Image
          src="/bg-login.jpg"
          alt="image"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex w-full bg-gray-800 px-10">
        <div className="bg-white flex-1 flex flex-col items-center w-full mt-7 lg:px-13 md:px-8 px-6">
          <div className=" mt-4">
            <Link href='http://localhost:3000'>
              <Image
                src="/logo.png"
                alt="logo"
                width={150}
                height={150}
                className="w-[1/4] h-auto pointer-events-none pointer-none"
              />
            </Link>
          </div>
          <div className="px-5 md:p-0 w-full">
            <div className="border-red-300 w-full border-3 shadow rounded-full p-2 my-4 pl-5">
              <input
                type="text"
                placeholder="Enter your email"
                onChange={(e) => setUserEmail(e.target.value)}
                className=" outline-none w-full"
              ></input>
            </div >
            <div className="border-red-300 w-full border-3 shadow rounded-full p-2 my-4 pl-5">
              <input
                type="password"
                placeholder="Enter a password"
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none w-full"
              ></input>
            </div>
            <div className="mt-6">
              <Button
                className="w-full py-5 cursor-pointer outline-none"
                onClick={() => onSignIn()}
                disabled={!userEmail || !password}
              >
                {loader ? <LoaderIcon className = "animate-spin"/> : 'Sign In'}
              </Button>
            </div>
            <p className="mt-3">Don't have an account? {' '}
              <Link href="/create-account" className ="text-blue-500 underline ">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}
