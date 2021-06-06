import styled from "styled-components";
import { MessageProps } from "../interface";

const Message = styled.span`
  color: red;
  font-size: 10px;
  margin: 5px 0px;
`;

export default function ErrorMessage({ message }: MessageProps) {
  return message === "" || !message ? null : <Message>{message}</Message>;
}
