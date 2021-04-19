import styled from "styled-components";

interface IProps {
  children: React.ReactNode;
}

const Container = styled.div`
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

export default function AuthLayout({ children }: IProps) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}
