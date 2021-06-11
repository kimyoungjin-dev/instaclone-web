import { useQuery } from "@apollo/client";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import {
  seePhotoLikes,
  seePhotoLikesVariables,
} from "../../__generated__/seePhotoLikes";
import Avatar from "../Avatar";
import { SEE_PHOTO_LIKES } from "../Fragment";
import styled from "styled-components";
import { NumberColor } from "../SharedStyles";
import { Link } from "react-router-dom";
import routes from "../../routes";
import LikesLink from "./LikesLink";

interface PhotoPick {
  photoId: seeFeed_seeFeed["id"];
  likes: seeFeed_seeFeed["likes"];
}

const Image = styled.img`
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin-right: 5px;
`;

const LikeUser = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const Box = styled.div`
  display: flex;
`;

const ZeroLike = styled.span`
  font-size: 12px;
  color: silver;
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
    <Box>
      <span>
        좋아요 <NumberColor>{likes}개</NumberColor>
      </span>

      {data?.seePhotoLikes?.map((like, index) => (
        <LikeUser key={like?.id}>
          {likes === 0 && (
            <ZeroLike>
              해당 게시물의 첫번째 좋아요 주인공이 되어보세요!
            </ZeroLike>
          )}

          {likes === 1 && (
            <>
              <Image src={like?.avatar || undefined} />
              <LikesLink
                linkText={`${routes.Profile}/${like?.username}`}
                text={`님이 좋아요를 눌렀습니다`}
                name={like?.username!}
              />
            </>
          )}

          {likes > 1 && (
            <>
              {index === 0 && (
                <>
                  <Image src={like?.avatar || undefined} />
                  <LikesLink
                    linkText={`${routes.Profile}/${like?.username}`}
                    text={`님 외에 ${likes - 1}명이 좋아요를 눌렀습니다`}
                    name={like?.username!}
                  />
                </>
              )}
            </>
          )}
        </LikeUser>
      ))}
    </Box>
  );
}

{
  /* <Column>
<Like_LikeNumber>
  {likes ? (
    <span>
      <NumberColor>좋아요 {likes}개</NumberColor>
      <span>{data?.seePhotoLikes?.map((v) => v?.username)}</span>
    </span>
  ) : (
    <span> 현재 좋아요가 없습니다</span>
  )}
</Like_LikeNumber>

<div>
  {data?.seePhotoLikes?.map((like, index) => (
    <div>
      {likes > 1
        ? index === 0 && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image src={like?.avatar || undefined} />
              <span style={{ color: "silver" }}>
                {like?.username}님 외에 {likes - 1}명이 좋아요를
                눌렀습니다
              </span>
            </div>
          )
        : null}
    </div>
  ))}
</div>
</Column> */
}
