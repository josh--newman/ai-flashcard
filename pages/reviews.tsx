import React from "react";
import { GetServerSideProps } from "next";
import { Card } from "@prisma/client";
import Layout from "../components/Layout";
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
  reviews: Card[];
}

const Reviews: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <main>
          <h1>Reviews</h1>
        </main>
      </div>
    </Layout>
  );
};

export default Reviews;
