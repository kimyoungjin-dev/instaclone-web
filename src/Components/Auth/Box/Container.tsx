import styled from "styled-components";
import { ChilrenProps } from "../../interface";

const SContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

export default function Container({ children }: ChilrenProps) {
  return (
    <SContainer>
      <Wrapper>{children}</Wrapper>
    </SContainer>
  );
}
