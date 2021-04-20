import styled from "styled-components";

const Button = styled.button`
  outline: none;
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  border-radius: 2px;
  transition: 0.8s ease-in-out;
  cursor: pointer;
`;

export default Button;
