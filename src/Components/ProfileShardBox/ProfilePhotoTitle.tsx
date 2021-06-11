import styled from "styled-components";

interface IProps {
  isOpacity?: boolean;
  title?: string;
}

const Text = styled.span<IProps>`
  font-size: 30px;
  margin-bottom: 30px;
  font-weight: bold;
  opacity: ${(props) => (props.isOpacity ? 0.6 : 1)};
`;

export default function ProfilePhotoTitle({ title, isOpacity }: IProps) {
  return <Text isOpacity={isOpacity}>{title}</Text>;
}
