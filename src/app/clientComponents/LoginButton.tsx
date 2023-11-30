"use client"
import React, { useState } from "react";
import { LoginModal } from "./LoginModal";

export default function LoginButton() {
    const [modal, setModal] = useState(false);

  return (
    <div>
      <div className="mt-10">
        <p className="font-bold text-[16px]">Already have an account?</p>
        <button onClick={() => setModal(true)} className="bg-transparent text-[#1A8CD8] mt-5 hover:bg-[#1A8CD8] hover:bg-opacity-10 border border-slate-400 rounded-full p-2 pl-10 pr-10 font-bold w-[350px]">
          Sign in
        </button>
      </div>
      {modal && <LoginModal setModal={setModal}/>}
    </div>
  );
}
