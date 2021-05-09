import { gql, useQuery } from "@apollo/client";
import { seeFeed, seeFeedVariables } from "../__generated__/seeFeed";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import { FatText } from "../Components/SharedStyles";

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
    }
  }
`;

const PhotoContainer = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;

const PhotoHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const UserName = styled(FatText)`
  margin-left: 10px;
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
        <PhotoContainer>
          <PhotoHeader>
            <Avatar url={photo?.user?.avatar || undefined} />
            <UserName>{photo?.user?.username}</UserName>
          </PhotoHeader>
        </PhotoContainer>
      ))}
    </div>
  );
}
