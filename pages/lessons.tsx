import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import { Card } from "../types";
import { serializedObject } from "../utils/seralizedObject";
import ReviewContainer from "../components/ReviewContainer";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

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
  lessons: Card[];
};

const Lessons: React.FC<Props> = (props) => {
  return <ReviewContainer cards={props.lessons} />;
};

export default Lessons;
