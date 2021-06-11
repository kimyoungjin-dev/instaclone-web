import { createAccountVariables } from "../../__generated__/createAccount";
import { loginVariables } from "../../__generated__/login";

export interface LoginInterFace extends loginVariables {
  resultError: string;
  message: string;
}

export interface SignUpProps extends createAccountVariables {
  createResultError: string;
}
