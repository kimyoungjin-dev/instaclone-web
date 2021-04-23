import styled from "styled-components";
import { ChilrenProps } from "../../interface";
import { BaseBox } from "../../SharedStyles";

const Container = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 40px 25px 40px;
  margin-bottom: 10px;
`;

const Text = styled.h1`
  font-size: 30px;
  font-family: "Caveat Brush", cursive;
  margin-bottom: 18px;
`;

export default function TopBox({ children }: ChilrenProps) {
  return (
    <Container>
      <Text>Instagram</Text>
      {children}
    </Container>
  );
}

// import styled from "styled-components";
// import { BaseBox } from "../SharedStyles";

// interface IProps {
//   children: React.ReactNode;
// }

// const Container = styled(BaseBox)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   padding: 35px 40px 25px 40px;
//   margin-bottom: 10px;
//   form {
//     margin-top: 35px;
//     width: 100%;
//     display: flex;
//     justify-items: center;
//     flex-direction: column;
//     align-items: center;
//   }
// `;

// const Text = styled.h1`
//   font-size: 45px;
//   font-family: "Caveat Brush", cursive;
// `;

// const TopBox: React.FC<IProps> = ({ children }) => {
//   return (
//     <Container>
//       <Text>Instagram</Text>
//       {children}
//     </Container>
//   );
// };
// export default TopBox;
