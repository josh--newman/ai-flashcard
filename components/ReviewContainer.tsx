import styles from "./ReviewContainer.module.css";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import Card from "./Card";
import { Card as CardType } from "../types";
import gradeAssignment from "../lib/gradeAssignment";
import randomInRange from "../utils/randomInRange";

interface CardStatus {
  cardId: string;
  numFailures: number;
  success: boolean;
}

interface Props {
  cards: CardType[];
}

const ReviewContainer: FC<Props> = ({ cards }) => {
  const router = useRouter();

  const [reviewStack, setReviewStack] = useState<CardStatus[]>(
    cards.map((card) => ({
      cardId: card.id,
      numFailures: 0,
      success: false,
    }))
  );

  const incompleteCards = reviewStack.filter((c) => !c.success);
  const [currentSeed, setCurrentSeed] = useState(0);
  const currentIndex = randomInRange(
    0,
    incompleteCards.length - 1,
    currentSeed
  );
  const currentIncompleteCard =
    incompleteCards.length > 0
      ? cards.find((c) => c.id === incompleteCards[currentIndex].cardId)
      : null;

  useEffect(() => {
    if (incompleteCards.length === 0) {
      router.push("/");
    }
  }, [incompleteCards, router]);

  const onGradeCard = useCallback(
    async (success: boolean) => {
      if (success) {
        const cardFailures = incompleteCards[currentIndex].numFailures;

        await gradeAssignment({
          assignmentId: currentIncompleteCard.Assignment.id,
          success: cardFailures > 0 ? false : true,
          numFailures: cardFailures,
        });

        setReviewStack((prev) => {
          return prev.map((card) => {
            if (card.cardId === currentIncompleteCard.id) {
              return {
                ...card,
                success: true,
              };
            }
            return card;
          });
        });
      } else {
        setReviewStack((prev) => {
          return prev.map((card) => {
            if (card.cardId === currentIncompleteCard.id) {
              return {
                ...card,
                numFailures: card.numFailures + 1,
              };
            }
            return card;
          });
        });
      }

      setCurrentSeed(currentSeed + 1);
    },
    [currentSeed, currentIndex]
  );

  if (currentIncompleteCard === null) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Card key={currentIncompleteCard.id} card={currentIncompleteCard} />
      <div className={styles.buttonContainer}>
        <button onClick={() => onGradeCard(false)}>❌</button>
        <button onClick={() => onGradeCard(true)}>✅</button>
      </div>
    </div>
  );
};

export default ReviewContainer;
