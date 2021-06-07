import { useQuery } from "@apollo/client";
import { SEE_HASH_TAGS } from "../Fragment";

export default function Hashtag() {
  const { data } = useQuery(SEE_HASH_TAGS);
  return <div>Hashtag</div>;
}
