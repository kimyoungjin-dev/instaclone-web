import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../Components/Login_SignUp/Login_SignUp_ShardBox/Container";
import BottomBox from "../Components/Login_SignUp/Login_SignUp_ShardBox/BottomBox";
import TopBox from "../Components/Login_SignUp/Login_SignUp_ShardBox/TopBox";
import Input from "../Components/Login_SignUp/Login_SignUp_ShardBox/Input";
import Separator from "../Components/Login_SignUp/Login_SignUp_ShardBox/Separator";
import SubmitButton from "../Components/Login_SignUp/Login_SignUp_ShardBox/SubmitButton";
import routes from "../routes";
import PageTitle from "../Components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../Components/Login_SignUp/Login_SignUp_ShardBox/ErrorMessage";
import {
  FacebookLogin,
  ForgotPassword,
} from "../Components/Login_SignUp/Login_SignUp_Styles/Remainder";
import { useMutation } from "@apollo/client";
import { login, loginVariables } from "../__generated__/login";
import { logUserIn } from "../Components/Apollo";
import { useLocation } from "react-router-dom";
import Notification from "../Components/Notification";
import { LOGIN_MUTATION } from "../Components/Fragment";
import { Form } from "../Components/Login_SignUp/Login_SignUp_ShardBox/Form";
import { LoginInterFace } from "../Components/InterFace/ExtendsInterFace";

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
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });

  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted: (data) => {
        const {
          login: { ok, error, token },
        } = data;
        if (!ok) {
          setError("resultError", {
            message: error || undefined,
          });
        }
        if (token) {
          logUserIn(token);
        }
      },
    }
  );

  const onSubmit: SubmitHandler<loginVariables> = (data) => {
    if (loading) {
      return;
    }

    login({
      variables: {
        ...data,
      },
    });
  };

  return (
    <Container>
      <PageTitle title="Login" />

      <TopBox>
        <Notification message={location?.state?.message} />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("username", {
              required: "???????????? ?????? ???????????? ?????????.",
              minLength: {
                value: 4,
                message: "???????????? ????????? 4?????? ??????????????? ?????????.",
              },
              validate: (): any => {
                if (errors.resultError) {
                  clearErrors("resultError");
                  trigger();
                }
              },
            })}
            type="text"
            placeholder="????????????, ????????? ?????? ?????? ?????????"
            hasError={Boolean(errors?.username?.message)}
          />
          <ErrorMessage message={errors?.username?.message} />

          <Input
            {...register("password", {
              validate: (): any => {
                if (errors.resultError) {
                  clearErrors("resultError");
                  trigger();
                }
              },
              required: "??????????????? ?????? ???????????? ?????????.",
              minLength: {
                value: 4,
                message: "??????????????? 4?????? ?????? ????????? ?????????.",
              },
            })}
            type="password"
            placeholder="????????????"
            hasError={Boolean(errors?.password?.message)}
          />
          <ErrorMessage message={errors?.password?.message} />

          <SubmitButton type="submit" disabled={!isValid || loading}>
            {loading ? "Loading" : "?????????"}
          </SubmitButton>
          <ErrorMessage message={errors?.resultError?.message} />
        </Form>

        <Separator smallMargin={false} />

        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebook?????? ?????????</span>
        </FacebookLogin>

        <ForgotPassword>??????????????? ????????????????</ForgotPassword>
      </TopBox>
      <BottomBox
        text="????????? ????????????????"
        linkText="Sign up"
        link={routes.signUp}
      />
    </Container>
  );
}
