import { useQuery } from "@apollo/client";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import {
  seePhotoLikes,
  seePhotoLikesVariables,
} from "../../__generated__/seePhotoLikes";
import Avatar from "../Avatar";
import { SEE_PHOTO_LIKES } from "../Fragment";
import styled from "styled-components";

interface PhotoPick {
  photoId: seeFeed_seeFeed["id"];
  likes: seeFeed_seeFeed["likes"];
}

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LikeUser = styled.span`
  display: block;
  margin-left: 8px;
  font-size: 12px;
`;

const LikeImpect = styled.span`
  color: tomato;
`;

export default function Likes({ photoId, likes }: PhotoPick) {
  const { data } = useQuery<seePhotoLikes, seePhotoLikesVariables>(
    SEE_PHOTO_LIKES,
    {
      variables: {
        id: photoId,
      },
    }
  );
  return (
    <div>
      {data?.seePhotoLikes?.map((like, index) => (
        <div>
          {index === 0 ? (
            <LikeContainer>
              <Avatar url={like?.avatar || undefined} />
              <LikeUser>
                {like?.username}님 외에 <LikeImpect>{likes - 1}</LikeImpect>명이
                좋아요를 눌렀습니다
              </LikeUser>
            </LikeContainer>
          ) : null}
        </div>
      ))}
    </div>
  );
}
