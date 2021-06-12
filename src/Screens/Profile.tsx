import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import {
  FOLLOW_USER_MUTATION,
  SEE_PROFILE_QUERY,
  UNFOLLOW_USER_MUTATION,
} from "../Components/Fragment";
import {
  seeProfile,
  seeProfileVariables,
  seeProfile_seeProfile,
} from "../__generated__/seeProfile";
import styled from "styled-components";
import {
  AiFillHeart,
  AiFillMessage,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";
import { NumberColor } from "../Components/SharedStyles";
import PageTitle from "../Components/PageTitle";
import ProfilePhotoTitle from "../Components/ProfileShardBox/ProfilePhotoTitle";
import Grid from "../Components/ProfileShardBox/Grid";
import { Icons } from "../Components/ProfileShardBox/ProfileStyles/Icons";
import Photo from "../Components/ProfileShardBox/Photo";
import { Icon } from "../Components/ProfileShardBox/ProfileStyles/Icon";
import {
  unfollowUser,
  unfollowUserVariables,
} from "../__generated__/unfollowUser";
import TopBox from "../Components/ProfileShardBox/TopBox";
import { Image } from "../Components/ProfileShardBox/ProfileStyles/Image";
import User from "../Components/ProfileShardBox/User";
import { logUserOut } from "../Components/Apollo";
import { followUser, followUserVariables } from "../__generated__/followUser";
import useUser from "../Components/Hooks/useUser";
import React from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 30px;
`;

const ColorText = styled(NumberColor)`
  margin-right: 8px;
`;

const UserName_Btn = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.span`
  cursor: pointer;
  padding: 5px;
  background-color: tomato;
  border-radius: 3px;
  margin-left: 15px;
  height: 20px;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: white;
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

const TotalFollowingwer = styled.div``;

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

  const [unfollowMutation] = useMutation<unfollowUser, unfollowUserVariables>(
    UNFOLLOW_USER_MUTATION,
    {
      variables: {
        username,
      },

      update: (cache, result) => {
        if (result.data?.unfollowUser) {
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
              isFollowing() {
                return false;
              },
              totalFollowers(prev) {
                return prev - 1;
              },
            },
          });
          if (userData?.me) {
            const {
              me: { username },
            } = userData;
            cache.modify({
              id: `User:${username}`,
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
  const [followMutation] = useMutation<followUser, followUserVariables>(
    FOLLOW_USER_MUTATION,
    {
      variables: {
        username,
      },
      update: (cache, result) => {
        if (result.data?.followUser) {
          const {
            data: {
              followUser: { ok },
            },
          } = result;
          if (!ok) {
            return;
          }

          cache.modify({
            id: `User:${username}`,
            fields: {
              isFollowing() {
                return true;
              },
              totalFollowers(prev) {
                return prev + 1;
              },
            },
          });

          if (userData?.me) {
            const {
              me: { username },
            } = userData;
            cache.modify({
              id: `User:${username}`,
              fields: {
                totalFollowing(prev) {
                  return prev + 1;
                },
              },
            });
          }
        }
      },
    }
  );

  const getButton = (seeProfile: seeProfile_seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return (
        <>
          <Button>EditProfile</Button>
          <Button
            style={{ backgroundColor: "blue" }}
            onClick={() => logUserOut()}
          >
            Log Out
          </Button>
        </>
      );
    }

    if (isFollowing && userData?.me) {
      return <Button onClick={() => unfollowMutation()}>UnFollowing</Button>;
    }
    if (!isFollowing && userData?.me) {
      return <Button onClick={() => followMutation()}>Following</Button>;
    }
  };

  return (
    <React.Fragment>
      {userData?.me ? (
        <Container>
          <PageTitle title={`${data?.seeProfile?.username}님의 프로필`} />
          <TopBox>
            <Image src={data?.seeProfile?.avatar || undefined} />

            <User>
              <UserName_Btn>
                <span style={{ fontWeight: "bold", fontSize: 24 }}>
                  {data?.seeProfile?.username}
                </span>
                {data?.seeProfile && getButton(data.seeProfile)}
              </UserName_Btn>

              <TotalFollowingwer>
                <span style={{ marginRight: 20 }}>
                  <ColorText>{data?.seeProfile?.totalFollowers}</ColorText>
                  Followers
                </span>

                <span>
                  <ColorText>{data?.seeProfile?.totalFollowing}</ColorText>
                  Following
                </span>
              </TotalFollowingwer>

              <span style={{ fontSize: 17 }}>
                {data?.seeProfile?.username}님의 소개글 :{" "}
                <NumberColor
                  style={{ fontSize: 14 }}
                >{`안녕하세요 ${data?.seeProfile?.username}입니다.`}</NumberColor>
              </span>

              <span style={{ color: "silver" }}>
                Good morning. Welcome to {data?.seeProfile?.username}'s
                Instagram profile. Have a good day!
              </span>
            </User>
          </TopBox>

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
    </React.Fragment>
  );
}
