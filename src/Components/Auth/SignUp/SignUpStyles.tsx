import styled from "styled-components";
import { SilverText } from "../../SharedStyles";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const Subtitle = styled(SilverText)`
  text-align: center;
  font-size: 14px;
`;

export const AgreeText = styled.span`
  color: ${(props) => props.theme.silverColor};
  font-size: 12px;
  margin-top: 20px;
  text-align: center;
`;
