import styled from "styled-components";
import { ChilrenProps } from "../InterFace/PropsInterFace";

const SUser = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  line-height: 2;
`;

export default function User({ children }: ChilrenProps) {
  return <SUser>{children}</SUser>;
}
