import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { auth } from "../utils/auth";
import CardForm from "../components/CardForm";

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

  const [lessonsCount, reviewsCount] = await Promise.all([
    prisma.assignment.count({
      where: {
        Card: {
          User: {
            email: session.user.email,
          },
        },
        started_at: null,
      },
    }),
    prisma.assignment.count({
      where: {
        Card: {
          User: {
            email: session.user.email,
          },
        },
        availableAt: {
          lte: new Date(),
        },
      },
    }),
  ]);

  return {
    props: { lessonsCount, reviewsCount },
  };
};

type Props = {
  lessonsCount: number;
  reviewsCount: number;
};

const Homepage: React.FC<Props> = (props) => {
  const [showForm, setShowForm] = React.useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <Layout>
      <div className="page">
        <main>
          {showForm ? (
            <CardForm onDone={toggleForm} />
          ) : (
            <button onClick={toggleForm}>+ Add</button>
          )}

          <h2>Lessons</h2>
          <p>
            <Link href="/lessons">{props.lessonsCount}</Link>
          </p>
          <h2>Reviews</h2>
          <p>
            <Link href="/reviews">{props.reviewsCount}</Link>
          </p>
        </main>
      </div>
    </Layout>
  );
};

export default Homepage;
