import { gql, useQuery } from "@apollo/client";
import Photo from "../Components/Feed/Photo";
import { seeFeed, seeFeedVariables } from "../__generated__/seeFeed";

const FEED_QUERY = gql`
  query seeFeed($page: Int!) {
    seeFeed(page: $page) {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

//seeFeed 외에 변수가 있는경우에만 <seeFeed , "">추가로 써준다.
export default function Home() {
  const { data } = useQuery<seeFeed, seeFeedVariables>(FEED_QUERY, {
    variables: {
      page: 1,
    },
  });

  return (
    <div>
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo?.id} {...photo!} />
      ))}
    </div>
  );
}
