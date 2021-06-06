import styled from "styled-components";
import { ImageProps } from "./interface";

const Image = styled.img`
  width: 23px;
  height: 23px;
  border-radius: 100%;
`;

export default function Avatar({ url }: ImageProps) {
  return url === "" ? null : <Image src={url} />;
}
