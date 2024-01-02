import React from "react";
import { GetServerSideProps } from "next";
import { Card as CardType } from "../types";
import Layout from "../components/Layout";
import ReviewContainer from "../components/ReviewContainer";
import prisma from "../lib/prisma";
import { serializedObject } from "../utils/seralizedObject";
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

  const assignments = await prisma.card.findMany({
    where: {
      User: {
        email: session.user.email,
      },
      Assignment: {
        availableAt: {
          lte: new Date(),
        },
      },
    },
    include: {
      Assignment: true,
    },
  });

  return {
    props: {
      reviews: serializedObject(assignments),
    },
  };
};

interface Props {
  reviews: CardType[];
}

const Reviews: React.FC<Props> = (props) => {
  return (
    <Layout noPadding>
      <ReviewContainer cards={props.reviews} />
    </Layout>
  );
};

export default Reviews;
