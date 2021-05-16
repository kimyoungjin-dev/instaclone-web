import { gql, useQuery } from "@apollo/client";
import Photo from "../Components/Feed/Photo";
import PageTitle from "../Components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../Fragments";
import { seeFeed, seeFeedVariables } from "../__generated__/seeFeed";
import styled from "styled-components";
import DarkModeContainer from "../Components/DarkModeContainer";

const Cotainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FEED_QUERY = gql`
  query seeFeed($page: Int!) {
    seeFeed(page: $page) {
      ...PhotoFragment
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      commentNumber
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
      isLiked
    }
  }
  ${COMMENT_FRAGMENT}
  ${PHOTO_FRAGMENT}
`;

//seeFeed 외에 변수가 있는경우에만 <seeFeed , "">추가로 써준다.
export default function Home() {
  const { data } = useQuery<seeFeed, seeFeedVariables>(FEED_QUERY, {
    variables: {
      page: 1,
    },
  });

  return (
    <Cotainer>
      <div>
        <DarkModeContainer />

        <PageTitle title="Home" />
        {data?.seeFeed?.map((photo) => (
          <Photo key={photo?.id} {...photo!} />
        ))}
      </div>
    </Cotainer>
  );
}
