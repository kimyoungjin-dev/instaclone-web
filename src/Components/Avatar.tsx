import { BiUserCircle } from "react-icons/bi";
import styled from "styled-components";

interface IProps {
  lg: boolean;
  url: string | undefined;
}

const SAvatar = styled.div<{ lg: boolean }>`
  width: ${(props) => (props.lg ? "35px" : "26px")};
  height: ${(props) => (props.lg ? "35x" : "23px")};
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  height: 35px;
  border-radius: 100%;
`;
//기본적으로 user아이콘을 보여주고, 만약 url이 존재한다면 header컴포넌트로 부터 url 을 받는다.
export default function Avatar({ url = "", lg = false }: IProps) {
  return (
    <SAvatar lg={lg}>
      {url === "" ? <BiUserCircle /> : <Img src={url} />}
    </SAvatar>
  );
}
