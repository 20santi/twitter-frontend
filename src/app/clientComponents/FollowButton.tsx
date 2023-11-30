"use client";
import { useCallback } from "react";
import { graphqlClient } from "../clients/api";
import { followMutation } from "../graphql/mutation/user";
import { User } from "../../../gql/graphql";

interface propsTypes {
  id: string;
}

const FollowButton: React.FC<propsTypes> = ({ id }) => {
  const handlefollow = useCallback(async () => {
    await graphqlClient.request(followMutation, { to: id });
  }, [id]);

  return (
    <div className="">
      <button
        onClick={handlefollow}
        className="flex mt-3 mr-5 items-center justify-center px-4 py-[6px] text-[16px] font-bold text-black bg-[#D7DBDC] rounded-full"
      >
        Follow
      </button>
    </div>
  );
};

export default FollowButton;
