import styles from "./Card.module.css";
import { useState } from "react";
import Markdown from "react-markdown";
import { Card as CardType } from "../types";

const highlightTargetWord = (text: string, target: string) => {
  return text.replace(new RegExp(`(${target})`, "gi"), "**$1**");
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
        <Markdown>
          {flipped
            ? card.back
            : card.targetWord
            ? highlightTargetWord(card.front, card.targetWord)
            : card.front}
        </Markdown>
      </div>
    </div>
  );
};

export default Card;
