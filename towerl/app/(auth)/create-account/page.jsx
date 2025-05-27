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

export default function LoginPage() {
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [userEmail, setUserEmail] = useState()
  const [password, setPassword] = useState()
  const [rePassword, setRePassword] = useState()
  const [loader, setLoader] = useState()

  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      toast("You're already signed in")
      router.push('/')
    }
  }, [])

  const createAccount = () => {
  setLoader(true)
  if (password !== rePassword) {
    toast("Passwords do not match");
    return;
  }

  GlobalApi.postRegisterInformation(username, userEmail, password)
    .then(async (resp) => {
      const { jwt, user } = resp.data;

      // ✅ Lưu JWT và user
      ////////////////////////////////////////
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Gọi API cập nhật name
      try {
        await GlobalApi.updateUserName(user.id, name, jwt);
        toast("Account Created Successfully");
        router.push('/');
        setLoader(false)

      } catch (err) {
        toast("Account created, but failed to update name");
        console.error("Error updating name:", err);
        setLoader(false)
      }

    })
    .catch((e) => {
      toast(e?.response?.data?.error?.message || "Something went wrong");
    });
};

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
          <div className="mt-4">
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
                placeholder="What's your name?"
                onChange={(e) => setName(e.target.value)}
                className="outline-none w-full"
              ></input>
            </div>

            <div className="border-red-300 w-full border-3 shadow rounded-full p-2 my-4 pl-5">
              <input
                type="text"
                placeholder="Choose an username"
                onChange={(e) => setUsername(e.target.value)}
                className="outline-none w-full"
              ></input>
            </div>

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

            <div className="border-red-300 w-full border-3 shadow rounded-full p-2 my-4 pl-5">
              <input
                type="password"
                placeholder="Enter the password again"
                onChange={(e) => setRePassword(e.target.value)}
                className="outline-none w-full"
              ></input>
            </div>
            <div className="mt-6">
              <Button
                className="w-full py-5 cursor-pointer outline-none"
                onClick={() => createAccount()}
                disabled={!(userEmail || password)}
              >
                {loader ? <LoaderIcon className = "animate-spin"/> : "Create Account"}
              </Button>
            </div>
            <p className="mt-3">Already have an account? {' '}
              <Link href="/sign-in" className="text-blue-500 underline ">
                Login here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>

  );
}
