import { useReactiveVar } from "@apollo/client";

import styled from "styled-components";
import { RiSunCloudyLine } from "react-icons/ri";
import { GiMoonBats } from "react-icons/gi";
import { darkModeClick, darkModeVar, whiteModeClick } from "./Apollo";

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const SDarkModeContainer = styled.div`
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

export default function DarkModeContainer() {
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <Div>
      <SDarkModeContainer onClick={darkMode ? whiteModeClick : darkModeClick}>
        <DarkModeText>{darkMode ? "White Mode" : "Dark Mode"}</DarkModeText>
        <DarkModeBtn>
          {darkMode ? <RiSunCloudyLine /> : <GiMoonBats />}
        </DarkModeBtn>
      </SDarkModeContainer>
    </Div>
  );
}
