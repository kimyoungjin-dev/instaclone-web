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
import { login, loginVariables } from "../__generated__/login";

interface IForm {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}
const SIGNUP_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String
    $email: String!
  ) {
    login(
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      ok
      error
    }
  }
`;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IForm>({
    mode: "onChange",
  });

  const [createAccount, { loading }] = useMutation<login, loginVariables>(
    SIGNUP_MUTATION,
    {
      onCompleted: (data) => {},
    }
  );

  const onSubmit = () => {
    const { username, password, email, firstName, lastName } = getValues();

    if (loading) {
      return;
    }
    createAccount({
      variables: {
        username,
        password,
        email,
        firstName,
        lastName,
      },
    });
  };

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
            placeholder="First Name"
          />
          <Input
            {...register("lastName")}
            type="text"
            placeholder="last Name"
          />
          <Input
            {...register("email", { required: "email is required" })}
            type="text"
            placeholder="Email"
          />
          <Input
            {...register("username", { required: "username is required" })}
            type="text"
            placeholder="User Name"
          />
          <Input
            {...register("password", { required: "password is required" })}
            type="password"
            placeholder="Password"
          />
          <SubmitButton type="submit">회원가입</SubmitButton>
        </Form>
        <AgreeText>
          가입하면 Instagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.
        </AgreeText>
      </TopBox>
      <BottomBox text="Have an account?" linkText="Login" link={routes.home} />
    </Container>
  );
}
