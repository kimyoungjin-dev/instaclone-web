/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentFragment
// ====================================================

export interface CommentFragment_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface CommentFragment {
  __typename: "Comment";
  id: number;
  createdAt: string;
  isMine: boolean;
  payload: string;
  user: CommentFragment_user;
}
