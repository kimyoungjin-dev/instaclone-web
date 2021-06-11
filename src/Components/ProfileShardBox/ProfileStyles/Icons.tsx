import styled from "styled-components";
import { defaultFlexBox } from "../../SharedStyles";

export const Icons = styled(defaultFlexBox)`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.6s ease-in-out;
  :hover {
    opacity: 1;
  }
`;
