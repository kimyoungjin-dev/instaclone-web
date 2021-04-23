import styled from "styled-components";

interface IProps {
  message: string;
}

const Text = styled.span`
  color: blue;
  font-size: 14;
  font-weight: 500;
`;

export default function Notification({ message }: IProps) {
  return message === "" || !message ? null : <Text>{message}</Text>;
}
