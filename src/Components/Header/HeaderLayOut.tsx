import styled from "styled-components";
import Header from "./Header";
import { ChilrenProps } from "../interface";
import DarkModeBox from "../Auth/Box/DarkModeBox";

const Content = styled.div`
  max-width: 930px;
  width: 100%;
  margin: 45px auto 0 auto;
`;

export default function HeaderLayOut({ children }: ChilrenProps) {
  return (
    <>
      <Header />

      <Content>
        <DarkModeBox />
      </Content>

      <Content>{children}</Content>
    </>
  );
}
