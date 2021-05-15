import React from "react";
import { Link } from "react-router-dom";
import { FatText } from "../SharedStyles";
import styled from "styled-components";
import {
  seeFeed_seeFeed,
  seeFeed_seeFeed_user,
} from "../../__generated__/seeFeed";

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

interface UpdatedProps {
  author: seeFeed_seeFeed_user["username"];
  payload: seeFeed_seeFeed["caption"];
}

export default function Comment({ author, payload }: UpdatedProps) {
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
    </CommentContainer>
  );
}
