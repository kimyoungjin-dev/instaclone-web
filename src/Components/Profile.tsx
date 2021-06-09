import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { SEE_PROFILE_QUERY } from "../Components/Fragment";
import { seeProfile, seeProfileVariables } from "../__generated__/seeProfile";
import styled from "styled-components";
import { NumberColor } from "../Components/SharedStyles";
import {
  AiFillHeart,
  AiFillMessage,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";

interface IProps {
  bg?: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
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
  grid-auto-rows: 300px; //?
`;

const Photo = styled.div<IProps>`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
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

export default function Profile() {
  const { username } = useParams<seeProfileVariables>();

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
      <Top>
        <Image src={data?.seeProfile?.avatar || undefined} />

        <User>
          <span style={{ fontWeight: "bold", fontSize: 30 }}>
            {data?.seeProfile?.username}
          </span>

          <div>
            <span style={{ marginRight: 20 }}>
              <NumberColor>{data?.seeProfile?.totalFollowers}</NumberColor>
              Followers
            </span>

            <span>
              <NumberColor>{data?.seeProfile?.totalFollowing}</NumberColor>
              Following
            </span>
          </div>

          <span style={{ fontSize: 20, fontWeight: "bold" }}>
            YoungJin Should work!
          </span>

          <span>Super excite!!</span>
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
