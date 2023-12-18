"use client";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import { graphqlClient } from "../clients/api";
import { verifyUserGoogleTokenQuery } from "../graphql/query/user";
import { useRouter } from "next/navigation";

const SignupButton = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignin = useCallback(async () => {
    await signIn("google");
  }, []);

  useEffect(() => {
    // Check if the session data is available and has the idToken
    if (session && session.idToken) {
      const googleToken = session.idToken;
      const fetchToken = async () => {
        const { verifyGoogleToken } = await graphqlClient.request(
          verifyUserGoogleTokenQuery,
          { token: googleToken }
        );
        if (verifyGoogleToken) {
          localStorage.setItem("OWN_TWITTER_TOKEN", verifyGoogleToken);
          queryClient.invalidateQueries({
            queryKey: ["current-user"],
            refetchType: "active",
          });
        }
      };

      fetchToken();
      router.push("/home");
    }
  }, [session, queryClient, router]);

  return (
    <div>
      <h1 className="font-bold text-6xl">Happening now</h1>
      <p className="font-bold text-4xl mt-10">Join today.</p>
      <div className="flex flex-col gap-y-3 mt-9">
        <button className="bg-white rounded-full p-2 pl-10 pr-10 text-black font-bold w-[350px]">
          <div
            onClick={handleSignin}
            className="flex gap-x-2 items-center justify-center"
          >
            <FcGoogle className="text-xl" />
            <p>Sign up with google</p>
          </div>
        </button>
        <button className="bg-white rounded-full p-2 pl-10 pr-10 text-black font-bold w-[350px]">
          <div className="flex gap-x-2 items-center justify-center">
            <FaApple className="text-xl" />
            <p>Sign up with apple</p>
          </div>
        </button>
      </div>
      <div className="flex gap-x-2 items-center mt-2 mb-2">
        <div className="h-[1px] w-[160px] bg-slate-600"></div>
        <p className="text-[18px]">or</p>
        <div className="h-[1px] w-[160px] bg-slate-600"></div>
      </div>
      <button className="bg-[#1A8CD8] text-white rounded-full p-2 pl-10 pr-10 font-bold w-[350px]">
        Create account
      </button>
      <div className="w-[360px] text-[14px]">
        <p className="text-[#787979] mt-1 text-[12px]">
          By signing up, you agree to the{" "}
          <span className="text-[#1A8CD8]">Terms of Service</span> and{" "}
          <span className="text-[#1A8CD8]">Privacy Policy</span>, including{" "}
          <span className="text-[#1A8CD8]">Cookie Use</span>.
        </p>
      </div>
    </div>
  );
};

export default SignupButton;
