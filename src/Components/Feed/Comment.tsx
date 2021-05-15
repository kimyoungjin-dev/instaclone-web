import React from "react";
import { Link } from "react-router-dom";
import { FatText } from "../SharedStyles";
import styled from "styled-components";
import {
  seeFeed_seeFeed,
  seeFeed_seeFeed_comments,
  seeFeed_seeFeed_comments_user,
  seeFeed_seeFeed_user,
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

const CommentContainer = styled.div``;

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

interface UpdatedProps
  extends Partial<Pick<seeFeed_seeFeed_comments, "id" | "isMine">> {
  author: seeFeed_seeFeed_comments_user["username"];
  payload: seeFeed_seeFeed_comments["payload"];
  photoId?: seeFeed_seeFeed["id"];
}

export default function Comment({
  author,
  payload,
  id,
  isMine,
  photoId,
}: UpdatedProps) {
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: (cache, result) => {
      const {
        data: {
          deleteComment: { ok },
        },
      } = result;
      if (ok) {
        //id:Comment의 id
        cache.evict({ id: `Comment:${id}` });

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
      <FatText>{author}</FatText>
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
      {isMine ? <button onClick={onDeleteClick}>삭제</button> : null}
    </CommentContainer>
  );
}
