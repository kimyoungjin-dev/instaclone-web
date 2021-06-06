import styled from "styled-components";
import {
  seeFeed_seeFeed,
  seeFeed_seeFeed_user,
} from "../../__generated__/seeFeed";
import { NumberColor } from "../SharedStyles";
import Comment from "./Comment";

const Container = styled.div`
  margin-top: 10px;
`;

const CommentTotal = styled.span`
  display: block;
  margin-bottom: 10px;
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
      <Comment author={author!} payload={caption!} />

      <CommentTotal>
        {commentNumber === 1 ? (
          <span>
            <NumberColor>1</NumberColor> Comment
          </span>
        ) : (
          `${commentNumber} Comments`
        )}
      </CommentTotal>

      {comments?.map((comment) => (
        <Comment
          key={comment?.id}
          author={comment?.user.username!}
          payload={comment?.payload!}
        />
      ))}
    </Container>
  );
}
