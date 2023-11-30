/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  #graphql\n  mutation LikeTweet($id: ID!) {\n    likeTweet(id: $id) \n  }\n": types.LikeTweetDocument,
    "#graphql\nmutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n        id\n    }\n}\n": types.CreateTweetDocument,
    "\n  #graphql\n  mutation DeleteTweet($id: ID!) {\n    deleteTweet(id: $id)\n  }\n": types.DeleteTweetDocument,
    "\n  #graphql\n  mutation UnfollowMutation($to: ID!) {\n    unFollowUser(to: $to)\n  }\n": types.UnfollowMutationDocument,
    "\n  #graphql\n  mutation FollowMutation($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowMutationDocument,
    "\n  #graphql\n  mutation BanUser($id: ID!) {\n    banUser(id: $id)\n  }\n": types.BanUserDocument,
    "\n  #graphql\n  mutation UnBanUser($id: ID!) {\n    unBanUser(id: $id)\n  }\n": types.UnBanUserDocument,
    "\n  #graphql\n  mutation VerifyPayment($data: ResponseType!) {\n    verifyPayment(data: $data)\n  }\n": types.VerifyPaymentDocument,
    "\n  #graphql\n  query GetSignedURL($imageType: String!, $imageName: String!) {\n    getSignedURLForTweet(imageType: $imageType, imageName: $imageName)\n  }\n": types.GetSignedUrlDocument,
    "\n  #graphql\n  query VerifyUserGoogleTokenQuery($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n": types.VerifyUserGoogleTokenQueryDocument,
    "\n  #graphql\n  query CapturePayment {\n    capturePayment {\n      id\n      entity\n      amount\n      amount_paid\n      amount_due\n      currency\n      receipt\n      offer_id\n      status\n      attempts\n      notes\n      created_at\n      razorpay\n    }\n  }\n": types.CapturePaymentDocument,
    "\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      firstName\n      id\n      lastName\n      profileImageURL\n      role\n      ban\n      subscribe\n      recomendedUsers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n          role\n          ban\n          subscribe\n        }\n        likes {\n          user {\n            firstName\n            id\n            lastName\n            profileImageURL\n          }\n        }\n      }\n      likes {\n        tweet {\n          id\n          content\n          imageURL\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n        user {\n          firstName\n          id\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  #graphql\n  query GetCurrentUserById($id: ID!) {\n    getCurrentUserById(id: $id) {\n      firstName\n      id\n      lastName\n      profileImageURL\n      subscribe\n      ban\n      role\n      followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n          subscribe\n          ban\n          role\n        }\n        likes {\n          user {\n            firstName\n            id\n            lastName\n            profileImageURL\n          }\n        }\n      }\n      likes {\n        tweet {\n          id\n          content\n          imageURL\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n        user {\n          firstName\n          id\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n": types.GetCurrentUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation LikeTweet($id: ID!) {\n    likeTweet(id: $id) \n  }\n"): (typeof documents)["\n  #graphql\n  mutation LikeTweet($id: ID!) {\n    likeTweet(id: $id) \n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nmutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n        id\n    }\n}\n"): (typeof documents)["#graphql\nmutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n        id\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation DeleteTweet($id: ID!) {\n    deleteTweet(id: $id)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation DeleteTweet($id: ID!) {\n    deleteTweet(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation UnfollowMutation($to: ID!) {\n    unFollowUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UnfollowMutation($to: ID!) {\n    unFollowUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation FollowMutation($to: ID!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation FollowMutation($to: ID!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation BanUser($id: ID!) {\n    banUser(id: $id)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation BanUser($id: ID!) {\n    banUser(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation UnBanUser($id: ID!) {\n    unBanUser(id: $id)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UnBanUser($id: ID!) {\n    unBanUser(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation VerifyPayment($data: ResponseType!) {\n    verifyPayment(data: $data)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation VerifyPayment($data: ResponseType!) {\n    verifyPayment(data: $data)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetSignedURL($imageType: String!, $imageName: String!) {\n    getSignedURLForTweet(imageType: $imageType, imageName: $imageName)\n  }\n"): (typeof documents)["\n  #graphql\n  query GetSignedURL($imageType: String!, $imageName: String!) {\n    getSignedURLForTweet(imageType: $imageType, imageName: $imageName)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query VerifyUserGoogleTokenQuery($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"): (typeof documents)["\n  #graphql\n  query VerifyUserGoogleTokenQuery($token: String!) {\n    verifyGoogleToken(token: $token)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query CapturePayment {\n    capturePayment {\n      id\n      entity\n      amount\n      amount_paid\n      amount_due\n      currency\n      receipt\n      offer_id\n      status\n      attempts\n      notes\n      created_at\n      razorpay\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query CapturePayment {\n    capturePayment {\n      id\n      entity\n      amount\n      amount_paid\n      amount_due\n      currency\n      receipt\n      offer_id\n      status\n      attempts\n      notes\n      created_at\n      razorpay\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      firstName\n      id\n      lastName\n      profileImageURL\n      role\n      ban\n      subscribe\n      recomendedUsers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n          role\n          ban\n          subscribe\n        }\n        likes {\n          user {\n            firstName\n            id\n            lastName\n            profileImageURL\n          }\n        }\n      }\n      likes {\n        tweet {\n          id\n          content\n          imageURL\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n        user {\n          firstName\n          id\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      firstName\n      id\n      lastName\n      profileImageURL\n      role\n      ban\n      subscribe\n      recomendedUsers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n          role\n          ban\n          subscribe\n        }\n        likes {\n          user {\n            firstName\n            id\n            lastName\n            profileImageURL\n          }\n        }\n      }\n      likes {\n        tweet {\n          id\n          content\n          imageURL\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n        user {\n          firstName\n          id\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetCurrentUserById($id: ID!) {\n    getCurrentUserById(id: $id) {\n      firstName\n      id\n      lastName\n      profileImageURL\n      subscribe\n      ban\n      role\n      followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n          subscribe\n          ban\n          role\n        }\n        likes {\n          user {\n            firstName\n            id\n            lastName\n            profileImageURL\n          }\n        }\n      }\n      likes {\n        tweet {\n          id\n          content\n          imageURL\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n        user {\n          firstName\n          id\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetCurrentUserById($id: ID!) {\n    getCurrentUserById(id: $id) {\n      firstName\n      id\n      lastName\n      profileImageURL\n      subscribe\n      ban\n      role\n      followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n          subscribe\n          ban\n          role\n        }\n        likes {\n          user {\n            firstName\n            id\n            lastName\n            profileImageURL\n          }\n        }\n      }\n      likes {\n        tweet {\n          id\n          content\n          imageURL\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n        user {\n          firstName\n          id\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;