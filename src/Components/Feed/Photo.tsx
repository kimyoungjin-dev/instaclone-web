import { ApolloCache, useMutation } from "@apollo/client";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import Avatar from "../Avatar";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BiMessageRounded } from "react-icons/bi";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import { TOGGLE_LIKE_MUTATION } from "../../Fragments";
import {
  PhotoContainer,
  PhotoHeader,
  UserName,
  PhotoFile,
  PhotoData,
  PhotoActions,
  PhotoAction,
  Likes,
} from "../../styles/StyledComponents/PhotoStyle";

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
        <Link to={`users/${user.username}`}>
          <Avatar url={user.avatar || undefined} isLarge={false} />
        </Link>

        <Link to={`users/${user.username}`}>
          <UserName>{user.username}</UserName>
        </Link>
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
          photoId={id}
          author={user.username}
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
}
