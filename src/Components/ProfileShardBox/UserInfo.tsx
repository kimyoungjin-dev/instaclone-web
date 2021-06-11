import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  followUser,
  followUserVariables,
} from "../../__generated__/followUser";
import {
  seeProfile,
  seeProfileVariables,
  seeProfile_seeProfile,
} from "../../__generated__/seeProfile";
import {
  unfollowUser,
  unfollowUserVariables,
} from "../../__generated__/unfollowUser";
import { logUserOut } from "../Apollo";
import {
  SEE_PROFILE_QUERY,
  UNFOLLOW_USER_MUTATION,
  FOLLOW_USER_MUTATION,
} from "../Fragment";
import useUser from "../Hooks/useUser";
import { NumberColor } from "../SharedStyles";
import { Image } from "./ProfileStyles/Image";
import TopBox from "./TopBox";
import User from "./User";

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

export default function UserInfo() {
  const { username } = useParams<seeProfileVariables>();

  const { data } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: {
        username,
      },
    }
  );

  const { data: userData } = useUser();

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
    <TopBox>
      <Image src={data?.seeProfile?.avatar || undefined} />

      <User>
        <UserName_Btn>
          <span>{data?.seeProfile?.username}</span>
          {data?.seeProfile && getButton(data.seeProfile)}
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

        <span style={{ fontSize: 20, fontWeight: "bold" }}>
          `${data?.seeProfile?.username}` Should work!
        </span>

        <span style={{ color: "silver" }}>
          Good morning. Welcome to {data?.seeProfile?.username}'s Instagram
          profile. Have a good day!
        </span>
      </User>
    </TopBox>
  );
}
