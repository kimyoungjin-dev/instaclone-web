import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../SharedStyles";

interface IProps {
  text: string;
  link: string;
  linkText: string;
}

const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
  }
`;

export default function BottomBox({ text, link, linkText }: IProps) {
  return (
    <SBottomBox>
      <span>{text}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
}
