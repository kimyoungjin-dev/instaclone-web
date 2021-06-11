import styled from "styled-components";
import { bgProps, ProfilePhoto } from "../InterFace/PropsInterFace";

const SPhoto = styled.div<bgProps>`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
  border-radius: 8px;
  :hover {
    filter: brightness(0.6);
  }
`;

export default function Photo({ children, bg }: ProfilePhoto) {
  return <SPhoto bg={bg}>{children}</SPhoto>;
}
