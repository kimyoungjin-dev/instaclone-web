import gql from "graphql-tag";
import { ApolloCache, useMutation } from "@apollo/client";
import { seeFeed, seeFeed_seeFeed } from "../../__generated__/seeFeed";
import styled from "styled-components";
import Avatar from "../Avatar";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BiMessageRounded } from "react-icons/bi";
import { FatText } from "../SharedStyles";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import Comments from "./Comments";

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
  cursor: pointer;
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

//comments

export default function Photo({
  id,
  user,
  file,
  likes,
  isLiked,
  caption,
  comments,
  commentNumber,
}: seeFeed_seeFeed) {
  const [toggleLikeMutation, { loading }] = useMutation<
    toggleLike,
    toggleLikeVariables
  >(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },

    //cache: cache를 제어할수있는 link이다.
    update: (cache: ApolloCache<toggleLike>, result) => {
      if (result.data?.toggleLike.ok) {
        const {
          data: {
            toggleLike: { ok },
          },
        } = result;
        if (ok) {
          const PhotoId = `Photo:${id}`;
          cache.modify({
            id: PhotoId,
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
            <PhotoAction onClick={() => toggleLikeMutation()}>
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
        <Comments
          user={user}
          commentNumber={commentNumber}
          comments={comments}
          caption={caption}
        />
      </PhotoData>
    </PhotoContainer>
  );
}
