import { useQuery } from "@apollo/client";
import Photo from "../Components/Feed/Photo";
import PageTitle from "../Components/PageTitle";
import { FEED_QUERY } from "../Fragments";
import { seeFeed, seeFeedVariables } from "../__generated__/seeFeed";
import styled from "styled-components";
import DarkModeContainer from "../Components/DarkModeContainer";
import { isLoggedInVar } from "../Components/Apollo";

const Cotainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

//seeFeed 외에 변수가 있는경우에만 <seeFeed , "">추가로 써준다.
export default function Home() {
  const isLoggedIn = isLoggedInVar();
  const { data } = useQuery<seeFeed, seeFeedVariables>(FEED_QUERY, {
    variables: {
      page: 1,
    },
  });

  return (
    <Cotainer>
      <PageTitle title="Home" />
      {isLoggedIn ? (
        <div>
          <DarkModeContainer />
          {data?.seeFeed?.map((photo) => (
            <Photo key={photo?.id} {...photo!} />
          ))}
        </div>
      ) : (
        <div>
          <span>로그인을 다시 해주세요</span>
        </div>
      )}
    </Cotainer>
  );
}
