import { logUserOut } from "../Components/Apollo";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logUserOut()}>로그아웃</button>
    </div>
  );
}
