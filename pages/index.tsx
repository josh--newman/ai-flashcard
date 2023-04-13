import React from "react";
import { GetServerSideProps } from "next";
import { Prisma } from "@prisma/client";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  let cardsData = await prisma.card.findMany({
    where: {
      User: {
        email: session.user.email,
      },
    },
  });

  const cards = cardsData.map((card) => ({
    ...card,
    createdAt: card.createdAt.toISOString(),
    updatedAt: card.updatedAt.toISOString(),
  }));

  return {
    props: { cards },
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
  cards: Prisma.CardGetPayload<true>[];
};

const Homepage: React.FC<Props> = (props) => {
  const [showForm, setShowForm] = React.useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <Layout>
      <div className="page">
        <h1>Cards</h1>
        <main>
          {showForm ? (
            <CardForm onDone={toggleForm} />
          ) : (
            <button onClick={toggleForm}>+ Add</button>
          )}
          {props.cards.map((card) => (
            <p key={card.id}>{card.front}</p>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Homepage;
