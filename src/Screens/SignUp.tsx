import {
  AgreeText,
  HeaderContainer,
  Subtitle,
} from "../Components/Auth/SignUp/SignUpStyles";
import Container from "../Components/Auth/Box/Container";
import BottomBox from "../Components/Auth/Box/BottomBox";
import TopBox from "../Components/Auth/Box/TopBox";
import Input from "../Components/Auth/Box/Input";
import SubmitButton from "../Components/Auth/Box/SubmitButton";
import routes from "../routes";
import PageTitle from "../Components/PageTitle";
import Form from "../Components/Auth/Box/Form";
import Separator from "../Components/Auth/Separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";
import ErrorMessage from "../Components/Auth/ErrorMessage";
import { useHistory } from "react-router-dom";
import { CREATE_ACCOUNT_MUTATION } from "../Components/Auth/SignUp/SignUpMutation";
import { IForm } from "../Components/Auth/SignUp/SignUpInterface";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { errors, isValid },
  } = useForm<IForm>({
    mode: "onChange",
  });

  const history = useHistory();
  const [createAccount, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted: (data) => {
      const { username, password } = getValues();
      const {
        createAccount: { ok, error },
      } = data;
      if (!ok) {
        return setError("createResultError", {
          message: error || undefined,
        });
      }
      return history.push(routes.home, {
        message: "계정이 생성되었습니다. 로그인을 해주세요",
        username,
        password,
      });
    },
  });

  const onSubmit = (data: IForm) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  // const clearCreateError = () => {
  //   clearErrors("createResultError");
  // };

  console.log(errors);
  return (
    <Container>
      <PageTitle title="Sign Up" />
      <TopBox>
        <HeaderContainer>
          <Subtitle>
            Sign up to see photos and videos from your friends
          </Subtitle>

          <Form>
            <SubmitButton type="submit">
              <FontAwesomeIcon
                icon={faFacebookSquare}
                style={{ marginRight: 5 }}
              />
              Facebook으로 로그인
            </SubmitButton>
          </Form>

          <Separator smallMargin={true} />
        </HeaderContainer>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("firstName", {
              required: "성 은 필수 입력내용 입니다.",
            })}
            type="text"
            placeholder="성"
            hasError={Boolean(errors?.firstName?.message)}
          />
          <ErrorMessage message={errors?.firstName?.message} />

          <Input {...register("lastName")} type="text" placeholder="이름" />

          <Input
            {...register("email", {
              required: "이메일은 필수 입력내용 입니다.",
              minLength: {
                value: 5,
                message:
                  "이메일 형식은@를 포함하고 5글자를 이상 이어야 합니다.",
              },
              validate: (value) => value.includes("@"),
            })}
            type="text"
            placeholder="Email"
            hasError={Boolean(errors?.email?.message)}
          />
          {errors?.email?.type === "validate" && (
            <ErrorMessage message="이메일 형식은 @를 포함해야 합니다." />
          )}
          <ErrorMessage message={errors?.email?.message} />

          <Input
            {...register("username", {
              required: "닉네임은 필수 입력내용 입니다.",
              minLength: {
                value: 1,
                message: "아이디는 최소한 1글자 이상이어야 합니다.",
              },
            })}
            type="text"
            placeholder="닉네임"
            hasError={Boolean(errors?.username?.message)}
          />
          <ErrorMessage message={errors?.username?.message} />

          <Input
            {...register("password", {
              required: "비밀번호는 필수 입력내용 입니다.",
              minLength: {
                value: 4,
                message: "비밀번호는 4글자 이상 15글자 미만이어야 합니다.",
              },
              maxLength: {
                value: 15,
                message: "비밀번호는 4글자 이상 15글자 미만이어야 합니다.",
              },
            })}
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
          />
          <ErrorMessage message={errors?.password?.message} />

          <SubmitButton type="submit" disabled={!isValid || loading}>
            {loading ? "...Loading" : "회원가입"}
          </SubmitButton>
          <ErrorMessage message={errors?.createResultError?.message} />
        </Form>
        <AgreeText>
          가입하면 Instagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.
        </AgreeText>
      </TopBox>
      <BottomBox
        text="계정이 존재합니까?"
        linkText="로그인"
        link={routes.home}
      />
    </Container>
  );
}
