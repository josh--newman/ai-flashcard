import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {},
  };
};

type Props = {};

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
