/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile_photos {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
}

export interface seeProfile_seeProfile_likes_photo {
  __typename: "Photo";
  id: number;
  file: string;
  caption: string | null;
  commentNumber: number;
  likes: number;
}

export interface seeProfile_seeProfile_likes {
  __typename: "Like";
  id: number;
  photo: seeProfile_seeProfile_likes_photo;
}

export interface seeProfile_seeProfile {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string | null;
  username: string;
  bio: string | null;
  avatar: string | null;
  photos: (seeProfile_seeProfile_photos | null)[] | null;
  totalFollowing: number;
  totalFollowers: number;
  isMe: boolean;
  isFollowing: boolean;
  totalLikes: number;
  likes: (seeProfile_seeProfile_likes | null)[] | null;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile | null;
}

export interface seeProfileVariables {
  username: string;
}
