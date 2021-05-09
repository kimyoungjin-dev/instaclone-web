import { BiUserCircle } from "react-icons/bi";
import styled from "styled-components";

const SAvatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  background-color: black;
`;

const Img = styled.img`
  max-width: 100%;
`;
//기본적으로 user아이콘을 보여주고, 만약 url이 존재한다면 header컴포넌트로 부터 url 을 받는다.
export default function Avatar({ url = "" }) {
  return <SAvatar>{url === "" ? <BiUserCircle /> : <Img src={url} />}</SAvatar>;
}
