import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { SEE_PROFILE_QUERY } from "../Components/Fragment";
import { seeProfile, seeProfileVariables } from "../__generated__/seeProfile";

export default function Profile() {
  const { username } = useParams<seeProfileVariables>();

  const { data } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: {
        username,
      },
    }
  );
  console.log(data);
  return <div></div>;
}
