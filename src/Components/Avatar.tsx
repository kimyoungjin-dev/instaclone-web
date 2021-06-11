import styled from "styled-components";
import { ImageProps } from "../Components/InterFace/PropsInterFace";

const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
`;

export default function Avatar({ url }: ImageProps) {
  return url === "" ? null : <Image src={url} />;
}
