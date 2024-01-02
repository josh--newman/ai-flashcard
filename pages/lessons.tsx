import React from "react";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { Card as CardType } from "../types";
import { serializedObject } from "../utils/seralizedObject";
import ReviewContainer from "../components/ReviewContainer";
import Layout from "../components/Layout";
import { auth } from "../utils/auth";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await auth(context.req, context.res);

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const lessons = await prisma.card.findMany({
    where: {
      User: {
        email: session.user.email,
      },
      Assignment: {
        started_at: null,
      },
    },
    include: {
      Assignment: true,
    },
  });

  return {
    props: {
      lessons: serializedObject(lessons),
    },
  };
};

type Props = {
  lessons: CardType[];
};

const Lessons: React.FC<Props> = (props) => {
  console.log(props.lessons);
  return (
    <Layout noPadding>
      <ReviewContainer cards={props.lessons} />
    </Layout>
  );
};

export default Lessons;
