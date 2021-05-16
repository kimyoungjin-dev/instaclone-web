import styled from "styled-components";
import { FatText } from "../../Components/SharedStyles";

export const PhotoContainer = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;

export const PhotoHeader = styled.div`
  padding: 15px 10px;
  display: flex;
  align-items: center;
`;

export const UserName = styled(FatText)`
  margin-left: 10px;
`;

export const PhotoFile = styled.img`
  width: 100%;
`;

export const PhotoData = styled.div`
  padding: 15px;
`;

export const PhotoActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
`;

export const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

export const Likes = styled(FatText)`
  display: block;
  margin-top: 10px;
`;