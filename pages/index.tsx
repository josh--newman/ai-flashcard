import styles from "./index.module.css";
import { GetServerSideProps } from "next";
import { add } from "date-fns";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { auth } from "../utils/auth";
import CardForm from "../components/CardForm";
import NumberBox from "../components/NumberBox";
import { serializedObject } from "../utils/seralizedObject";
import UpcomingReviews from "../components/UpcomingReviews";
import { UpcomingReview } from "../types";

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

  const [lessonsCount, reviewsCount, upcomingReviews] = await Promise.all([
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
    prisma.assignment.groupBy({
      by: ["availableAt"],
      where: {
        Card: {
          User: {
            email: session.user.email,
          },
        },
        availableAt: {
          gte: new Date(),
          lte: add(new Date(), { days: 2 }),
        },
      },
      _count: {
        availableAt: true,
      },
      orderBy: {
        availableAt: "asc",
      },
    }),
  ]);

  return {
    props: {
      lessonsCount,
      reviewsCount,
      upcomingReviews: serializedObject(upcomingReviews),
    },
  };
};

interface Props {
  lessonsCount: number;
  reviewsCount: number;
  upcomingReviews: UpcomingReview[];
}

const Homepage = (props: Props) => {
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
        <section className={styles.dashboardItemsContainer}>
          <UpcomingReviews reviewCounts={props.upcomingReviews} />
        </section>
        <section>
          <CardForm />
        </section>
      </main>
    </Layout>
  );
};

export default Homepage;
