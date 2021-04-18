import React from "react";
import { darkModeVar } from "../Components/Apollo";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
`;

const Login = () => {
  return (
    <Container>
      <h1>Login</h1>
      <button onClick={() => darkModeVar(true)}>다크모드</button>
      <button onClick={() => darkModeVar(false)}>화이트모드</button>
    </Container>
  );
};

export default Login;
