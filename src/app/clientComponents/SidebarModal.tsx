"use client";
import React from "react";
import { ImCross } from "react-icons/im";
import { useCurrentUser } from "../hooks/user";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { FaUser, FaXTwitter } from "react-icons/fa6";
import { RiFileListLine } from "react-icons/ri";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { PiMoneyBold } from "react-icons/pi";

interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBarModal = ({ setModal }: ModalProps) => {
  const { user } = useCurrentUser();

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-slate-700 bg-opacity-60 ">
      <div className="w-[80%] h-full -ml-[78px] bg-black p-3">
        <div className="flex flex-col justify-between items-start">
          <div className="flex items-center w-full justify-between hover:bg-white hover:bg-opacity-10 rounded-full">
            <div className="">
              <Image
                src={user.profileImageURL}
                width={40}
                height={40}
                alt="user-image"
                className="rounded-full"
              />
            </div>
            <button onClick={() => setModal(false)} className="text-sm">
              <ImCross />
            </button>
          </div>
          {/* name and id */}
          <div className="flex flex-col mt-2">
            <p className="font-bold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-[#787979]">@{user.firstName}3012483949</p>
          </div>
          {/* follow and followers */}
          <div className="flex gap-x-10 mt-4">
            <p className="font-bold">
              500 <span className="text-[#787979] font-normal">Following</span>
            </p>
            <p className="font-bold">
              557 <span className="text-[#787979] font-normal">Follower</span>
            </p>
          </div>
          {/* sidebar icon */}
          <div className="flex flex-col gap-y-6 mt-7 items-start justify-center">
            <div className="flex gap-x-5 justify-center items-center">
              <FaUser className="text-lg"/>
              <p className="text-xl font-bold">Profile</p>
            </div>
            <div className="flex gap-x-5 justify-center items-center">
              <FaXTwitter className="text-lg"/>
              <p className="text-xl font-bold">Premium</p>
            </div>
            <div className="flex gap-x-5 justify-center items-center">
              <RiFileListLine className="text-lg"/>
              <p className="text-xl font-bold">Lists</p>
            </div>
            <div className="flex gap-x-5 justify-center items-center">
              <BsBookmark className="text-lg"/>
              <p className="text-xl font-bold">Bookmarks</p>
            </div>
            <div className="flex gap-x-5 justify-center items-center">
              <HiOutlineUsers className="text-lg"/>
              <p className="text-xl font-bold">Communities</p>
            </div>
            <div className="flex gap-x-5 justify-center items-center">
              <PiMoneyBold className="text-lg"/>
              <p className="text-xl font-bold">Monetization</p>
            </div>
          </div>
          {/* separate line */}
          <div className="w-full h-[1px] mt-4 bg-[#2f3131]"></div>
          {/* tools */}
          <div className="flex justify-between w-full mt-4">
            <p className="font-bold">Professional Tools</p>
            <FaChevronDown/>
          </div>
          <div className="flex justify-between w-full mt-2">
            <p className="font-bold">Settings & Support</p>
            <FaChevronDown/>
          </div>
        </div>
      </div>
    </div>
  );
};
