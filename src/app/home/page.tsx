"use client";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { FaEarthAfrica } from "react-icons/fa6";
import { BiImage } from "react-icons/bi";
import { useCallback, useMemo, useState } from "react";
import { MdOutlineGifBox } from "react-icons/md";
import { BsEmojiSmile, BsListTask } from "react-icons/bs";
import { LuCalendarClock } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { TypedQueryDocumentNode } from "graphql";
import axios from "axios";
import { useCurrentUser } from "../hooks/user";
import { useCreatTweet, useGetAllTweets } from "../hooks/tweet";
import { graphqlClient } from "../clients/api";
import { getSignedURLForTweetQuery } from "../graphql/query/tweet";
import TwitterLayout from "../components/Feedcard/Layout/pageLayout";
import FeedCard from "../components/Feedcard";
import { Tweet } from "../../../gql/graphql";
import { NextPage } from "next";
import { SideBarModal } from "../clientComponents/SidebarModal";

const HomePage: NextPage = () => {
  const [content, setContent] = useState("");
  const [imageURL, setIamgeURL] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();
  const { mutate } = useCreatTweet();
  const [sidebar, setSidebar] = useState(false);

  const handleInputFile = (input: HTMLInputElement) => {
    return async (event: Event) => {
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;

      const { getSignedURLForTweet }: { getSignedURLForTweet: string } =
        await graphqlClient.request(
          getSignedURLForTweetQuery as TypedQueryDocumentNode,
          {
            imageType: file.type.split("/")[1],
            imageName: file.name,
          }
        );
      if (!getSignedURLForTweet)
        throw new Error("getSignedURLForTweet is not generated");

      await axios.put(getSignedURLForTweet, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      const url = new URL(getSignedURLForTweet);
      const filePath = `${url.origin}${url.pathname}`;
      setIamgeURL(filePath);
    };
  };

  const handleClickImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handleFn = handleInputFile(input);
    input.addEventListener("change", handleFn);

    input.click();
  }, []);

  const handleCreatePost = useCallback(async () => {
    if (content !== "") {
      await mutate({
        content,
        imageURL,
      });
    }
    setContent("");
    setIamgeURL("");
  }, [content, imageURL, mutate]);

  return (
    <div className="">
      <TwitterLayout>
        <div className="sm:w-full flex flex-col border border-white">
          <div className="flex justify-between items-center border-b border-[#2e3134] pb-2 sticky top-0 z-50 bg-black bg-opacity-70 backdrop-blur-md">
            <div className="pl-3 sm:hidden block" onClick={() => setSidebar(true)}>
              <Image
                src={user?.profileImageURL}
                width={30}
                height={30}
                alt="user image"
                className="rounded-full"
              />
            </div>
            <p className="text-white font-extrabold text-lg p-3">Home</p>
            <div></div>
          </div>
          <div className="">
            <div className="flex gap-x-3 p-3">
              <div className="w-[8%]">
                {user?.profileImageURL && (
                  <Image
                    src={user.profileImageURL}
                    alt="user-iamge"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
              </div>
              <div className="flex flex-col gap-y-6 w-[85%]">
                {isVisible && (
                  <button className="rounded-full border border-slate-700 max-w-[130px]">
                    <div className="flex gap-x-2 items-center justify-center text-[#E66E00] font-bold">
                      Everyone
                      <IoIosArrowDown />
                    </div>
                  </button>
                )}
                <div className="flex flex-col gap-y-6 w-full pb-3">
                  <textarea
                    value={content}
                    placeholder="What is happening ?"
                    onChange={(e) => setContent(e.target.value)}
                    onFocus={() => setIsVisible(true)}
                    onBlur={() => setIsVisible(false)}
                    className="bg-transparent focus:outline-none placeholder:text-xl placeholder:opacity-70 border border-transparent text-white"
                  />
                  {imageURL && (
                    <Image
                      src={imageURL}
                      alt="tweet-image"
                      height={300}
                      width={300}
                    />
                  )}
                  {isVisible && (
                    <div
                      className="flex gap-x-2 text-[#FF7A00] items-center"
                      id="1"
                    >
                      <FaEarthAfrica />
                      <p className="">Everyone can reply</p>
                    </div>
                  )}
                  {isVisible && (
                    <div className="h-[1px] bg-[#202327] -mt-2"></div>
                  )}
                </div>
                <div className="flex justify-between text-[#FF7A00] text-xl">
                  <div className="flex gap-x-3 ">
                    {/* galary icon */}
                    <div onClick={handleClickImage}>
                      <BiImage />
                    </div>
                    {/* gif icon */}
                    <div>
                      <MdOutlineGifBox />
                    </div>
                    {/* list icon */}
                    <div>
                      <BsListTask />
                    </div>
                    {/* smile icon */}
                    <div>
                      <BsEmojiSmile />
                    </div>
                    {/* schedule icon */}
                    <div>
                      <LuCalendarClock />
                    </div>
                    {/* location icon */}
                    <div>
                      <GrLocation />
                    </div>
                  </div>
                  <div className={`${content === "" ? "opacity-50" : ""}`}>
                    <button
                      onClick={handleCreatePost}
                      className="flex items-center justify-center px-4 py-1 text-[16px] font-bold text-white bg-[#E66E00] rounded-full"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* twitts */}
          <div className="">
            {tweets.map((tweet: Tweet) =>
              tweet ? <FeedCard key={tweet.id} data={tweet} /> : null
            )}
          </div>
          {sidebar && <SideBarModal setModal={setSidebar}/>}
        </div>
      </TwitterLayout>
    </div>
  );
};

export default HomePage;
