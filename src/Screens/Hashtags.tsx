import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SEE_HASH_TAGS } from "../Components/Fragment";
import { seeHashtag, seeHashtagVariables } from "../__generated__/seeHashtag";
import styled from "styled-components";
import {
  defaultFlexBox,
  FatText,
  NumberColor,
} from "../Components/SharedStyles";
import ProfilePhotoTitle from "../Components/ProfileShardBox/ProfilePhotoTitle";
import Grid from "../Components/ProfileShardBox/Grid";

import { Icons } from "../Components/ProfileShardBox/ProfileStyles/Icons";
import {
  AiFillHeart,
  AiFillMessage,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";
import { Icon } from "../Components/ProfileShardBox/ProfileStyles/Icon";
import { bgProps } from "../Components/InterFace/PropsInterFace";

const Container = styled(defaultFlexBox)`
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 30px;
`;

const HashtagTitle = styled(FatText)`
  font-size: 40px;
  margin-bottom: 30px;
`;

const Post = styled.div`
  margin-bottom: 100px;

  & :first-child {
    font-size: 20px;
    margin-right: 5px;
  }

  & :last-child {
    font-size: 18px;
  }
`;

const Photo = styled.div<bgProps>`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
  border-radius: 8px;
  :hover {
    filter: brightness(0.6);
  }
`;

export default function Hashtags() {
  const { hashtag } = useParams<seeHashtagVariables>();
  const changeHashtag = `#${hashtag}`;

  const { data } = useQuery<seeHashtag, seeHashtagVariables>(SEE_HASH_TAGS, {
    variables: {
      hashtag: changeHashtag,
    },
  });

  console.log(data?.seeHashtag);

  return (
    <Container>
      <HashtagTitle># hello</HashtagTitle>

      <Post>
        <span>HashTag 게시물</span>
        <NumberColor>{data?.seeHashtag?.totalPhotos}</NumberColor>
      </Post>

      <ProfilePhotoTitle title="Hashtag Photos" isOpacity={true} />

      <Grid>
        {data?.seeHashtag?.photos?.map((photo) => (
          <Photo key={photo?.id} bg={photo?.file}>
            <Icons>
              <Icon>
                <NumberColor>{photo?.likes}</NumberColor>
                {photo?.likes === 0 ? <AiOutlineHeart /> : <AiFillHeart />}
              </Icon>

              <Icon>
                <NumberColor>{photo?.commentNumber}</NumberColor>
                {photo?.commentNumber === 0 ? (
                  <AiOutlineMessage />
                ) : (
                  <AiFillMessage />
                )}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </Container>
  );
}
