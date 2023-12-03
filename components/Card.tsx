import styles from "./Card.module.css";
import { useState } from "react";
import { Card as CardType } from "../types";

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
      <div className={styles.card}>{flipped ? card.back : card.front}</div>
    </div>
  );
};

export default Card;
