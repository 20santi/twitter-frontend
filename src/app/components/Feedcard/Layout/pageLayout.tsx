"use client";
import React, { useMemo, useState } from "react";
import { BiHash } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsSearch } from "react-icons/bs";
import { RiFileListLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi";
import { FaXTwitter, FaUser } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { CgMoreO } from "react-icons/cg";
import { TfiMoreAlt } from "react-icons/tfi";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useCurrentUser } from "../../../hooks/user";
import FollowButton from "../../../clientComponents/FollowButton";
import { PaymentModal } from "../../../clientComponents/PaymentModal";

interface twitterLayoutProps {
  children: React.ReactNode;
}

interface TwitterSidebarButtons {
  link: string;
  title: string;
  icon: React.ReactNode;
}

const TwitterLayout: React.FC<twitterLayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const [modal, setModal] = useState(false);
  console.log("Curret User:------------> ", user);

  const sidebarMenu: TwitterSidebarButtons[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <AiFillHome />,
        link: "/home",
      },
      {
        title: "Explore",
        icon: <BiHash />,
        link: "/home",
      },
      {
        title: "Notifications",
        icon: <BsBell />,
        link: "/home",
      },
      {
        title: "Messages",
        icon: <BsEnvelope />,
        link: "/home",
      },
      {
        title: "Bookmarks",
        icon: <BsBookmark />,
        link: "/home",
      },
      {
        title: "Lists",
        icon: <RiFileListLine />,
        link: "/home",
      },
      {
        title: "Communities",
        icon: <HiOutlineUsers />,
        link: "/home",
      },
      {
        title: "Premium",
        icon: <FaXTwitter />,
        link: `/home`,
      },
      {
        title: "Profile",
        icon: <FaUser />,
        link: `/${user?.id}`,
      },
      {
        title: "More",
        icon: <CgMoreO />,
        link: "/home",
      },
    ],
    [user?.id]
  );

  return (
    <section className="h-screen w-screen bg-black overflow-hidden">
      <div className="flex w-11/12 h-full sm:max-w-max sm:mx-auto">
        {/* sidebar */}
        <div className="xl:w-[250px] w-[70px] hidden sm:flex sm:flex-col justify-between sm:h-screen sm:mt-2 sm:pb-6 overflow-scroll scrollbar-none">
          {user?.role === "Admin" && (
            <div className="flex flex-col items-start">
              <div className="hover:bg-stone-900 p-3 hover:rounded-full">
                <FaXTwitter className="w-[30px] h-[30px] text-white" />
              </div>
              <Link href={"/Admin"}>
                <div className="hidden sm:flex gap-x-5 text-white text-xl justify-center items-center hover:bg-stone-900 hover:rounded-full px-3 py-3">
                  <FaUser className="text-2xl hidden sm:block" />
                  <p className="hidden xl:block">Admin</p>
                </div>
              </Link>
            </div>
          )}
          {user?.role === "User" && (
            <div className="flex flex-col items-start">
              {/* twitter logo */}
              <div className="hover:bg-stone-900 p-3 hover:rounded-full">
                <FaXTwitter className="w-[30px] h-[30px] text-white" />
              </div>
              {/* menu */}
              {sidebarMenu.map((item, index) => (
                <Link key={index} href={item.link}>
                  <div
                    onClick={() => {if(item.title === "Premium") setModal(true)}}
                    className="hidden sm:flex gap-x-5 text-white text-xl justify-center items-center hover:bg-stone-900 hover:rounded-full px-3 py-3"
                  >
                    <p className="text-2xl hidden sm:block">{item.icon}</p>
                    <p className="hidden xl:block">{item.title}</p>
                  </div>
                </Link>
              ))}
              {/* post button */}
              <button
                
                className="xl:w-[100px] sm:w-[50px] sm:h-[50px] sm:p-2 mt-2 flex items-center justify-center xl:px-28 xl:py-3 font-bold text-white bg-[#E66E00] rounded-full"
              >
                <p className="hidden xl:block">Post</p>
                <FaPlus className="w-[25px] h-[25px] xl:hidden text-white" />
              </button>
            </div>
          )}

          {/* user profile section */}
          {user?.role === "User" && (
            <Link href={`/${user?.id}`}>
              <div className="flex gap-x-2 xl:hover:bg-stone-900 rounded-full xl:px-3 xl:py-2 xl:max-w-[230px] items-center justify-between">
                <div className="flex gap-x-2">
                  <div className="sm:max-xl:w-[50px] sm:max-xl:h-[50px] p-2 hover:bg-stone-900 flex items-cnter justify-center rounded-full">
                    <Image
                      src={user.profileImageURL}
                      alt="user-image"
                      width={40}
                      height={40}
                      className="rounded-full hidden sm:block"
                    />
                  </div>
                  <div className="hidden xl:flex xl:flex-col justify-center">
                    <p className="font-bold text-sm text-white">
                      {user.firstName} {user?.lastName}
                    </p>
                    <p className=" text-slate-400 text-[12px]">
                      @<span>{user.firstName}</span>3201543589
                    </p>
                  </div>
                </div>
                <div className="text-white text-lg xl:block hidden">
                  <TfiMoreAlt />
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Feed Section */}
        <div className="w-[600px] border border-[#202327] overflow-scroll scrollbar-none">
          {props.children}
        </div>

        {/* Right Section */}
        {user?.role === "User" && (
          <div className="hidden lg:flex lg:flex-col gap-y-5 sticky lg:w-[400px] overflow-scroll scrollbar-none mt-3 pl-7">
            {/* search box */}
            <div>
              <div className=" sticky top-0 z-50 text-white bg-[#202327] rounded-full group p-4 hover:border hover:border-[#E66E00]">
                <label
                  htmlFor="searchBox"
                  className="absolute top-0 h-full flex items-center justify-center"
                >
                  <BsSearch className="w-5 h-5 text-gray-500 group-hover:text-[#E66E00]" />
                </label>
                <input
                  id="searchBox"
                  type="text"
                  placeholder="Search People"
                  className="w-full h-full outline-none bg-transparent pl-7"
                />
              </div>
            </div>

            {/* middle section */}
            <div className="flex flex-col gap-y-2 rounded-xl bg-[#16181C] lg:p-5 p-3">
              <p className="font-extrabold text-white">Subscribe to Premium</p>
              <p className="font-bold text-white">
                Subscribe to unlock new features and if eligible, receive a
                share of ads revenue.
              </p>
              <button className="flex items-center justify-center px-4 py-1 text-[16px] font-bold text-white bg-[#E66E00] rounded-full max-w-max">
                Subscribe
              </button>
            </div>

            {/* follow section */}
            <div className="flex flex-col rounded-xl bg-[#16181C] text-white">
              <h3 className="font-bold text-2xl lg:pl-4 lg:pt-5">
                You might like
              </h3>
              <div className="pt-3">
                {user?.recomendedUsers &&
                  user?.recomendedUsers.map((recomendedUser, i) => (
                    <div className="hover:bg-[#202327]" key={i}>
                      <div className="lg:p-4 lg:pr-6 flex justify-between items-center last:rounded-b-xl transition duration-200">
                        <div className="flex gap-x-3">
                          {recomendedUser?.profileImageURL && (
                            <Image
                              src={recomendedUser.profileImageURL}
                              alt="user-image"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          )}
                          <div className="flex flex-col">
                            <div className="font-bold">
                              {recomendedUser?.firstName}{" "}
                              {recomendedUser?.lastName}
                            </div>
                            <div className="text-gray-500 text-xs">
                              @
                              <span>
                                {recomendedUser?.firstName}
                                {recomendedUser?.lastName}
                              </span>
                              1234
                            </div>
                          </div>
                        </div>
                        <div>
                          {recomendedUser && (
                            <FollowButton id={recomendedUser.id} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {user?.role === "Admin" && (
          <div className="flex flex-col max-w-[350px] h-[200px] ml-5 mt-5 gap-y-2 rounded-xl p-5 bg-[#16181C] lg:p-5">
            <p className="font-extrabold text-white text-3xl">Wellcome Sir</p>
            <p className="font-bold text-white mt-5">
              If you want to show all details click the Admin button
            </p>
          </div>
        )}

        {modal && <PaymentModal setModal={setModal}/>}
      </div>
    </section>
  );
};

export default TwitterLayout;