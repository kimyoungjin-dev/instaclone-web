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
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../Components/Auth/ErrorMessage";
import Form from "../Components/Auth/Box/Form";
import { FacebookLogin, ForgotPassword } from "../Components/Auth/Remainder";
import { gql, useMutation } from "@apollo/client";
import { login, loginVariables } from "../__generated__/login";
import { logUserIn } from "../Components/Apollo";
import { useLocation } from "react-router-dom";
import Notification from "../Components/Auth/Login/Notification";
import { LoginInterFace } from "../Components/Auth/Login/LoginInterface";

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
  const location = useLocation<LoginInterFace>();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm<LoginInterFace>({
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
        if (token) return logUserIn(token);
      },
    }
  );

  const onSubmit: SubmitHandler<loginVariables> = (data) => {
    if (loading) return;
    login({
      variables: {
        ...data,
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
        <Notification message={location?.state?.message} />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("username", {
              required: "아이디는 필수 입력조건 입니다.",
              minLength: {
                value: 1,
                message: "아이디는 최소한 1글자 이상이어야 합니다.",
              },
              validate: (): any => {
                if (errors.resultError) {
                  clearLoginError();
                  trigger();
                }
              },
            })}
            defaultValue={location?.state?.username}
            type="text"
            placeholder="전화번호, 사용자 이름 또는 이메일"
            hasError={Boolean(errors?.username?.message)}
          />
          <ErrorMessage message={errors?.username?.message} />

          <Input
            defaultValue={location?.state?.password}
            {...register("password", {
              validate: (): any => {
                if (errors.resultError) {
                  clearLoginError();
                  trigger();
                }
              },

              required: "비밀번호는 필수 입력조건 입니다.",
              minLength: {
                value: 4,
                message: "비밀번호는 4글자 이상 15글자 미만이어야 합니다.",
              },
              maxLength: {
                value: 15,
                message: "비밀번호는 5글자 이상 15글자 미만이어야 합니다.",
              },
            })}
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
          />
          <ErrorMessage message={errors?.password?.message} />

          <SubmitButton type="submit" disabled={!isValid || loading}>
            {loading ? "Loading" : "로그인"}
          </SubmitButton>
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

// {...register('username', {
//   required: 'Username is required',
//   minLength: {
//   value: 5,
//   message: 'Username should be logner than 5 chars',
//   },
//   validate: () => {
//   if (errors.result) {
//   clearErrors('result');
//   trigger();
//   }
//   },
//   })}
//   name="username"
//   type="text"
//   placeholder="Username"
//   hasError={Boolean(errors?.username?.message)}
//   />
