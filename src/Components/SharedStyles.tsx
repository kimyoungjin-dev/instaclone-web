import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const SilverText = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const FatText = styled.span`
  font-weight: 600;
`;

export const NumberColor = styled.span`
  color: tomato;
`;

export const defaultFlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
