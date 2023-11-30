import { graphql } from "../../../../gql";

export const GetAllTweetsQuery = `#graphql
    query GetAllTweets {
        getAllTweets {
            id
            content
            imageURL
            author {
                id
                firstName
                lastName
                profileImageURL
                ban
                role
                subscribe
            }
            likes {
              tweet {
                id
                content
                imageURL
                author {
                  id
                  firstName
                  lastName
                  profileImageURL
                  ban
                  role
                  subscribe
                }
              }
              user {
                firstName
                id
                lastName
                profileImageURL
                ban
                role
                subscribe
              }
            }
        }
    }
`;

export const getSignedURLForTweetQuery = graphql(`
  #graphql
  query GetSignedURL($imageType: String!, $imageName: String!) {
    getSignedURLForTweet(imageType: $imageType, imageName: $imageName)
  }
`);
