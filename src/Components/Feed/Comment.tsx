import sanitizeHtml from "sanitize-html";
import styled from "styled-components";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import { FatText } from "../SharedStyles";

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;

  mark {
    background-color: inherit;
    color: ${(props) => props.theme.loginBtnColor};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

type CommentProps = Pick<seeFeed_seeFeed, "user" | "caption">;
//dangerouslySetInnerHTML: 리액트는 html로 표시되지않도록 방지해주는데 => 이럴경우  텍스트가 아닌 html 로 해석 될수도있도록 만들어준다.
//하지만 이러한 경우에는 모든 html 테그를 유저가 사용할수있기때문에,좋은 방법이 아니다.
//npm i sanitize-html : html 을 청소해준다. (첫번째인자: dirty html 을 넣는다. 2번째인자 : 어떤 html을 통과시키고 말지 알려준다.)

export default function Comment({ user, caption }: CommentProps) {
  const cleanPayload = sanitizeHtml(
    caption?.replace(/#[\w]+/g, "<mark>$&</mark>")!,
    {
      allowedTags: ["mark"],
    }
  );

  return (
    <CommentContainer>
      <FatText>{user.username}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanPayload,
        }}
      />
    </CommentContainer>
  );
}
