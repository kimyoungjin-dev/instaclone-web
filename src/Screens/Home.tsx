import { logUserOut } from "../Components/Apollo";
import styled from "styled-components";

const Box = styled.div`
  text-align: right;
`;

export default function Home() {
  return (
    <Box>
      <button onClick={() => logUserOut()}>log out</button>
    </Box>
  );
}
