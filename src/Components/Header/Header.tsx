import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../Apollo";
import { Link } from "react-router-dom";
import routes from "../../routes";
import useUser from "../Hooks/useUser";
import {
  AiFillHome,
  AiOutlineCompass,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";

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
    cursor: pointer;
  }
`;

const Button = styled.span`
  padding: 8px;
  background-color: ${(props) => props.theme.loginBtnColor};
  color: white;
  font-weight: 600;
  font-size: 13px;
  border-radius: 3px;
`;

const Icon = styled.span`
  margin-left: 25px;
  font-size: 20px;
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();

  return (
    <Container>
      <Wrapper>
        <Column>
          <Link to={routes.home}>
            <h1>Instaram</h1>
          </Link>
        </Column>

        <Column>
          {isLoggedIn ? (
            <IconContainer>
              <Link to={routes.home}>
                <Icon>
                  <AiFillHome />
                </Icon>
              </Link>

              <Icon>
                <HiOutlinePaperAirplane />
              </Icon>

              <Icon>
                <AiOutlineCompass />
              </Icon>

              <Icon>
                <AiOutlineHeart />
              </Icon>

              <Icon>
                <AiOutlineUser />
              </Icon>
            </IconContainer>
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
