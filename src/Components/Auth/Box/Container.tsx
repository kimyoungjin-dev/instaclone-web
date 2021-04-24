import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { darkModeClick, darkModeVar, whiteModeClick } from "../../Apollo";
import { ChilrenProps } from "../../interface";
import { RiSunCloudyLine } from "react-icons/ri";
import { GiMoonBats } from "react-icons/gi";

const SContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 30px;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.div`
  margin-bottom: 10px;
  max-width: 350px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const DarkModeContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DarkModeBtn = styled.span`
  font-size: 16px;
`;

const DarkModeText = styled.span`
  font-size: 16px;
  margin-right: 5px;
  font-weight: 500;
  font-family: "Orelega One", cursive;
`;

export default function Container({ children }: ChilrenProps) {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <SContainer>
      <Footer>
        <DarkModeContainer onClick={darkMode ? whiteModeClick : darkModeClick}>
          <DarkModeText>{darkMode ? "White Mode" : "Dark Mode"}</DarkModeText>
          <DarkModeBtn>
            {darkMode ? <RiSunCloudyLine /> : <GiMoonBats />}
          </DarkModeBtn>
        </DarkModeContainer>
      </Footer>

      <Wrapper>{children}</Wrapper>
    </SContainer>
  );
}
