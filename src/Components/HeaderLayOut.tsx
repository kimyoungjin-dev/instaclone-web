import React from "react";
import styled from "styled-components";
import Header from "./Header";

interface IProps {
  children: React.ReactNode;
}

const Content = styled.div`
  max-width: 930px;
  width: 100%;
  margin: 45px auto 0 auto;
`;

export default function HeaderLayOut({ children }: IProps) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}
