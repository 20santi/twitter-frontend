import { TypedQueryDocumentNode } from "graphql"
import { graphql } from "../../../../gql"

export const LikeTweetMutation = graphql(`
  #graphql
  mutation LikeTweet($id: ID!) {
    likeTweet(id: $id) 
  }
`) as TypedQueryDocumentNode