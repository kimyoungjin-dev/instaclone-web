import { useQuery } from "@apollo/client";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import {
  seePhotoLikes,
  seePhotoLikesVariables,
} from "../../__generated__/seePhotoLikes";
import { SEE_PHOTO_LIKES } from "../Fragment";
import styled from "styled-components";
import { defaultFlexBox, NumberColor } from "../SharedStyles";
import routes from "../../routes";
import LikesLink from "./LikesLink";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

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

//ShowLikeUserBox
const ShowLikeUserBox = styled(defaultFlexBox)`
  position: fixed;
  opacity: 0.7;
  height: 100vh;
  top: 0;
  width: 100%;
  left: 0;
  background-color: black;
  z-index: 1;
`;

const Wrapper = styled.div`
  border: 1px solid white;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  color: white;
  position: relative;
  padding-top: 20px;
  z-index: 100;
`;

const Icon = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  padding: 10px;
  cursor: pointer;
`;

export default function Likes({ photoId, likes }: PhotoPick) {
  const [showLikesUser, setShowLikesUser] = useState(false);
  const toggleShowLikeUser = () => setShowLikesUser((prev) => !prev);
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
      <span onClick={toggleShowLikeUser} style={{ cursor: "pointer" }}>
        좋아요 <NumberColor>{likes}개</NumberColor>
      </span>

      {showLikesUser && (
        <ShowLikeUserBox>
          <Wrapper>
            <Icon onClick={toggleShowLikeUser}>
              <AiOutlineCloseCircle size={30} />
            </Icon>

            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 24 }}>Likes</span>
            </div>

            <div style={{ marginTop: 30, paddingLeft: 20 }}>
              {data?.seePhotoLikes?.map((item) => (
                <div style={{ marginBottom: 20 }}>
                  <Image src={item?.avatar || undefined} />
                  <span style={{ fontSize: 24 }}>{item?.username}</span>
                </div>
              ))}
            </div>
          </Wrapper>
        </ShowLikeUserBox>
      )}

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
