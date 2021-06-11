import styled from "styled-components";
import { defaultFlexBox } from "../../SharedStyles";

interface IProps {
  smallMargin: boolean;
}

const SSeparator = styled(defaultFlexBox)<IProps>`
  margin: 20px 0px ${(props) => (props.smallMargin ? "0" : "30px")} 0px;
  text-transform: uppercase;
  width: 100%;
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    color: #8e8e8e;
  }
`;

export default function Separator({ smallMargin }: IProps) {
  return (
    <SSeparator smallMargin={smallMargin}>
      <div></div>
      <span>Or</span>
      <div></div>
    </SSeparator>
  );
}
