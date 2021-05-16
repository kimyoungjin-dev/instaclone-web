import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router";
import { PHOTO_FRAGMENT } from "../Fragments";
import { seeProfile, seeProfileVariables } from "../__generated__/seeProfile";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart, AiTwotoneMessage } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import DarkModeContainer from "../Components/DarkModeContainer";
import PageTitle from "../Components/PageTitle";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 700px;
`;

const ProfileContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
`;

const ProfileDarkModeBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UserInfoMation = styled.div`
  display: flex;
`;

const ProfilePhoto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const InfoMationBox = styled.div`
  margin-left: 30px;
  line-height: 2;
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

const FollowBox = styled.div`
  display: flex;
`;

const Follow = styled.span`
  color: gray;
  opacity: 0.8;
  :not(:first-child) {
    margin-left: 10px;
  }
`;

const Maintitle = styled.div`
  font-size: 18px;
`;

const Subtitle = styled.div`
  font-size: 15px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 50px;
  row-gap: 30px;
  column-gap: 20px;
`;

const Photo = styled.div<{ bg: string | undefined }>`
  position: relative;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bg});
  width: 220px;
  height: 220px;
  border-radius: 3px;
`;

const Icons = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.4s ease-in-out;
  opacity: 0;
  :hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  svg {
    margin-right: 3px;
  }
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }

      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

export default function Profile() {
  const { username } = useParams<seeProfileVariables>(); //{username:youngjin}
  const { data } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: {
        username,
      },
    }
  );

  return (
    <Container>
      <PageTitle title="Profile" />
      <Wrapper>
        <ProfileDarkModeBox>
          <DarkModeContainer />
        </ProfileDarkModeBox>

        <ProfileContainer>
          <UserInfoMation>
            <ProfilePhoto src={data?.seeProfile?.avatar || undefined} />
            <InfoMationBox>
              <UserName>{data?.seeProfile?.username}</UserName>
              <FollowBox>
                <Follow>{data?.seeProfile?.totalFollowers} Followers</Follow>
                <Follow>{data?.seeProfile?.totalFollowing} Following</Follow>
              </FollowBox>
              <Maintitle>{data?.seeProfile?.username} Should Work!</Maintitle>
              <Subtitle>Super Exciting!</Subtitle>
            </InfoMationBox>
          </UserInfoMation>

          <Grid>
            {data?.seeProfile?.photos?.map((photo) => (
              <Photo bg={photo?.file || undefined}>
                <Icons>
                  <Icon>
                    {photo?.likes === 0 ? <AiOutlineHeart /> : <AiFillHeart />}
                    {photo?.likes}
                  </Icon>

                  <Icon>
                    {photo?.commentNumber === 0 ? (
                      <BiMessageRounded />
                    ) : (
                      <AiTwotoneMessage />
                    )}

                    {photo?.commentNumber}
                  </Icon>
                </Icons>
              </Photo>
            ))}
          </Grid>
        </ProfileContainer>
      </Wrapper>
    </Container>
  );
}
