import { Link } from "react-router-dom";
import { NumberColor } from "../SharedStyles";
import styled from "styled-components";

interface IProps {
  linkText: string;
  name: string;
  text: string;
}

const Text = styled.span`
  font-size: 12px;
`;

const NewNumberColor = styled(NumberColor)`
  margin-right: 2px;
  color: skyblue;
`;

export default function LikesLink({ linkText, name, text }: IProps) {
  return (
    <Text>
      <Link to={linkText}>
        <NewNumberColor>{name}</NewNumberColor>
      </Link>
      <span>{text}</span>
    </Text>
  );
}
