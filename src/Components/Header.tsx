import styled from "styled-components";
import { AiFillHome, AiOutlineCompass, AiOutlineHeart } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";

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
  span {
    font-size: 25px;
    font-family: "Caveat Brush", cursive;
  }
`;

const Icon = styled.span`
  margin-left: 25px;
`;

export default function Header() {
  return (
    <Container>
      <Wrapper>
        <Column>
          <span>Instaram</span>
        </Column>
        <Column>
          <Icon>
            <AiFillHome size={20} />
          </Icon>

          <Icon>
            <HiOutlinePaperAirplane size={20} />
          </Icon>

          <Icon>
            <AiOutlineCompass size={20} />
          </Icon>

          <Icon>
            <AiOutlineHeart size={20} />
          </Icon>

          <Icon>
            <BiUserCircle size={20} />
          </Icon>
        </Column>
      </Wrapper>
    </Container>
  );
}
