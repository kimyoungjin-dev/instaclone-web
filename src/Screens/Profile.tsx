import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { SEE_PROFILE_QUERY } from "../Components/Fragment";
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
import { bgProps } from "../Components/interface";
import { NumberColor } from "../Components/SharedStyles";
import PageTitle from "../Components/PageTitle";
import {
  unfollowUser,
  unfollowUserVariables,
} from "../__generated__/unfollowUser";
import { followUser, followUserVariables } from "../__generated__/followUser";
import useUser from "../Components/Hooks/useUser";
import { logUserOut } from "../Components/Apollo";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 30px;
`;

const Top = styled.div`
  display: flex;
  margin-bottom: 100px;
  border-bottom: 0.3px solid rgba(0, 0, 0, 0.5);
  padding-bottom: 30px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100%;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  line-height: 2;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  grid-auto-rows: 300px;
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

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.6s ease-in-out;
  :hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  color: white;
  margin-right: 10px;

  & svg {
    margin-left: 5px;
  }
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
`;

//mutation
const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
      error
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
    }
  }
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
  console.log(userData);
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
              unfollowUser: { ok, error },
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
    if (isFollowing) {
      return <Button onClick={() => unfollowMutation()}>unFollowing</Button>;
    } else {
      return <Button onClick={() => followMutation()}>Following</Button>;
    }
  };

  return (
    <Container>
      <PageTitle title={`${data?.seeProfile?.username}님의 프로필`} />
      <Top>
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
            YoungJin Should work!
          </span>

          <span style={{ color: "silver" }}>
            Good morning. Welcome to {data?.seeProfile?.username}'s Instagram
            profile. Have a good day!
          </span>
        </User>
      </Top>

      <span style={{ fontSize: 30, fontWeight: "bold", marginBottom: 30 }}>
        My Photos
      </span>

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
  );
}
