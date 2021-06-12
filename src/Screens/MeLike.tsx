import { useQuery } from "@apollo/client";
import { SEE_PROFILE_QUERY } from "../Components/Fragment";
import useUser from "../Components/Hooks/useUser";
import TopBox from "../Components/ProfileShardBox/TopBox";
import { seeProfile, seeProfileVariables } from "../__generated__/seeProfile";
import styled from "styled-components";
import { NumberColor } from "../Components/SharedStyles";
import Grid from "../Components/ProfileShardBox/Grid";
import { bgProps } from "../Components/InterFace/PropsInterFace";
import { Icons } from "../Components/ProfileShardBox/ProfileStyles/Icons";
import { Icon } from "../Components/ProfileShardBox/ProfileStyles/Icon";
import {
  AiFillHeart,
  AiFillMessage,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";
import { Image } from "../Components/ProfileShardBox/ProfileStyles/Image";
import PageTitle from "../Components/PageTitle";
import User from "../Components/ProfileShardBox/User";
import ProfilePhotoTitle from "../Components/ProfileShardBox/ProfilePhotoTitle";

const Container = styled.div`
  padding-bottom: 30px;
`;

const UserName_Btn = styled.div`
  display: flex;
  align-items: center;
`;

const ColorText = styled(NumberColor)`
  margin-right: 8px;
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

export default function MeLike() {
  const { data: userData } = useUser();
  const { data } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: {
        username: userData?.me?.username!,
      },
    }
  );

  return (
    <Container>
      <PageTitle title={`${data?.seeProfile?.username}님이 누른 좋아요`} />
      <TopBox>
        <Image src={data?.seeProfile?.avatar || undefined} />
        <User>
          <UserName_Btn>
            <span style={{ fontWeight: "bold", fontSize: 24 }}>
              {data?.seeProfile?.username}
            </span>
            <span>getButton</span>
          </UserName_Btn>

          <div>
            <span style={{ marginRight: 20 }}>
              <ColorText>{data?.seeProfile?.totalFollowers}</ColorText>
              Followers
            </span>

            <span>
              <ColorText>{data?.seeProfile?.totalFollowing}</ColorText>
              Following
            </span>
          </div>

          <span style={{ fontSize: 17 }}>
            {data?.seeProfile?.username}님의 소개글 :{" "}
            <span style={{ fontSize: 13 }}>안녕하세요!!</span>
          </span>

          <span style={{ color: "silver" }}>
            Good morning. Welcome to {data?.seeProfile?.username}'s Instagram
            profile. Have a good day!
          </span>
        </User>
      </TopBox>

      <ProfilePhotoTitle title="My Photos" />

      <Grid>
        {data?.seeProfile?.likes?.map((item) => (
          <Photo bg={item?.photo.file}>
            <Icons>
              <Icon>
                <NumberColor>{item?.photo?.likes}</NumberColor>
                {item?.photo?.likes === 0 ? (
                  <AiOutlineHeart />
                ) : (
                  <AiFillHeart />
                )}
              </Icon>
              <Icon>
                <NumberColor>{item?.photo?.commentNumber}</NumberColor>
                {item?.photo?.commentNumber === 0 ? (
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
