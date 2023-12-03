import styles from "./Card.module.css";
import { useState } from "react";
import { Card as CardType } from "../types";

const highlightTargetWord = (text: string, target: string) => {
  const parts = text.split(new RegExp(`(${target})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === target.toLowerCase() ? (
      <strong key={index}>{part}</strong>
    ) : (
      part
    )
  );
};

type Props = {
  card: CardType;
};

const Card = ({ card }: Props) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={styles.container}
      onClick={() => setFlipped((state) => !state)}
    >
      <div className={styles.card}>
        {flipped
          ? card.back
          : card.targetWord
          ? highlightTargetWord(card.front, card.targetWord)
          : card.front}
      </div>
    </div>
  );
};

export default Card;
