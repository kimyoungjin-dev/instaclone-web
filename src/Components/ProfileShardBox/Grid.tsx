import styled from "styled-components";
import { ChilrenProps } from "../InterFace/PropsInterFace";

const SGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  grid-auto-rows: 300px;
  width: 100%;
`;

export default function Grid({ children }: ChilrenProps) {
  return <SGrid>{children}</SGrid>;
}
