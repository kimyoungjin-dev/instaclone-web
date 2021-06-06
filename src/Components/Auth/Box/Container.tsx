import styled from "styled-components";
import { ChilrenProps } from "../../interface";
import DarkModeBox from "./DarkModeBox";

const SContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

export default function Container({ children }: ChilrenProps) {
  return (
    <SContainer>
      <div>
        <DarkModeBox />
      </div>
      <Wrapper>{children}</Wrapper>
    </SContainer>
  );
}
