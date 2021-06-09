import React from "react";
import { createAccountVariables } from "../__generated__/createAccount";
import { loginVariables } from "../__generated__/login";

export interface ChilrenProps {
  children: React.ReactNode;
}

export interface MessageProps {
  message?: string;
}

export interface LoginInterFace extends loginVariables {
  resultError: string;
  message: string;
}

export interface SignUpProps extends createAccountVariables {
  createResultError: string;
}

export interface ImageProps {
  url: string | undefined;
}

export interface bgProps {
  bg?: string;
}
