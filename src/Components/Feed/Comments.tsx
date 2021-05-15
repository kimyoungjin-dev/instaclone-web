import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { createCommentVariables } from "../../__generated__/createComment";
import {
  seeFeed_seeFeed,
  seeFeed_seeFeed_user,
} from "../../__generated__/seeFeed";
import useUser from "../Hooks/useUser";
import Comment from "./Comment";

const CREAT_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  font-size: 12px;
  display: block;
  font-weight: 600;
`;

interface UpdatedProps
  extends Pick<seeFeed_seeFeed, "comments" | "commentNumber" | "caption"> {
  author: seeFeed_seeFeed_user["username"];
  photoId: seeFeed_seeFeed["id"];
}

export default function Comments({
  author,
  commentNumber,
  comments,
  caption,
  photoId,
}: UpdatedProps) {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { data: userData } = useUser();

  const [createCommentMutation, { loading }] = useMutation(
    CREAT_COMMENT_MUTATION,
    {
      update: (cache, result) => {
        //setValue가 getValues보다 앞에 위치한다면 payload:""가되니 주의
        const { payload } = getValues();
        setValue("payload", "");
        if (result.data.createComment.id) {
          const {
            data: {
              createComment: { ok, id },
            },
          } = result;
          if (ok && userData?.me) {
            const newComment = {
              //useUser의 __typenamed을 추가해주어야한다.
              __typename: "Comment",
              createdAt: Date.now() + "",
              id,
              isMine: true,
              payload,
              user: { ...userData?.me },
            };
            // newCacheComment : __ref: "Comment:53"
            //cache 에 comment가 없다면 comment를 지울수 없기 때문에, cache에 comment를 저장하는 것이다.
            const newCacheComment = cache.writeFragment({
              data: newComment,
              fragment: gql`
                fragment BSName on Comment {
                  id
                  createdAt
                  isMine
                  payload
                  user {
                    username
                    avatar
                  }
                }
              `,
            });
            cache.modify({
              //수정할 아이디 : photoId
              //혹여나 :를 붙이는것이 특히 주의해야함
              id: `Photo:${photoId}`,
              //fields object안에 모든 프로퍼티는 fuction형태
              fields: {
                comments(prev) {
                  return [...prev, newCacheComment];
                },

                commentNumber(prev) {
                  return prev + 1;
                },
              },
            });
          }
        }
      },
    }
  );

  //loading? return //!loading :
  const onSubmit: SubmitHandler<createCommentVariables> = (data) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };

  return (
    <CommentsContainer>
      <Comment author={author} payload={caption!} />
      <CommentCount>
        {commentNumber === 1 ? "1 Comment" : `${commentNumber} Comments`}
      </CommentCount>

      {comments?.map((comment) => (
        <Comment
          key={comment?.id}
          author={comment?.user.username!}
          payload={comment?.payload!}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("payload", { required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </div>
    </CommentsContainer>
  );
}
