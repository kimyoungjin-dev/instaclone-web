import React from "react";
import { Link } from "react-router-dom";
import { FatText } from "../SharedStyles";
import styled from "styled-components";
import {
  seeFeed_seeFeed,
  seeFeed_seeFeed_comments,
  seeFeed_seeFeed_comments_user,
} from "../../__generated__/seeFeed";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  :not(:first-child) {
    margin-bottom: 10px;
  }
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.loginBtnColor};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  all: unset;
  opacity: 0.9;
  color: gray;
  font-size: 13px;
  margin-left: 5px;
  cursor: pointer;
`;

interface UpdatedProps {
  photoId?: seeFeed_seeFeed["id"];
  payload: seeFeed_seeFeed_comments["payload"];
  isMine?: seeFeed_seeFeed_comments["isMine"];
  author: seeFeed_seeFeed_comments_user["username"];
  commentId?: seeFeed_seeFeed_comments["id"];
}

export default function Comment({
  author,
  payload,
  commentId,
  isMine,
  photoId,
}: UpdatedProps) {
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id: commentId,
    },
    update: (cache, result) => {
      const {
        data: {
          deleteComment: { ok },
        },
      } = result;
      if (ok) {
        //id:Comment의 id
        cache.evict({ id: `Comment:${commentId}` });

        //id:Photo의id
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            commentNumber(prev) {
              return prev - 1;
            },
          },
        });
      }
    },
  });

  const onDeleteClick = () => {
    deleteCommentMutation();
  };

  return (
    <CommentContainer>
      <Link to={`users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CommentCaption>
        {payload?.split(" ").map((item, index) =>
          /#[\w]+/.test(item) ? (
            <React.Fragment key={index}>
              <Link to={`hashtag${item}`}>{item}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{item} </React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? <Button onClick={onDeleteClick}>삭제</Button> : null}
    </CommentContainer>
  );
}
