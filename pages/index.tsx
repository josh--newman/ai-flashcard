import React from "react";
import { GetServerSideProps } from "next";
import { Prisma } from "@prisma/client";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const cards = await prisma.card.findMany({
    where: {
      User: {
        email: session.user.email,
      },
    },
  });

  return {
    props: { cards },
  };
};

type Props = {
  cards: Prisma.CardGetPayload<true>[];
};

const Homepage: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Cards</h1>
        <main>
          {props.cards.map((card) => (
            <p key={card.id}>{card.front}</p>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Homepage;
