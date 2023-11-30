import { TypedQueryDocumentNode } from "graphql";
import { graphql } from "../../../../gql";
import { CreateTweetData } from "../../../../gql/graphql";

export const CreateTweetMutation = graphql(`#graphql
mutation CreateTweet($payload: CreateTweetData!) {
    createTweet(payload: $payload) {
        id
    }
}
`)as TypedQueryDocumentNode

export const deleteTweetMutation = graphql(`
  #graphql
  mutation DeleteTweet($id: ID!) {
    deleteTweet(id: $id)
  }
`) as TypedQueryDocumentNode