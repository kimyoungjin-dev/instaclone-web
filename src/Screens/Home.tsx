import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "../Components/Fragment";
import { seeFeed } from "../__generated__/seeFeed";
import Photo from "../Components/Comment_Photo/Photo";
import React, { useState } from "react";
import { defaultFlexBox } from "../Components/SharedStyles";

const Box = styled(defaultFlexBox)`
  flex-direction: column;
`;

const PageNation = styled(defaultFlexBox)`
  flex-direction: column;
`;

const PageError = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
  color: tomato;
`;

const PageText = styled.span`
  cursor: pointer;
  font-weight: bold;
`;

export default function Home() {
  const [offset, setOffset] = useState(1);

  const { data } = useQuery<seeFeed>(FEED_QUERY, {
    variables: {
      offset,
    },
  });

  const nextPage = () => {
    setOffset((offset) =>
      data?.seeFeed?.length !== 0 ? offset + 1 : offset - 1
    );
  };

  const prevPage = () => {
    setOffset((offset) => offset - 1);
  };

  const firstPage = () => {
    setOffset((offset) => (offset = 1));
  };

  return (
    <>
      <Box>
        {data?.seeFeed?.map((photo) => (
          <Photo key={photo?.id} {...photo!} />
        ))}
      </Box>
      <PageNation>
        {data?.seeFeed?.length === 0 ? (
          <React.Fragment>
            <PageError>더이상 페이지가 존재하지 않습니다.</PageError>
            <PageText onClick={firstPage} style={{ marginBottom: 30 }}>
              처음페이지로 돌아가기
            </PageText>
          </React.Fragment>
        ) : null}

        <div style={{ paddingBottom: 30 }}>
          <PageText onClick={prevPage} style={{ marginRight: 20 }}>
            이전 페이지로
          </PageText>

          <PageText onClick={nextPage}>
            {data?.seeFeed?.length === 0 ? null : "다음 페이지로"}
          </PageText>
        </div>
      </PageNation>
    </>
  );
}
