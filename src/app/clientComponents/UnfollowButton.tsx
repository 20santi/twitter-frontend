"use client";
import { useCallback } from "react";
import { graphqlClient } from "../clients/api";
import { unfollowMutation } from "../graphql/mutation/user";
import { User } from "../../../gql/graphql";

interface propsTypes {
  id: string;
}

const UnFollowButton: React.FC<propsTypes> = ({ id }) => {
    const handleUnfollow = useCallback(async () => {
        await graphqlClient.request(unfollowMutation, { to: id });
      }, [id]);

  return (
    <div className="">
      <button
        onClick={handleUnfollow}
        className="flex mt-3 mr-5 items-center justify-center px-4 py-[6px] text-[16px] font-bold text-black bg-[#D7DBDC] rounded-full"
      >
        Unfollow
      </button>
    </div>
  );
};

export default UnFollowButton;
