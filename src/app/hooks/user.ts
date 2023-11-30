import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../clients/api";
import { GetCurrentUserByIdQuery, getCurrentUserQuery } from "../graphql/query/user";
import { TypedQueryDocumentNode } from "graphql";
import { User } from "../../../gql/graphql";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const data = await graphqlClient.request(
        getCurrentUserQuery as TypedQueryDocumentNode
      );
      return data as { getCurrentUser: User };
    },
  });

  return { ...query, user: query.data?.getCurrentUser };
};

export const useCurrentUserById = (id: string) => {
  const query = useQuery({
    queryKey: ["user-by-id"],
    queryFn: async () => {
      const data = await graphqlClient.request(
        GetCurrentUserByIdQuery as TypedQueryDocumentNode, {id}
      );
      return data as { getCurrentUserById: User}
    }
  })
  return { ...query, userById: query.data?.getCurrentUserById};
}