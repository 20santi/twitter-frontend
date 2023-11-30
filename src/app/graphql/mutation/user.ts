import { TypedQueryDocumentNode } from "graphql";
import { graphql } from "../../../../gql";

export const unfollowMutation = graphql(`
  #graphql
  mutation UnfollowMutation($to: ID!) {
    unFollowUser(to: $to)
  }
`) as TypedQueryDocumentNode

export const followMutation = graphql(`
  #graphql
  mutation FollowMutation($to: ID!) {
    followUser(to: $to)
  }
`) as TypedQueryDocumentNode

export const banUserMutation = graphql(`
  #graphql
  mutation BanUser($id: ID!) {
    banUser(id: $id)
  }
`) as TypedQueryDocumentNode

export const UnBanUserMutation = graphql(`
  #graphql
  mutation UnBanUser($id: ID!) {
    unBanUser(id: $id)
  }
`) as TypedQueryDocumentNode

export const VerifyPaymentMutation = graphql(`
  #graphql
  mutation VerifyPayment($data: ResponseType!) {
    verifyPayment(data: $data)
  }
`) as TypedQueryDocumentNode