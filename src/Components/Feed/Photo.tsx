import { BsBookmark } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BiMessageRounded } from "react-icons/bi";
import styled from "styled-components";
import { FatText } from "../SharedStyles";
import Avatar from "../Avatar";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";

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

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

export default function Photo({
  id,
  user,
  file,
  likes,
  isLiked,
}: seeFeed_seeFeed) {
  const [toggleLikeMutation, { loading }] = useMutation<
    toggleLike,
    toggleLikeVariables
  >(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
  });

  return (
    <PhotoContainer>
      <PhotoHeader>
        <Avatar url={user.avatar || undefined} isLarge={false} />
        <UserName>{user.username}</UserName>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction>
              {isLiked ? (
                <AiFillHeart
                  size={20}
                  style={{
                    color: isLiked ? "tomato" : "inherit",
                  }}
                />
              ) : (
                <AiOutlineHeart size={20} />
              )}
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
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      </PhotoData>
    </PhotoContainer>
  );
}
