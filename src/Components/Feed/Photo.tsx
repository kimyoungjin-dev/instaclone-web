import { BsBookmark } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BiMessageRounded } from "react-icons/bi";
import styled from "styled-components";
import { FatText } from "../SharedStyles";
import Avatar from "../Avatar";
import { seeFeed, seeFeed_seeFeed } from "../../__generated__/seeFeed";
import gql from "graphql-tag";
import { ApolloCache, useMutation } from "@apollo/client";
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

const Comments = styled.div`
  margin-top: 20px;
`;

const Comment = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  font-size: 12px;
  display: block;
  font-weight: 600;
`;

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
  console.log(comments);
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
          const fragmentId = `Photo:${id}`;
          const fragment = gql`
            fragment BSName on Photo {
              likes
              isLiked
            }
          `;

          const result: seeFeed | null = cache.readFragment({
            id: fragmentId,
            fragment,
          });

          if ("likes" in result! && "isLiked" in result) {
            const { isLiked: cacheIsLiked, likes: cacheIsLikes } = result;
            cache.writeFragment({
              id: fragmentId,
              fragment,
              data: {
                isLiked: !cacheIsLiked,
                likes: cacheIsLiked ? cacheIsLikes - 1 : cacheIsLikes + 1,
              },
            });
          }
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
        <Comments>
          <Comment>
            <FatText>{user.username}</FatText>
            <CommentCaption>{caption}</CommentCaption>
          </Comment>

          <CommentCount>
            {commentNumber === 1 ? "1 Comment" : `${commentNumber} Comments`}
          </CommentCount>

          {comments?.map((comment) => (
            <Comment key={comment?.id}>
              <FatText>{comment?.user.username}</FatText>
            </Comment>
          ))}
        </Comments>
      </PhotoData>
    </PhotoContainer>
  );
}
