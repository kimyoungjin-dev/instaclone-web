import styled from "styled-components";

interface IProps {
  value: string;
  type: string;
}

const SButton = styled.input`
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
`;

const Button: React.FC<IProps> = (props) => {
  return <SButton {...props} />;
};

export default Button;
