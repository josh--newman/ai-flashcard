import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import Card from "./Card";
import { Card as CardType } from "../types";

interface Props {
  cards: CardType[];
}

const ReviewContainer: FC<Props> = ({ cards }) => {
  const router = useRouter();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const currentCard =
    currentCardIndex < cards.length ? cards[currentCardIndex] : null;

  useEffect(() => {
    if (currentCard === null) {
      router.push("/");
    }
  }, [currentCard, router]);

  const onGradeCard = () => {
    setCurrentCardIndex((current) => current + 1);
  };

  if (currentCard === null) {
    return null;
  }

  return (
    <div>
      <Card key={currentCard.id} card={currentCard} onGrade={onGradeCard} />
    </div>
  );
};

export default ReviewContainer;
