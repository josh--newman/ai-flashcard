import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { auth } from "../utils/auth";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await auth(context.req, context.res);

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

type CardFormProps = {
  onDone: () => void;
};

const CardForm: React.FC<CardFormProps> = ({ onDone }) => {
  const [front, setFront] = React.useState("");
  const [back, setBack] = React.useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const body = { front, back };
      await fetch("/api/card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.error(e);
    } finally {
      onDone();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="front">Front</label>
      <br />
      <textarea
        onChange={(e) => setFront(e.target.value)}
        name="front"
        id="front"
      />
      <br />
      <label htmlFor="back">Back</label>
      <br />
      <textarea
        onChange={(e) => setBack(e.target.value)}
        name="back"
        id="back"
      />
      <br />
      <button disabled={!front || !back} type="submit">
        Submit
      </button>
    </form>
  );
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
