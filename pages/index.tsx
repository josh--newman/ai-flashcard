import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const decksData = await prisma.deck.findMany();
  const decks = decksData.map((d) => {
    return {
      ...d,
      updatedAt: d.updatedAt.toISOString(),
      createdAt: d.createdAt.toISOString(),
    };
  });
  return {
    props: { decks },
    revalidate: 10,
  };
};

type Props = {
  decks: any;
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Decks</h1>
        <main>
          {props.decks.map((d) => (
            <p>{d.name}</p>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
