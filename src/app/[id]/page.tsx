"use client";
import { NextPage } from "next";
import TwitterLayout from "../components/Feedcard/Layout/pageLayout";
import { useCurrentUser, useCurrentUserById } from "../hooks/user";
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiLinkSimpleBold } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { usePathname } from "next/navigation";
import FeedCard from "../components/Feedcard";
import { Tweet } from "../../../gql/graphql";
import { useMemo } from "react";
import FollowButton from "../clientComponents/FollowButton";
import UnFollowButton from "../clientComponents/UnfollowButton";
import { HiCheckBadge } from "react-icons/hi2";

const UserProfilePage: NextPage = () => {
  const path = usePathname();
  const id = path.split("/")[1];
  const { userById } = useCurrentUserById(id);
  const { user: currentUser } = useCurrentUser();
  console.log("user by id:------> ", userById);

  const amIFollwing = useMemo(() => {
    if (!currentUser) return false;

    return (
      (currentUser.following?.findIndex((el) => el?.id === userById?.id) ??
        -1) >= 0
    );
  }, [currentUser, userById?.id]);

  return (
    <TwitterLayout>
      <div className="flex flex-col ">
        <div className="flex gap-x-8 w-full items-center sticky top-0 bg-transparent bg-opacity-70 z-50 backdrop-blur-md">
          <div className="ml-5 mt-2">
            <BiArrowBack />
          </div>
          <div className="flex flex-col mt-2">
            <div className="flex gap-x-1 items-center font-extrabold text-white">
              {userById?.firstName} {userById?.lastName}
              {userById?.subscribe === true ? (
                <span className="text-[#1A8CD8] text-xl">
                  <HiCheckBadge />
                </span>
              ) : null}
            </div>
            <div className="flex gap-x-1 items-center text-[#787979] text-[14px]">
              <p>{userById?.tweets?.length}</p>
              <p className="mr-2">posts</p>
            </div>
          </div>
        </div>
        {/* images and edit button */}
        <div className="relative">
          <div className="w-full h-[200px] bg-blue-400"></div>
          <div className="flex justify-end">
            {userById?.profileImageURL && (
              <Image
                src={userById.profileImageURL}
                alt="user-profile-image"
                width={120}
                height={120}
                className="rounded-full absolute top-36 left-5 space-x-9 border-4 border-black"
              />
            )}
            {currentUser?.id === userById?.id ? (
              <button className="font-bold mt-4 mr-4 p-1 pr-4 pl-4 rounded-full border border-[#5f6061]">
                Edit profile
              </button>
            ) : amIFollwing ? (
              userById && <UnFollowButton id={userById.id} />
            ) : (
              userById && <FollowButton id={userById.id} />
            )}
          </div>
        </div>
        {/* user information */}
        <div className="flex flex-col gap-y-3 mt-8 ml-4">
          <div className="flex flex-col gap-y-1">
            <div className="flex gap-x-1">
              <p className="font-extrabold sm:text-sm text-[12px]">
                {userById?.firstName} {userById?.lastName}
              </p>
              {userById?.subscribe === true ? (
                <span className="text-[#1A8CD8] text-xl">
                  <HiCheckBadge />
                </span>
              ) : null}
            </div>
            <p className="text-[#787979] sm:text-sm text-[12px]">
              @{userById?.firstName}3012139331
            </p>
          </div>
          {/* bio */}
          <div>
            <p className="sm:text-sm text-[12px]">
              web developer || c++ || DSA problem solver || tec enthusiastic
            </p>
          </div>
          <div className="flex flex-col">
            {/* location */}
            <div className="flex gap-x-1 items-center">
              <div className="text-[#787979]">
                <HiOutlineLocationMarker />
              </div>
              <p className="text-[#787979] sm:text-sm text-[12px]">Kolkata, India</p>
            </div>
            <div className="flex gap-x-6">
              <div className="flex gap-x-1 items-center">
                <PiLinkSimpleBold className="text-[#787979]" />
                <p className="text-[#FF7A00] sm:text-sm text-[12px]">
                  linkdin.com/in/{userById?.firstName}...
                </p>
              </div>
              {/* joining date */}
              <div className="flex gap-x-1 items-center">
                <SlCalender className="text-[#787979] sm:text-sm text-[12px]" />
                <p className="text-[#787979] sm:text-sm text-[12px]">Joined August 2023</p>
              </div>
            </div>
          </div>
          {/* followers */}
          <div className="flex gap-x-6">
            <p className="text-[#787979]">
              <span className="text-white font-bold">100</span> Following
            </p>
            <p className="text-[#787979]">
              <span className="text-white font-bold">45</span> Followers
            </p>
          </div>
        </div>
        {/* post */}
        <div className="flex sm:w-full justify-evenly mt-5 sm:text-sm text-[12px]">
          <div className="pt-4 pb-4 sm:pr-6 sm:pl-6 pr-3 pl-3 cursor-pointer hover:bg-[#181818]">
            <p>Posts</p>
          </div>
          <div className="pt-4 pb-4 sm:pl-6 pr-3 pl-3 cursor-pointer hover:bg-[#181818]">
            <p>Replies</p>
          </div>
          <div className="pt-4 pb-4 sm:pl-6 pr-3 pl-3 cursor-pointer hover:bg-[#181818]">
            <p>Highlights</p>
          </div>
          <div className="pt-4 pb-4 sm:pl-6 pr-3 pl-3 cursor-pointer hover:bg-[#181818]">
            <p>Media</p>
          </div>
          <div className="pt-4 pb-4 sm:pl-6 pr-3 pl-3 cursor-pointer hover:bg-[#181818]">
            <p>Likes</p>
          </div>
        </div>
        {/* twitts */}
        <div className="">
          {userById?.tweets &&
            userById?.tweets?.map((tweet) => {
              return (
                <div className="" key={tweet?.id}>
                  <FeedCard data={tweet as Tweet} />
                </div>
              );
            })}
        </div>
      </div>
    </TwitterLayout>
  );
};

export default UserProfilePage;
