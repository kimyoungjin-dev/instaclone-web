import styled from "styled-components";
import { ChilrenProps } from "../../InterFace/PropsInterFace";
import { defaultFlexBox } from "../../SharedStyles";

const SContainer = styled(defaultFlexBox)`
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
      <Wrapper>{children}</Wrapper>
    </SContainer>
  );
}
