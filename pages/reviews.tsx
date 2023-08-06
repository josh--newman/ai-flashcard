import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Card } from "@prisma/client";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { serializedObject } from "../utils/seralizedObject";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

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
