import Container from "../Components/Login_SignUp/Login_SignUp_ShardBox/Container";
import BottomBox from "../Components/Login_SignUp/Login_SignUp_ShardBox/BottomBox";
import TopBox from "../Components/Login_SignUp/Login_SignUp_ShardBox/TopBox";
import Input from "../Components/Login_SignUp/Login_SignUp_ShardBox/Input";
import SubmitButton from "../Components/Login_SignUp/Login_SignUp_ShardBox/SubmitButton";
import routes from "../routes";
import PageTitle from "../Components/PageTitle";
import { Form } from "../Components/Login_SignUp/Login_SignUp_ShardBox/Form";
import Separator from "../Components/Login_SignUp/Login_SignUp_ShardBox/Separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";
import ErrorMessage from "../Components/Login_SignUp/Login_SignUp_ShardBox/ErrorMessage";
import { useHistory } from "react-router-dom";
import { CREATE_ACCOUNT_MUTATION } from "../Components/Fragment";
import { SignUpProps } from "../Components/InterFace/ExtendsInterFace";

import styled from "styled-components";
import { SilverText } from "../Components/SharedStyles";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Subtitle = styled(SilverText)`
  text-align: center;
  font-size: 14px;
`;

const AgreeText = styled.span`
  color: ${(props) => props.theme.silverColor};
  font-size: 12px;
  margin-top: 20px;
  text-align: center;
`;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm<SignUpProps>({
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
        setError("createResultError", {
          message: error || undefined,
        });
      }
      history.push(routes.home, {
        message: "계정이 생성되었습니다. 로그인을 해주세요",
        username,
        password,
      });
    },
  });

  const onSubmit: SubmitHandler<createAccountVariables> = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
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
            {...register("firstName", {
              required: "(성) 은 필수 입력내용 입니다.",
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
            })}
            type="email"
            placeholder="Email"
            hasError={Boolean(errors?.email?.message)}
          />
          <ErrorMessage message={errors?.email?.message} />

          <Input
            {...register("username", {
              required: "닉네임은 필수 사항 입니다.",
              validate: (): any => {
                if (errors.createResultError) {
                  clearErrors("createResultError");
                  trigger();
                }
              },
              minLength: {
                value: 4,
                message: "아이디는 최소한 4글자 이상이어야 합니다.",
              },
            })}
            type="text"
            placeholder="User Name"
            hasError={Boolean(errors?.username?.message)}
          />
          <ErrorMessage message={errors?.username?.message} />

          <Input
            {...register("password", {
              required: "비밀번호는 필수 입력사항 입니다.",
              validate: (): any => {
                if (errors.createResultError) {
                  clearErrors("createResultError");
                  trigger();
                }
              },

              minLength: {
                value: 4,
                message: "비밀번호는 4글자 이상 이어야 합니다.",
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
        text="계정이 이미 존재하시나요?"
        linkText="로그인"
        link={routes.home}
      />
    </Container>
  );
}
