import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        id
        file
        likes
        commentNumber
        isLiked
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
`;

export default function Profile() {
  const params = useParams();
  const { data } = useQuery(SEE_PROFILE_QUERY);

  return <div>Profile</div>;
}
