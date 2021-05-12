import styled from "styled-components";

interface IProps {
  hasError?: boolean;
}

const Input = styled.input<IProps>`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  margin-top: 5px;
  box-sizing: border-box;
  transition: 0.6s ease-in-out;
  color: black;
  border: 0.5px solid
    ${(props) => (props.hasError ? "red" : props.theme.borderColor)};
  &::placeholder {
    font-size: 12px;
  }
`;

export default Input;
