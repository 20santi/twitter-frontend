"use client"
import { FaXTwitter, FaApple } from "react-icons/fa6";
import LoginButton from "./clientComponents/LoginButton";
import SignupButton from "./clientComponents/SignupButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if(localStorage.getItem("OWN_TWITTER_TOKEN")) {
      router.push("/home");
    }
  }, [router])
  
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className="sm:flex items-center w-[70%] max-h-max justify-between overflow-y-auto mb-8">
        <div className="mt-10 mb-16">
          <FaXTwitter className="sm:text-[400px] text-[50px]" />
        </div>
        {/* sign up */}
        <div className="flex flex-col gap-y-7">
          <SignupButton/>
          {/* sign in */}
          <LoginButton/>
        </div>
      </div>
    </div>
  );
}
