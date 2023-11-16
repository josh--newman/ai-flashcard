import styles from "./index.module.css";
import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { auth } from "../utils/auth";
import CardForm from "../components/CardForm";
import NumberBox from "../components/NumberBox";

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
    <Layout withNav>
      <main>
        <section className={styles.dashboardItemsContainer}>
          <NumberBox
            title="Lessons"
            count={props.lessonsCount}
            href="/lessons"
          />
          <NumberBox
            title="Reviews"
            count={props.reviewsCount}
            href="/reviews"
          />
        </section>
        <section>
          {showForm ? (
            <CardForm onDone={toggleForm} />
          ) : (
            <button onClick={toggleForm}>+ Add</button>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default Homepage;
