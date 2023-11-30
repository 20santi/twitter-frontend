import { graphql } from "../../../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query VerifyUserGoogleTokenQuery($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const capturePaymentQuery = graphql(`
  #graphql
  query CapturePayment {
    capturePayment {
      id
      entity
      amount
      amount_paid
      amount_due
      currency
      receipt
      offer_id
      status
      attempts
      notes
      created_at
      razorpay
    }
  }
`)

export const getCurrentUserQuery = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      firstName
      id
      lastName
      profileImageURL
      role
      ban
      subscribe
      recomendedUsers {
        id
        firstName
        lastName
        profileImageURL
      }
      followers {
        id
        firstName
        lastName
        profileImageURL
      }
      following {
        id
        firstName
        lastName
        profileImageURL
      }
      tweets {
        id
        content
        imageURL
        author {
          id
          firstName
          lastName
          profileImageURL
          role
          ban
          subscribe
        }
        likes {
          user {
            firstName
            id
            lastName
            profileImageURL
          }
        }
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
          }
        }
        user {
          firstName
          id
          lastName
          profileImageURL
        }
      }
    }
  }
`);

export const GetCurrentUserByIdQuery = graphql(`
  #graphql
  query GetCurrentUserById($id: ID!) {
    getCurrentUserById(id: $id) {
      firstName
      id
      lastName
      profileImageURL
      subscribe
      ban
      role
      followers {
        id
        firstName
        lastName
        profileImageURL
      }
      following {
        id
        firstName
        lastName
        profileImageURL
      }
      tweets {
        id
        content
        imageURL
        author {
          id
          firstName
          lastName
          profileImageURL
          subscribe
          ban
          role
        }
        likes {
          user {
            firstName
            id
            lastName
            profileImageURL
          }
        }
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
          }
        }
        user {
          firstName
          id
          lastName
          profileImageURL
        }
      }
    }
  }
`);
