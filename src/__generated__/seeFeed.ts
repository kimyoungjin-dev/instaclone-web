/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface seeFeed_seeFeed {
  __typename: "Photo";
  id: number;
  user: seeFeed_seeFeed_user;
  file: string;
  caption: string | null;
  likes: number;
  comments: number;
  createdAt: string;
  isMine: boolean;
}

export interface seeFeed {
  seeFeed: (seeFeed_seeFeed | null)[] | null;
}

export interface seeFeedVariables {
  page: number;
}
