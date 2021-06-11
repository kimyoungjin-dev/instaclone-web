import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { SEE_PROFILE_QUERY } from "../Components/Fragment";
import { seeProfile, seeProfileVariables } from "../__generated__/seeProfile";
import styled from "styled-components";
import {
  AiFillHeart,
  AiFillMessage,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";
import { NumberColor } from "../Components/SharedStyles";
import PageTitle from "../Components/PageTitle";
import UserInfo from "../Components/ProfileShardBox/UserInfo";
import useUser from "../Components/Hooks/useUser";
import ProfilePhotoTitle from "../Components/ProfileShardBox/ProfilePhotoTitle";
import Grid from "../Components/ProfileShardBox/Grid";
import { Icons } from "../Components/ProfileShardBox/ProfileStyles/Icons";
import Photo from "../Components/ProfileShardBox/Photo";
import { Icon } from "../Components/ProfileShardBox/ProfileStyles/Icon";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 30px;
`;

const LogOutContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoutText = styled.span`
  color: tomato;
  font-weight: bold;
  font-size: 24px;
`;

export default function Profile() {
  const { username } = useParams<seeProfileVariables>();
  const { data: userData } = useUser();
  const { data } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: {
        username,
      },
    }
  );

  return (
    <>
      {userData?.me ? (
        <Container>
          <PageTitle title={`${data?.seeProfile?.username}님의 프로필`} />
          <UserInfo />

          <ProfilePhotoTitle title="My Photos" />

          <Grid>
            {data?.seeProfile?.photos?.map((photo) => (
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
      ) : (
        <LogOutContainer>
          <LogoutText>로그아웃 되었습니다. 다시 로그인 하세요</LogoutText>
        </LogOutContainer>
      )}
    </>
  );
}
