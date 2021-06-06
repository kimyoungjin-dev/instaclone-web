import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "../Components/Fragment";
import { seeFeed } from "../__generated__/seeFeed";
import Photo from "../Components/Feed/Photo";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function Home() {
  const { data } = useQuery<seeFeed>(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });

  return (
    <Box>
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo?.id} {...photo!} />
      ))}
    </Box>
  );
}
