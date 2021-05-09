import { gql, useQuery } from "@apollo/client";
import { seeFeed, seeFeedVariables } from "../__generated__/seeFeed";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import { FatText } from "../Components/SharedStyles";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BiMessageRounded } from "react-icons/bi";

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
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px 10px;
  display: flex;
  align-items: center;
`;

const UserName = styled(FatText)`
  margin-left: 10px;
`;

const PhotoFile = styled.img`
  width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 10px;
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
        <PhotoContainer key={photo?.id}>
          <PhotoHeader>
            <Avatar url={photo?.user?.avatar || undefined} lg />
            <UserName>{photo?.user?.username}</UserName>
          </PhotoHeader>
          <PhotoFile src={photo?.file || undefined} />
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <AiOutlineHeart size={20} />
                </PhotoAction>

                <PhotoAction>
                  <BiMessageRounded size={20} />
                </PhotoAction>

                <PhotoAction>
                  <HiOutlinePaperAirplane size={20} />
                </PhotoAction>
              </div>

              <div>
                <BsBookmark size={20} />
              </div>
            </PhotoActions>
            <Likes>
              {photo?.likes === 1 ? "1 like" : `${photo?.likes} likes`}
            </Likes>
          </PhotoData>
        </PhotoContainer>
      ))}
    </div>
  );
}
