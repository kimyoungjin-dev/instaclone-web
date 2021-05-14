import styled from "styled-components";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import { FatText } from "../SharedStyles";

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

type CommentProps = Pick<seeFeed_seeFeed, "user" | "caption">;

export default function Comment({ user, caption }: CommentProps) {
  return (
    <CommentContainer>
      <FatText>{user.username}</FatText>
      <CommentCaption>{caption}</CommentCaption>
    </CommentContainer>
  );
}
