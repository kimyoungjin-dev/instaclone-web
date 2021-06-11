import { useMutation } from "@apollo/client";
import {
  AiFillHeart,
  AiFillMessage,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../../routes";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import Avatar from "../Avatar";
import { TOGGLE_LIKE_MUTATION } from "../Fragment";
import Likes from "../Likes/Likes";
import { defaultFlexBox, FatText } from "../SharedStyles";
import Comments from "./Comments";

const PhotoCotainer = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 700px;
  border-radius: 8px;
  margin-bottom: 25px;
`;

const PhotoHeader = styled(defaultFlexBox)`
  justify-content: space-between;
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
  height: 100%;
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
  | "id"
  | "user"
  | "likes"
  | "file"
  | "isLiked"
  | "comments"
  | "commentNumber"
  | "caption"
  | "isMine"
>;

export default function Photo({
  id,
  user,
  likes,
  file,
  isLiked,
  comments,
  commentNumber,
  caption,
}: PhotoPick) {
  const [toggle_like_mutation] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        id,
      },
      update: (cache, result) => {
        if (result.data?.toggleLike.ok) {
          const {
            data: {
              toggleLike: { ok },
            },
          } = result;
          if (ok) {
            const photoId = `Photo:${id}`;
            cache.modify({
              id: photoId,
              fields: {
                isLiked(prev) {
                  return !prev;
                },
                likes(prev) {
                  return isLiked ? prev - 1 : prev + 1;
                },
              },
            });
          }
        }
      },
    }
  );

  return (
    <PhotoCotainer key={id}>
      <PhotoHeader>
        <Column>
          <Link to={`${routes.Profile}/${user.username}`}>
            <Avatar url={user.avatar || undefined} />
          </Link>
          <Link to={`${routes.Profile}/${user.username}`}>
            <UserName>{user.username}</UserName>
          </Link>
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
                <AiOutlineHeart style={{ color: "tomato" }} />
              )}
            </ToggleLikeBtn>

            {commentNumber === 0 ? (
              <AiOutlineMessage style={{ color: "skyblue" }} />
            ) : (
              <AiFillMessage style={{ color: "skyblue" }} />
            )}

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

        <Comments
          author={user.username}
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
          photoId={id}
        />
      </PhotoData>
    </PhotoCotainer>
  );
}
