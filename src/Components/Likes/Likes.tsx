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

const LikeBox = styled.div`
  display: flex;
  align-items: center;
`;

const LikeUser = styled.span`
  display: block;
  margin: 0px 7px;
  font-size: 12px;
`;

const LikeColor = styled.span`
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
        <div key={like?.id}>
          {likes === 1 ? (
            <LikeBox>
              <Avatar url={like?.avatar || undefined} />
              <LikeUser>{like?.username}</LikeUser>
              <LikeColor style={{ marginRight: 5 }}>1</LikeColor> Like
            </LikeBox>
          ) : (
            index === 0 && (
              <LikeBox style={{ display: "flex", alignItems: "center" }}>
                <Avatar url={like?.avatar || undefined} />
                <div style={{ marginLeft: 10 }}>
                  {like?.username}님 외에 <LikeColor>{likes - 1}</LikeColor>
                  명이 좋아요를 눌렀습니다.
                </div>
              </LikeBox>
            )
          )}
        </div>
      ))}
    </div>
  );
}
