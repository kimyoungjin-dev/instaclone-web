import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { me, me_me } from "../../__generated__/me";
import { isLoggedInVar, logUserOut } from "../Apollo";

//"사용자가 맞는지" 확인하는 me query를 백앤드로부터 불러온다.
const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;
export default function useUser() {
  //isToken : token이 존재하는지 확인 /Boolean
  const isToken = useReactiveVar(isLoggedInVar);
  //data: me{username, avatar} 형태
  //skip: user가 token===null이면 query를 건너뛴다.
  const { data } = useQuery<me, me_me>(ME_QUERY, {
    skip: !isToken,
  });
  //컴포넌트가 마운트 될때, 만약 me가 null 인 경우라면 로그아웃을 해버린다.의존성 배열에는 data를 넣어준다.
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);

  return { data };
}
