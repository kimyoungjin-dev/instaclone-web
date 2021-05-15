/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BSName
// ====================================================

export interface BSName_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface BSName {
  __typename: "Comment";
  id: number;
  createdAt: string;
  isMine: boolean;
  payload: string;
  user: BSName_user;
}
