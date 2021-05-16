import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { SEE_PROFILE_QUERY } from "../Fragments";
import {
  seeProfile,
  seeProfileVariables,
  seeProfile_seeProfile,
} from "../__generated__/seeProfile";
import { AiFillHeart, AiOutlineHeart, AiTwotoneMessage } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import DarkModeContainer from "../Components/DarkModeContainer";
import PageTitle from "../Components/PageTitle";
import {
  Container,
  EditBtn,
  Follow,
  FollowBox,
  Grid,
  Icon,
  Icons,
  InfoMationBox,
  Maintitle,
  ProfileContainer,
  ProfilePhoto,
  UserInfoMation,
  UserName,
  Wrapper,
  Photo,
  Subtitle,
} from "../styles/StyledComponents/ProfileStyle";

export default function Profile() {
  const { username } = useParams<seeProfileVariables>(); //{username:youngjin}
  const { data, loading } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: {
        username,
      },
    }
  );

  const checkFn = (seeProfile: seeProfile_seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) return <EditBtn>Edit Profile</EditBtn>;
    if (isFollowing) return <EditBtn>UnFollwing</EditBtn>;
    else {
      return <EditBtn>Follow</EditBtn>;
    }
  };

  return (
    <Container>
      <PageTitle
        title={
          loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`
        }
      />

      <Wrapper>
        <DarkModeContainer />

        <ProfileContainer>
          <UserInfoMation>
            <ProfilePhoto src={data?.seeProfile?.avatar || undefined} />
            <InfoMationBox>
              <UserName>{data?.seeProfile?.username}</UserName>
              {data?.seeProfile ? checkFn(data.seeProfile) : null}

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
              <Photo key={photo?.id} bg={photo?.file || undefined}>
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
