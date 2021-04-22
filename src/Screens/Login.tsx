import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../Components/Auth/Box/Container";
import BottomBox from "../Components/Auth/Box/BottomBox";
import TopBox from "../Components/Auth/Box/TopBox";
import Input from "../Components/Auth/Box/Input";
import Separator from "../Components/Auth/Separator";
import SubmitButton from "../Components/Auth/Box/SubmitButton";
import routes from "../routes";
import PageTitle from "../Components/PageTitle";
import { useForm } from "react-hook-form";
import ErrorMessage from "../Components/Auth/ErrorMessage";
import Form from "../Components/Auth/Box/Form";
import { FacebookLogin, ForgotPassword } from "../Components/Auth/Remainder";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { login, loginVariables } from "../__generated__/login";
import { logUserIn } from "../Components/Apollo";

interface IForm {
  username: string;
  password: string;
  resultError: string;
}

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

export default function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<IForm>({
    mode: "onChange",
  });

  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted: (data) => {
        const {
          login: { ok, error, token },
        } = data;
        if (!ok) {
          return setError("resultError", {
            message: error || undefined,
          });
        }
        if (token) {
          logUserIn(token);
        }
      },
    }
  );

  const onSubmit = () => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };

  const clearLoginError = () => {
    clearErrors("resultError");
  };

  return (
    <Container>
      <PageTitle title="Login" />
      <TopBox>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("username", {
              required: true,
              minLength: {
                value: 4,
                message: "아이디는 4글자 이상이어야 합니다.",
              },
            })}
            type="text"
            placeholder="전화번호, 사용자 이름 또는 이메일"
            hasError={Boolean(errors?.username?.message)}
            onChange={clearLoginError}
          />
          <ErrorMessage message={errors?.username?.message} />

          <Input
            {...register("password", {
              required: true,
              minLength: {
                value: 4,
                message: "비밀번호는 4글자 이상이어야 합니다.",
              },
            })}
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
            onChange={clearLoginError}
          />
          <ErrorMessage message={errors?.password?.message} />

          <SubmitButton
            type="submit"
            value={loading ? "Loading" : "Log in"}
            disabled={!isValid || loading}
          />
          <ErrorMessage message={errors?.resultError?.message} />
        </Form>

        <Separator smallMargin={false} />

        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebook으로 로그인</span>
        </FacebookLogin>
        <ForgotPassword>비밀번호를 잊으셨나요?</ForgotPassword>
      </TopBox>
      <BottomBox
        text="계정이 없으신가요?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </Container>
  );
}
