import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { BiBarChart, BiRepost, BiUpload } from "react-icons/bi";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { MdDelete, MdBlockFlipped } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import Link from "next/link";
import { Tweet } from "../../../../gql/graphql";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { HiCheckBadge } from "react-icons/hi2";
import { useCurrentUser } from "../../hooks/user";
import { graphqlClient } from "../../clients/api";
import { deleteTweetMutation } from "../../graphql/mutation/tweet";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  UnBanUserMutation,
  banUserMutation,
} from "../../graphql/mutation/user";
import { LikeTweetMutation } from "../../graphql/mutation/like";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const [view, setView] = useState(false);
  const [deleteTweetId, setDeleteTweetId] = useState("");
  const { user } = useCurrentUser();
  const { data } = props;
  const queryClient = useQueryClient();

  useEffect(() => {
    async function deleteTweet() {
      if (deleteTweetId) {
        toast.loading("Deleteing post...", { id: "10" });
        const result = await graphqlClient.request(deleteTweetMutation, {
          id: deleteTweetId,
        });
        toast.success("Deleted Successfully", { id: "10" });
        queryClient.invalidateQueries({
          queryKey: ["all-tweets"],
          refetchType: "active",
        });
      }
    }
    deleteTweet();
  }, [data, deleteTweetId, queryClient]);

  const handleBanUser = useCallback(
    async (id) => {
      if (id) {
        toast.loading("Ban User...", { id: "30" });
        await graphqlClient.request(banUserMutation, { id: id });
        toast.success("User ban for 24 hours", { id: "30" });
        queryClient.invalidateQueries({
          queryKey: ["all-tweets"],
          refetchType: "active",
        });
      }
    },
    [queryClient]
  );

  const handleLike = useCallback(
    async (id: string) => {
      await graphqlClient.request(LikeTweetMutation, { id: id });
      queryClient.invalidateQueries({
        queryKey: ["all-tweets"],
        refetchType: "active",
      });
    },
    [queryClient]
  );

  const handleUnBanUser = useCallback(
    async (id) => {
      if (id) {
        toast.loading("Loading...", { id: "40" });
        await graphqlClient.request(UnBanUserMutation, { id: id });
        toast.success("User can post now", { id: "40" });
        queryClient.invalidateQueries({
          queryKey: ["all-tweets"],
          refetchType: "active",
        });
      }
    },
    [queryClient]
  );

  const isLiked = useCallback(
    (id: string) => {
      if (
        user &&
        data?.likes.some(
          (like) => like?.user?.id === user?.id && like?.tweet?.id === id
        )
      ) {
        return true;
      }
      return false;
    },
    [data.likes, user]
  );

  return (
    <div className="border border-[#2e3134] bg-transparent p-5 transition-all cursor-pointer">
      <div className="flex flex-col">
        <div className="flex gap-x-2 min-w-[600px]">
          <div className="">
            {data.author?.profileImageURL && (
              <Image
                src={data.author?.profileImageURL}
                priority={true}
                alt="user-image"
                height={50}
                width={50}
                className="rounded-full sm:w-[50px] sm:h-[50px] w-[30px] h-[30px]"
              />
            )}
          </div>
          <div className="flex flex-col gap-y-2 w-[88%] pr-8">
            <h5 className="font-bold">
              <div className="flex w-full justify-between relative">
                <Link href={`/${data.author?.id}`}>
                  <div className="flex gap-x-1 items-center">
                    <p className="sm:text-sm text-[12px]">
                      {data.author?.firstName} {data.author?.lastName}
                    </p>
                    {data.author?.subscribe === true ? (
                      <span className="text-[#1A8CD8] sm:text-lg text-sm">
                        <HiCheckBadge />
                      </span>
                    ) : null}
                  </div>
                </Link>
                {user?.role === "Admin" && (
                  <div
                    onClick={() => setView(true)}
                    className="flex justify-center items-center text-[#787979] text-xl p-2 hover:bg-[#1A8CD8] hover:bg-opacity-10 rounded-full hover:text-[#1A8CD8]"
                    id="1"
                  >
                    <BiDotsHorizontalRounded />
                  </div>
                )}
                {view && (
                  <div className="flex flex-col items-start gap-y-2 p-5 bg-black border border-[#787979] absolute right-0 -top-2">
                    <div className="flex justify-between w-full">
                      <div></div>
                      <div
                        className="text-[12px]"
                        onClick={() => setView(false)}
                      >
                        <ImCross />
                      </div>
                    </div>
                    <div className="flex gap-x-8 justify-center items-center">
                      <div
                        onClick={() => setDeleteTweetId(data?.id)}
                        className="flex gap-x-2 justify-center items-center"
                      >
                        <MdDelete />
                        <p>Delete post</p>
                      </div>
                    </div>
                    <div className="flex gap-x-8 justify-center items-center">
                      {data.author.ban ? (
                        <div
                          onClick={() => handleUnBanUser(data?.author?.id)}
                          className="flex gap-x-2 justify-center items-center"
                        >
                          <MdBlockFlipped />
                          <p>Permit</p>
                        </div>
                      ) : (
                        <div
                          onClick={() => handleBanUser(data?.author?.id)}
                          className="flex gap-x-2 justify-center items-center"
                        >
                          <MdBlockFlipped />
                          <p>Ban</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </h5>
            <div className="-mt-2">
              <p className="sm:text-[14px] text-[11px] w-[91%] sm:pr-0 pr-40 sm:w-[97%]">
                {data.content}
              </p>
            </div>
            <div className="flex w-full">
              {data.imageURL && (
                <Image
                  src={data.imageURL}
                  priority={true}
                  alt="tweet-image"
                  width={400}
                  height={400}
                  className="rounded-xl mt-5 border border-slate-600 sm:w-[450px] sm:h-[250px] w-[70%] h-[95%]"
                />
              )}
              <div className=" bg-slate-400"></div>
            </div>
            <div className="flex justify-between items-center sm:w-full w-[60%]">
              <div className="flex justify-between mt-5 sm:text-xl text-sm text-[#787979] items-center w-[91%] sm:w-[97%]">
                <div
                  className={`flex sm:gap-x-1 gap-x-[2px] sm:mr-0 justify-center items-center ${
                    isLiked(data.id) ? "text-[#F91880]" : ""
                  }`}
                >
                  <div>
                    {isLiked(data.id) ? (
                      <IoHeart className="text-[#F91880]" />
                    ) : (
                      <IoIosHeartEmpty onClick={() => handleLike(data.id)} />
                    )}
                  </div>
                  {data?.likes.length > 0 && (
                    <p className="sm:text-sm text-[11px]">
                      {data?.likes.length}
                    </p>
                  )}
                </div>
                <div>
                  <BiRepost />
                </div>
                <div>
                  <FaRegCommentDots />
                </div>
                <div>
                  <BiBarChart />
                </div>
                <div>
                  <BiUpload />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
