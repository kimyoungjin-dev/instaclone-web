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
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";
import ErrorMessage from "../Components/Auth/ErrorMessage";
import { useHistory } from "react-router";

interface IForm {
  username: string;
  password: string;
  firstName: string;
  lastName?: string;
  email: string;
  createResultError: string;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function SignUp() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const [createAccount, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted: (data) => {
      const {
        createAccount: { ok, error },
      } = data;
      if (!ok) {
        //에러메시지를 출력합니다.
        setError("createResultError", {
          message: error || undefined,
        });
        //홈으로 돌려보냅니다.
        history.push(routes.home);
      }
    },
  });

  //loading중이면 return=>중단 // createAccount를 호출해서 getvaluse()와 일치시킵니다.
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
            {...register("firstName", { required: "First Name is required" })}
            type="text"
            placeholder="성"
            hasError={Boolean(errors?.firstName?.message)}
          />
          <ErrorMessage message={errors?.firstName?.message} />

          <Input {...register("lastName")} type="text" placeholder="이름" />

          <Input
            {...register("email", {
              required: "email is required",
              validate: (value) => value.includes("@"),
            })}
            type="text"
            placeholder="Email"
            hasError={Boolean(errors?.email?.message)}
          />
          <ErrorMessage message={errors?.email?.message} />

          <Input
            {...register("username", { required: "username is required" })}
            type="text"
            placeholder="닉네임"
            hasError={Boolean(errors?.username?.message)}
          />
          <ErrorMessage message={errors?.username?.message} />

          <Input
            {...register("password", { required: "password is required" })}
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
          />
          <ErrorMessage message={errors?.password?.message} />

          <SubmitButton type="submit">회원가입</SubmitButton>
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
