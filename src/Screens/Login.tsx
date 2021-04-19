import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../Components/Auth/AuthLayout";
import BottomBox from "../Components/Auth/BottomBox";
import TopBox from "../Components/Auth/TopBox";
import Input from "../Components/Auth/Input";
import Separator from "../Components/Auth/Separator";
import SubmitButton from "../Components/Auth/SubmitButton";
import routes from "../routes";
import PageTitle from "../Components/PageTitle";
import { useForm } from "react-hook-form";
import ErrorMessage from "../Components/Auth/ErrorMessage";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

interface IForm {
  username: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    mode: "onChange",
  });

  const onValid = (data: any) => console.log(data);

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <TopBox>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("username", {
              required: true,
              minLength: {
                value: 5,
                message: "Email or ID must be at least 5 characters long",
              },
            })}
            type="text"
            placeholder="UserName or Email"
            hasError={Boolean(errors?.username?.message)}
          />
          <ErrorMessage message={errors?.username?.message} />
          <Input
            {...register("password", {
              required: true,
              minLength: {
                value: 10,
                message: "Password must be at least 10 characters long.",
              },
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <ErrorMessage message={errors?.username?.message} />
          <SubmitButton type="submit" value="Log in" disabled={!isValid} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </TopBox>
      <BottomBox
        text="Don`t have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}
