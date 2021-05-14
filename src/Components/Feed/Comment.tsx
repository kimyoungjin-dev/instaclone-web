import styled from "styled-components";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import { FatText } from "../SharedStyles";

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

type CommentProps = Pick<seeFeed_seeFeed, "user" | "caption">;

export default function Comment({ user, caption }: CommentProps) {
  console.log(caption); //caption user가 작성한 caption 과 && 어떤유저가 작성한 comments 총2개가 하나의 변수로 전달된다.
  return (
    <CommentContainer>
      <FatText>{user.username}</FatText>
      <CommentCaption>{caption}</CommentCaption>
    </CommentContainer>
  );
}
