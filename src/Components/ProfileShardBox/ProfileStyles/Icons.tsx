import styled from "styled-components";

export const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.6s ease-in-out;
  :hover {
    opacity: 1;
  }
`;
