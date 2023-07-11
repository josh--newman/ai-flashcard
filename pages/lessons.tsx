import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { getSession } from "next-auth/react";
import { Assignment, Card } from "@prisma/client";
import { serializedObject } from "../utils/seralizedObject";

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
      lessons: serializedObject(lessons),
    },
  };
};

type Lesson = Card & {
  Assignment: Assignment;
};

type Props = {
  lessons: Lesson[];
};

const Lessons: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <main>
          <h1>Lessons</h1>
          {props.lessons.map((lesson) => (
            <div key={lesson.id}>
              <div>{lesson.front}</div>
              <div>{lesson.back}</div>
              <div>{lesson.Assignment.createdAt as unknown as string}</div>
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Lessons;
