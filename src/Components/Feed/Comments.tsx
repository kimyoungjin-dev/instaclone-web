import styled from "styled-components";
import {
  seeFeed_seeFeed,
  seeFeed_seeFeed_user,
} from "../../__generated__/seeFeed";
import { FatText, NumberColor } from "../SharedStyles";

const Container = styled.div`
  margin-top: 10px;
`;

const Comment = styled.div`
  margin-bottom: 15px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

interface NewComments {
  author: seeFeed_seeFeed_user["username"];
  caption: seeFeed_seeFeed["caption"];
  commentNumber: seeFeed_seeFeed["commentNumber"];
  comments: seeFeed_seeFeed["comments"];
}

export default function Comments({
  author,
  caption,
  commentNumber,
  comments,
}: NewComments) {
  return (
    <Container>
      <Comment>
        <FatText>{author}</FatText>
        <CommentCaption>{caption}</CommentCaption>
      </Comment>

      <span>
        {commentNumber === 1 ? (
          <span>
            <NumberColor>1</NumberColor> Comment
          </span>
        ) : (
          `${commentNumber} Comments`
        )}
      </span>

      {comments?.map((comment) => (
        <Comment key={comment?.id}>
          <FatText>{comment?.user.username}</FatText>
          <CommentCaption>{comment?.user.username}</CommentCaption>
        </Comment>
      ))}
    </Container>
  );
}
