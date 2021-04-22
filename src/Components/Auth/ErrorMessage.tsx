import styled from "styled-components";

interface IProps {
  message?: string;
}

const Message = styled.span`
  color: red;
  font-size: 10px;
  margin: 5px 0px;
`;

export default function ErrorMessage({ message }: IProps) {
  return message === "" || !message ? null : <Message>{message}</Message>;
}
