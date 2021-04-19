import React from "react";
import { Helmet } from "react-helmet-async";

interface IProps {
  title: string;
}

const PageTitle: React.FC<IProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default PageTitle;
