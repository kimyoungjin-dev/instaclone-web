import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { darkModeClick, darkModeVar, whiteModeClick } from "./Apollo";
import { BsMoon } from "react-icons/bs";
import { BiMoon } from "react-icons/bi";

const Container = styled.div`
  text-align: right;
  font-size: 16px;
  font-weight: bold;
  & svg {
    font-size: 20px;
    margin-right: 10px;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

export default function DarkModeBox() {
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <Container onClick={() => (darkMode ? whiteModeClick() : darkModeClick())}>
      {darkMode ? (
        <Box>
          <BsMoon /> <span>White Mode</span>
        </Box>
      ) : (
        <Box>
          <BiMoon /> <span>Dark Mode</span>
        </Box>
      )}
    </Container>
  );
}
