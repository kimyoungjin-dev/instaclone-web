import styled from "styled-components";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import { FatText } from "../SharedStyles";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  font-size: 12px;
  display: block;
  font-weight: 600;
`;

type PhotoPros = Pick<
  seeFeed_seeFeed,
  "user" | "commentNumber" | "comments" | "caption"
>;
//comments는 댓글을 단 유저의 정보를 보여준다.
//user:나자신을 말한다.
//user가 작성한 caption을 말한다.
export default function Comments({
  user,
  commentNumber,
  comments,
  caption,
}: PhotoPros) {
  return (
    //caption:loggendInUser가 작상한 caption
    //comment?.payload!:사진에 유저가 작성한 payload
    <CommentsContainer>
      <Comment user={user} caption={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 Comment" : `${commentNumber} Comments`}
      </CommentCount>

      {comments?.map((comment) => (
        <Comment
          key={comment?.id}
          user={comment?.user!}
          caption={comment?.payload!}
        />
      ))}
    </CommentsContainer>
  );
}
