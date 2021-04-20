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

export default function SignUp() {
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

        <Form>
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Email" />
          <Input type="text" placeholder="UserName" />
          <Input type="password" placeholder="Password" />
          <SubmitButton type="submit">로그인</SubmitButton>
        </Form>
        <AgreeText>
          가입하면 Instagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.
        </AgreeText>
      </TopBox>
      <BottomBox text="Have an account?" linkText="Login" link={routes.home} />
    </Container>
  );
}
