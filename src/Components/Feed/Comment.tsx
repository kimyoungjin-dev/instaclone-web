import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import { FatText } from "../SharedStyles";

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

type CommentProps = Pick<seeFeed_seeFeed, "user" | "caption">;

export default function Comment({ user, caption }: CommentProps) {
  return (
    <CommentContainer>
      <FatText>{user.username}</FatText>
      <CommentCaption>
        {caption?.split(" ").map((item, index) =>
          /#[\w]+/.test(item) ? (
            <React.Fragment key={index}>
              <Link to={`hashtag${item}`}>{item}</Link>{" "}
            </React.Fragment>
          ) : (
            <>
              <React.Fragment key={index}>{item}</React.Fragment>{" "}
            </>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
}
