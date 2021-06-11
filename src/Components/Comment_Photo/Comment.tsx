import {
  seeFeed_seeFeed,
  seeFeed_seeFeed_comments,
  seeFeed_seeFeed_comments_user,
} from "../../__generated__/seeFeed";
import styled from "styled-components";
import { FatText } from "../SharedStyles";
import { Link } from "react-router-dom";
import routes from "../../routes";
import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT } from "../Fragment";
import { CommentFragment } from "../../__generated__/CommentFragment";
import {
  deleteComment,
  deleteCommentVariables,
} from "../../__generated__/deleteComment";

const Container = styled.div`
  margin-bottom: 15px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  color: silver;
`;

interface CommentProps {
  author: seeFeed_seeFeed_comments_user["username"];
  payload: seeFeed_seeFeed_comments["payload"];
  commentId?: CommentFragment["id"];
  isMine?: CommentFragment["isMine"];
  commentNumber?: seeFeed_seeFeed["commentNumber"];
  photoId?: seeFeed_seeFeed["id"];
}

const DeleteBtn = styled.span`
  color: skyblue;
  cursor: pointer;
  font-size: 12px;
`;

export default function Comment({
  author,
  payload,
  commentId,
  isMine,
  photoId,
}: CommentProps) {
  const [deleteComment] = useMutation<deleteComment, deleteCommentVariables>(
    DELETE_COMMENT,
    {
      variables: {
        id: commentId!,
      },
      update: (cache, result) => {
        if (result.data?.deleteComment) {
          const {
            data: {
              deleteComment: { ok },
            },
          } = result;
          if (ok) {
            cache.evict({
              id: `Comment:${commentId}`,
            });
            cache.modify({
              id: `Photo:${photoId}`,
              fields: {
                commentNumber(prev) {
                  return prev - 1;
                },
              },
            });
          }
        }
      },
    }
  );

  const removeShop = (word: string) => {
    var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    console.log(word);
    return regExp.test(word) ? word.replace(regExp, "") : word;
  };

  return (
    <Container>
      <Link to={`${routes.Profile}/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CommentCaption>
        {payload.split(" ").map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link
                to={`${routes.Hashtags}/${removeShop(word)}`}
                style={{ color: "tomato" }}
              >
                {word}
              </Link>{" "}
            </React.Fragment>
          ) : (
            <span key={index}>{word} </span>
          )
        )}
      </CommentCaption>
      {isMine ? (
        <DeleteBtn onClick={() => deleteComment()}>삭제</DeleteBtn>
      ) : null}
    </Container>
  );
}
