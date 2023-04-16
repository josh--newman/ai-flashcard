import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

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
      lessons: lessons.map((lesson) => ({
        ...lesson,
        createdAt: lesson.createdAt.toISOString(),
        updatedAt: lesson.updatedAt.toISOString(),
        Assignment: {
          ...lesson.Assignment,
          createdAt: lesson.Assignment.createdAt.toISOString(),
          updatedAt: lesson.Assignment.updatedAt.toISOString(),
        },
      })),
    },
  };
};

type Props = {
  lessons: any;
};

const Lessons: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <main>
          <h1>Lessons</h1>
          <p>New cards get reviewed here.</p>
        </main>
      </div>
    </Layout>
  );
};

export default Lessons;
