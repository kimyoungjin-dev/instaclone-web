import styled from "styled-components";
import DarkModeContainer from "../../DarkModeContainer";
import { ChilrenProps } from "../../interface";

const SContainer = styled.div`
  display: flex;
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

export default function Container({ children }: ChilrenProps) {
  return (
    <SContainer>
      <Footer>
        <DarkModeContainer />
      </Footer>

      <Wrapper>{children}</Wrapper>
    </SContainer>
  );
}
