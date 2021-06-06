import {
  seeFeed_seeFeed_comments,
  seeFeed_seeFeed_comments_user,
} from "../../__generated__/seeFeed";
import styled from "styled-components";
import { FatText } from "../SharedStyles";
import { Link } from "react-router-dom";
import routes from "../../routes";
import React from "react";

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
}

export default function Comment({ author, payload }: CommentProps) {
  return (
    <Container>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload.split(" ").map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link
                to={`/${routes.Hashtag}/${word}`}
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
    </Container>
  );
}
