import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import styled from "styled-components";
import {
  createComment,
  createCommentVariables,
} from "../../__generated__/createComment";
import {
  seeFeed_seeFeed,
  seeFeed_seeFeed_user,
} from "../../__generated__/seeFeed";
import { CREATE_COMMENT_MUTATION } from "../Fragment";
import useUser from "../Hooks/useUser";
import { NumberColor } from "../SharedStyles";
import Comment from "./Comment";

const Container = styled.div`
  margin-top: 10px;
`;

const CommentTotal = styled.div`
  display: block;
  margin-bottom: 10px;
`;

interface CommentsProps {
  author: seeFeed_seeFeed_user["username"];
  caption: seeFeed_seeFeed["caption"];
  commentNumber: seeFeed_seeFeed["commentNumber"];
  comments: seeFeed_seeFeed["comments"];
  photoId: seeFeed_seeFeed["id"];
}

export default function Comments({
  author,
  caption,
  commentNumber,
  comments,
  photoId,
}: CommentsProps) {
  const [showComment, setShowComment] = useState(false);
  const toggleComment = () => setShowComment((prev) => !prev);

  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();

  const [createCommentMutation, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT_MUTATION, {
    update: (cache, result) => {
      const { payload } = getValues();
      setValue("payload", "");

      if (result.data?.createComment) {
        const {
          data: {
            createComment: { ok, id },
          },
        } = result;
        //new comments
        if (ok && userData?.me) {
          const newComment = {
            __typename: "Comment",
            id,
            payload,
            createdAt: Date.now(),
            isMine: true,
            user: {
              ...userData.me,
            },
          };
          const newCacheComments = cache.writeFragment({
            data: newComment,
            fragment: gql`
              fragment CommentFragment on Comment {
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
            id: `Photo:${photoId}`,
            fields: {
              comments(prev) {
                return [...prev, newCacheComments];
              },
              commentNumber(prev) {
                return prev + 1;
              },
            },
          });
        }
      }
    },
  });

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
    <Container>
      <Comment author={author!} payload={caption!} />

      <div style={{ marginBottom: 10 }}>
        {showComment ? (
          <CommentTotal onClick={toggleComment} style={{ cursor: "pointer" }}>
            {commentNumber === 1 ? (
              <span>
                <NumberColor>1</NumberColor> Comment
              </span>
            ) : (
              `${commentNumber} Comments`
            )}
            <BiUpArrow size={12} style={{ marginLeft: 5 }} />
          </CommentTotal>
        ) : (
          <div onClick={toggleComment} style={{ cursor: "pointer" }}>
            <span style={{ marginRight: 5 }}>Comment</span>
            <BiDownArrow size={12} />
          </div>
        )}
      </div>

      {showComment &&
        comments?.map((comment) => (
          <Comment
            key={comment?.id}
            author={comment?.user.username!}
            payload={comment?.payload!}
            commentId={comment?.id!}
            isMine={comment?.isMine!}
            photoId={photoId}
          />
        ))}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Write Your Comment..."
            {...register("payload", { required: true })}
          />
        </form>
      </div>
    </Container>
  );
}
