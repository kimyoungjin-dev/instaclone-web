import { useMutation } from "@apollo/client";
import { AiFillHeart, AiOutlineHeart, AiTwotoneMessage } from "react-icons/ai";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import styled from "styled-components";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import Avatar from "../Avatar";
import { TOGGLE_LIKE_MUTATION } from "../Fragment";
import Likes from "../Likes/Likes";
import { FatText } from "../SharedStyles";

const PhotoCotainer = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 700px;
  border-radius: 8px;
  margin-bottom: 25px;
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

const ToggleLikeBtn = styled.span`
  cursor: pointer;
`;

type PhotoPick = Pick<
  seeFeed_seeFeed,
  "id" | "user" | "likes" | "file" | "isLiked"
>;

export default function Photo({ id, user, likes, file, isLiked }: PhotoPick) {
  const [toggle_like_mutation] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        id,
      },
    }
  );

  return (
    <PhotoCotainer key={id}>
      <PhotoHeader>
        <Column>
          <Avatar url={user.avatar || undefined} />
          <UserName>{user.username}</UserName>
        </Column>

        <Column>
          <BsThreeDots />
        </Column>
      </PhotoHeader>

      <PhotoFile src={file || undefined} />

      <PhotoData>
        <PhotoAction>
          <ActionColumn>
            <ToggleLikeBtn onClick={() => toggle_like_mutation()}>
              {isLiked ? (
                <AiFillHeart style={{ color: "tomato" }} />
              ) : (
                <AiOutlineHeart />
              )}
            </ToggleLikeBtn>
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

        <Likes photoId={id} likes={likes} />
      </PhotoData>
    </PhotoCotainer>
  );
}
