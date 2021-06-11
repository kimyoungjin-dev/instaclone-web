import styled from "styled-components";
import { ChilrenProps } from "../../InterFace/PropsInterFace";
import { BaseBox } from "../../SharedStyles";

const Container = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 40px 25px 40px;
  margin-bottom: 10px;
`;

const Text = styled.h1`
  font-size: 30px;
  font-family: "Caveat Brush", cursive;
  margin-bottom: 18px;
`;

export default function TopBox({ children }: ChilrenProps) {
  return (
    <Container>
      <Text>Instagram</Text>
      {children}
    </Container>
  );
}
