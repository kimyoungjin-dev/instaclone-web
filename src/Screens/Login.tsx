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

  const onValid = (data: IForm) => console.log(data);

  return (
    <Container>
      <PageTitle title="Login" />
      <TopBox>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("username", {
              required: true,
              minLength: {
                value: 5,
                message: "아이디는 10글자 이상이어야 합니다.",
              },
            })}
            type="text"
            placeholder="전화번호, 사용자 이름 또는 이메일"
            hasError={Boolean(errors?.username?.message)}
          />
          <ErrorMessage message={errors?.username?.message} />

          <Input
            {...register("password", {
              required: true,
              minLength: {
                value: 10,
                message: "비밀번호는 10글자 이상이어야 합니다.",
              },
            })}
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
          />
          <ErrorMessage message={errors?.password?.message} />

          <SubmitButton type="submit" disabled={!isValid}>
            로그인
          </SubmitButton>
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
