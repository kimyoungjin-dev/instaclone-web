import { useParams } from "react-router";

export default function Profile() {
  const params = useParams();
  console.log(params);
  return <div>Profile</div>;
}
