import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

export const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments {
        id
      }
      createdAt
      isMine
      isLiked
    }
  }
`;

export const SEE_PHOTO_LIKES = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      id
      username
      avatar
    }
  }
`;
