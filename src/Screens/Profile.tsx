import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import {
  SEE_PROFILE_QUERY,
  UNFOLLOW_USER_MUTATION,
  FOLLOW_USER_MUTATION,
} from "../Fragments";
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
import useUser from "../Components/Hooks/useUser";
import {
  unfollowUser,
  unfollowUserVariables,
} from "../__generated__/unfollowUser";
import { followUser, followUserVariables } from "../__generated__/followUser";

export default function Profile() {
  const { username } = useParams<seeProfileVariables>();
  const { data: userData } = useUser();
  const client = useApolloClient();
  const { data, loading } = useQuery<seeProfile>(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  const [unfollowUser] = useMutation<unfollowUser, unfollowUserVariables>(
    UNFOLLOW_USER_MUTATION,
    {
      variables: {
        username,
      },
      update: (cache, result) => {
        if (result.data?.unfollowUser.ok) {
          const {
            data: {
              unfollowUser: { ok },
            },
          } = result;

          if (!ok) {
            return;
          }

          cache.modify({
            id: `User:${username}`,
            fields: {
              isFollowing(prev) {
                return false;
              },
              totalFollowers(prev) {
                return prev - 1;
              },
            },
          });
          if (userData?.me) {
            const { me } = userData;
            cache.modify({
              id: `User:${me.username}`,
              fields: {
                totalFollowing(prev) {
                  return prev - 1;
                },
              },
            });
          }
        }
      },
    }
  );
  //followUser
  //followUser
  const [followUser] = useMutation<followUser, followUserVariables>(
    FOLLOW_USER_MUTATION,
    {
      variables: {
        username,
      },
      onCompleted: (data) => {
        const {
          followUser: { ok },
        } = data;

        if (!ok) {
          return;
        }

        const { cache } = client;
        cache.modify({
          id: `User:${username}`,
          fields: {
            isFollowing(prev) {
              return true;
            },
            totalFollowers(prev) {
              return prev + 1;
            },
          },
        });
        if (userData?.me) {
          const { me } = userData;
          cache.modify({
            id: `User:${me.username}`,
            fields: {
              totalFollowing(prev) {
                return prev + 1;
              },
            },
          });
        }
      },
    }
  );

  const checkFn = (seeProfile: seeProfile_seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) return <EditBtn>Edit Profile</EditBtn>;
    if (isFollowing)
      return <EditBtn onClick={() => unfollowUser()}>UnFollwing</EditBtn>;
    else {
      return <EditBtn onClick={() => followUser()}>Follow</EditBtn>;
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
