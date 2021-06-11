import styled from "styled-components";
import { ChilrenProps } from "../InterFace/PropsInterFace";

const STopBox = styled.div`
  display: flex;
  margin-bottom: 100px;
  border-bottom: 0.3px solid rgba(0, 0, 0, 0.5);
  padding-bottom: 30px;
`;

export default function TopBox({ children }: ChilrenProps) {
  return <STopBox>{children}</STopBox>;
}
