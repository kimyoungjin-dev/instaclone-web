import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { me, me_me } from "../../__generated__/me";
import { isLoggedInVar } from "../Apollo";

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

export default function useUser() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery<me, me_me>(ME_QUERY, {
    skip: !isLoggedIn,
  });

  console.log(data, error);
  return <div></div>;
}
