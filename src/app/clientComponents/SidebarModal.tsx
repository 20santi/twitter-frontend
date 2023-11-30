"use client";
import React from "react";
import { ImCross } from "react-icons/im";

interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBarModal = ({ setModal }: ModalProps) => {

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
          </div>
        </div>
      </div>
    </div>
  );
};
