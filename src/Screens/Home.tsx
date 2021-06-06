import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "../Components/Fragment";
import Avatar from "../Components/Avatar";
import { seeFeed } from "../__generated__/seeFeed";
import { FatText } from "../Components/SharedStyles";
import { AiOutlineHeart, AiFillHeart, AiTwotoneMessage } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import Likes from "../Components/Likes/Likes";
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
  console.log(data);
  return (
    <Box>
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo?.id} {...photo!} />
      ))}
    </Box>
  );
}
