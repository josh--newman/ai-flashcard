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

  console.log({ currentSeed });
  console.log({ currentIndex });
  console.log({ incompleteCards });

  useEffect(() => {
    if (incompleteCards.length === 0) {
      router.push("/");
    }
  }, [incompleteCards, router]);

  const onGradeCard = useCallback(
    async (success: boolean) => {
      // await gradeAssignment({
      //   assignmentId: currentCard.Assignment.id,
      //   success,
      //   numFailures: !success ? 1 : 0,
      // });
      if (success) {
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
    <div>
      <Card
        key={currentIncompleteCard.id}
        card={currentIncompleteCard}
        onGrade={onGradeCard}
      />
    </div>
  );
};

export default ReviewContainer;