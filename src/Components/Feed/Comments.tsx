import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { createCommentVariables } from "../../__generated__/createComment";
import {
  seeFeed_seeFeed,
  seeFeed_seeFeed_user,
} from "../../__generated__/seeFeed";
import Comment from "./Comment";

const CREAT_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
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
  const [createCommentMutation, { loading }] = useMutation(
    CREAT_COMMENT_MUTATION
  );

  const { register, handleSubmit, setValue } = useForm();

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
    //setValue를 이용해서 submit 이후에 input 을 지운다.
    setValue("payload", "");
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
