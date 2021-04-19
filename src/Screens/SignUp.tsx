import AuthLayout from "../Components/Auth/AuthLayout";
import BottomBox from "../Components/Auth/BottomBox";
import TopBox from "../Components/Auth/TopBox";
import Input from "../Components/Auth/Input";
import SubmitButton from "../Components/Auth/SubmitButton";
import routes from "../routes";
import styled from "styled-components";
import { SilverText } from "../Components/SharedStyles";
import PageTitle from "../Components/PageTitle";

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

const SignUp = () => {
  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <TopBox>
        <HeaderContainer>
          <Subtitle>
            Sign up to see photos and videos from your friends
          </Subtitle>
        </HeaderContainer>
        <form>
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Email" />
          <Input type="text" placeholder="UserName" />
          <Input type="password" placeholder="Password" />
          <SubmitButton type="submit" value="Login" />
        </form>
      </TopBox>
      <BottomBox text="Have an account?" linkText="Login" link={routes.home} />
    </AuthLayout>
  );
};
export default SignUp;
