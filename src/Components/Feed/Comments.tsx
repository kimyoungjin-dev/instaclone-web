import React from "react";
import styled from "styled-components";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import { FatText } from "../SharedStyles";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const Comment = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
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

export default function Comments({
  user,
  commentNumber,
  comments,
  caption,
}: PhotoPros) {
  return (
    <CommentsContainer>
      <Comment>
        <FatText>{user.username}</FatText>
        <CommentCaption>{caption}</CommentCaption>
      </Comment>

      <CommentCount>
        {commentNumber === 1 ? "1 Comment" : `${commentNumber} Comments`}
      </CommentCount>

      {comments?.map((comment) => (
        <Comment key={comment?.id}>
          <FatText>{comment?.user.username}</FatText>
        </Comment>
      ))}
    </CommentsContainer>
  );
}
