import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { me } from "../../__generated__/me";
import { isLoggedInVar, logUserOut } from "../Apollo";
import { ME_QUERY } from "../Fragment";

export default function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<me>(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);

  return { data };
}
