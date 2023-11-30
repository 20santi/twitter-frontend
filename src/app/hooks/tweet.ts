import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateTweetData, Tweet } from "../../../gql/graphql";
import { graphqlClient } from "../clients/api";
import { CreateTweetMutation } from "../graphql/mutation/tweet";
import toast from "react-hot-toast";
import { GetAllTweetsQuery } from "../graphql/query/tweet";

export const useCreatTweet = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async(payload: CreateTweetData) => {
            const data = await graphqlClient.request(CreateTweetMutation, {payload});
            return data;
        },
        onSuccess: async() => {
            await queryClient.invalidateQueries({
                queryKey: ["all-tweets"]
            })
            toast.success("Your post was sent")
        }
    })
    return mutation;
}

export const useGetAllTweets: any = () => {
    const query = useQuery({
        queryKey: ["all-tweets"],
        queryFn: async() => {
            const data = await graphqlClient.request(GetAllTweetsQuery);
            return data as { getAllTweets: [Tweet] };
        }
    })
    return { ...query, tweets: query.data?.getAllTweets}
}