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

const Container = styled.div`
  padding-bottom: 30px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin-right: 50px;
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
`;

const UserDataBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const TotalLikes = styled.span`
  margin-right: 8px;
`;

//BottomBox

const Photo = styled.div<bgProps>`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
  border-radius: 8px;
  :hover {
    filter: brightness(0.6);
  }
`;

const BottomBox = styled.div``;

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
      <TopBox>
        <Image src={data?.seeProfile?.avatar || undefined} />
        <UserDataBox>
          <UserName>{data?.seeProfile?.username}</UserName>
          <div>
            <TotalLikes>내가 좋아요를 누른 사진의 수</TotalLikes>
            <NumberColor>{data?.seeProfile?.totalLikes}</NumberColor>
          </div>
        </UserDataBox>
      </TopBox>
      <BottomBox>
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
      </BottomBox>
    </Container>
  );
}
