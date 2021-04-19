import styled from "styled-components";

interface IProps {
  message?: string;
}

const Message = styled.span`
  color: silver;
  font-size: 12px;
  font-weight: bold;
  margin: 5px 0px;
`;

export default function ErrorMessage({ message }: IProps) {
  return message === "" || !message ? null : <Message>{message}</Message>;
}
