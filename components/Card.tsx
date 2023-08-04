import { FC, useState } from "react";
import { Card as CardType } from "../types";

type Props = {
  card: CardType;
  onGrade: () => void;
};

type CardSide = "front" | "back";

const Card: FC<Props> = ({ card, onGrade }) => {
  const [currentSide, setCurrentSide] = useState<CardSide>("front");

  return currentSide === "front" ? (
    <div onClick={() => setCurrentSide("back")}>
      <div>{card.front}</div>
    </div>
  ) : (
    <div>
      <div>{card.back}</div>
      <button onClick={onGrade}>❌</button>
      <button onClick={onGrade}>✅</button>
    </div>
  );
};

export default Card;
