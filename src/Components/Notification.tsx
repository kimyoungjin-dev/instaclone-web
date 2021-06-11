import styled from "styled-components";
import { MessageProps } from "./InterFace/PropsInterFace";

const Text = styled.span`
  color: blue;
  font-size: 14;
  font-weight: 500;
`;

export default function Notification({ message }: MessageProps) {
  return message === "" || !message ? null : <Text>{message}</Text>;
}
