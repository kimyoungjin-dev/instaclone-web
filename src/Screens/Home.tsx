import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "../Components/Fragment";
import Avatar from "../Components/Avatar";
import { seeFeed } from "../__generated__/seeFeed";
import { FatText } from "../Components/SharedStyles";
import { AiOutlineHeart, AiTwotoneMessage } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BsBookmark, BsThreeDots } from "react-icons/bs";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PhotoCotainer = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 700px;
`;

const PhotoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Column = styled.div`
  display: flex;
  align-items: center;

  & svg {
    font-size: 24px;
    cursor: pointer;
  }
`;

const UserName = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ActionColumn = styled.div`
  & svg {
    font-size: 21px;
  }
  & :not(:first-child) {
    margin-left: 15px;
  }
`;

const PhotoLikes = styled.span``;

export default function Home() {
  const { data, loading } = useQuery<seeFeed>(FEED_QUERY, {
    variables: {
      offset: 1,
    },
  });

  return (
    <Box>
      {data?.seeFeed?.map((photo) => (
        <PhotoCotainer>
          <PhotoHeader>
            <Column>
              <Avatar url={photo?.user.avatar || undefined} />
              <UserName>{photo?.user.username}</UserName>
            </Column>

            <Column>
              <BsThreeDots />
            </Column>
          </PhotoHeader>

          <PhotoFile src={photo?.file || undefined} />

          <PhotoData>
            <PhotoAction>
              <ActionColumn>
                <AiOutlineHeart />
                <AiTwotoneMessage />
                <HiOutlinePaperAirplane />
              </ActionColumn>

              <ActionColumn>
                <BsThreeDots />
              </ActionColumn>

              <ActionColumn>
                <BsBookmark />
              </ActionColumn>
            </PhotoAction>

            <PhotoLikes>Like {photo?.likes}</PhotoLikes>
          </PhotoData>
        </PhotoCotainer>
      ))}
    </Box>
  );
}
