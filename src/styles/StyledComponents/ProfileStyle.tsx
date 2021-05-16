import styled from "styled-components";
import Button from "../../Components/Auth/Box/SubmitButton";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  width: 700px;
`;

export const ProfileContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
`;

export const UserInfoMation = styled.div`
  display: flex;
`;

export const ProfilePhoto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

export const InfoMationBox = styled.div`
  margin-left: 30px;
  line-height: 2;
`;

export const UserName = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

export const FollowBox = styled.div`
  display: flex;
`;

export const Follow = styled.span`
  color: gray;
  opacity: 0.8;
  :not(:first-child) {
    margin-left: 10px;
  }
`;

export const Maintitle = styled.div`
  font-size: 18px;
`;

export const Subtitle = styled.div`
  font-size: 15px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 50px;
  row-gap: 30px;
  column-gap: 20px;
`;

export const Photo = styled.div<{ bg: string | undefined }>`
  position: relative;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bg});
  width: 220px;
  height: 220px;
  border-radius: 3px;
`;

export const Icons = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.4s ease-in-out;
  opacity: 0;
  :hover {
    opacity: 1;
  }
`;

export const Icon = styled.span`
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  svg {
    margin-right: 3px;
  }
`;

export const EditBtn = styled(Button)`
  width: 70px;
  height: 20px;
  margin-left: 5px;
  padding: 3px;
  font-size: 12px;
`;
