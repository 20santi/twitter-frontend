"use client";
import { useQueryClient } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import React, { useCallback, useEffect } from "react";
import { FaApple, FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import { graphqlClient } from "../clients/api";
import { verifyUserGoogleTokenQuery } from "../graphql/query/user";

interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginModal = ({ setModal }: ModalProps) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const handleLogin = useCallback(async () => {
    await signIn("google");
  }, [queryClient]);

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
    }
  }, [session, queryClient]);
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-slate-700 bg-opacity-60 ">
      <div className="w-11/12 max-w-[650px] rounded-xl bg-black p-6">
        <div className="">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center p-3 hover:bg-white hover:bg-opacity-10 rounded-full">
              <button onClick={() => setModal(false)} className="text-sm">
                <ImCross />
              </button>
            </div>
            <div className="text-3xl">
              <FaXTwitter />
            </div>
            <div></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col mt-6 gap-y-10">
              <p className="text-3xl font-bold">Sign in to X</p>

              <div className="flex flex-col gap-y-6">
                <button className="bg-white rounded-full p-2 pl-10 pr-10 text-black font-bold w-[350px]">
                  <div
                    onClick={handleLogin}
                    className="flex gap-x-2 items-center justify-center"
                  >
                    <FcGoogle className="text-xl" />
                    <p>Sign in with google</p>
                  </div>
                </button>
                <button className="bg-white rounded-full p-2 pl-10 pr-10 text-black font-bold w-[350px]">
                  <div className="flex gap-x-2 items-center justify-center">
                    <FaApple className="text-xl" />
                    <p>Sign in with apple</p>
                  </div>
                </button>
              </div>
              <div className="flex gap-x-2 items-center -mt-7">
                <div className="h-[1px] w-[160px] bg-slate-600"></div>
                <p className="text-[18px]">or</p>
                <div className="h-[1px] w-[160px] bg-slate-600"></div>
              </div>
              <div className="-mt-8">
                <input
                  placeholder="Phone, email or username"
                  className="border border-slate-600 bg-transparent rounded-md w-[350px] p-4"
                />
              </div>
              <div className="flex flex-col -mt-3">
                <button className="bg-white rounded-full p-2 pl-10 pr-10 text-black font-bold w-[350px]">
                  Next
                </button>
                <button className="bg-transparent text-white mt-5 hover:bg-white hover:bg-opacity-10 border border-slate-400 rounded-full p-2 pl-10 pr-10 font-bold w-[350px]">
                  Forgot password
                </button>
              </div>
              <div className="text-slate-500 mt-2 mb-20">
                <p>
                  Do not have an account?{" "}
                  <span
                    onClick={() => setModal(false)}
                    className="text-[#1A8CD8] cursor-pointer"
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
