import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../Apollo";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { iconArray } from "./IconData";
import useUser from "../Hooks/useUser";

const Container = styled.div`
  border-bottom: 0.5px solid ${(props) => props.theme.silverColor};
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  h1 {
    font-size: 25px;
    font-family: "Caveat Brush", cursive;
  }
`;

const Button = styled.span`
  padding: 5px;
  background-color: ${(props) => props.theme.loginBtnColor};
  color: white;
  font-weight: 600;
  font-size: 14px;
  border-radius: 3px;
`;

const Icon = styled.span`
  margin-left: 25px;
  font-size: 20px;
`;

export default function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const loggedInUser = useUser();

  return (
    <Container>
      <Wrapper>
        <Column>
          <h1>Instaram</h1>
        </Column>
        <Column>
          {isLoggedIn ? (
            <>
              {iconArray.map((icon, index) => (
                <Icon key={index}>
                  <icon.name />
                </Icon>
              ))}
            </>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </Container>
  );
}
