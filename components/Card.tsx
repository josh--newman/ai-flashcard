import styles from "./Card.module.css";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Card as CardType } from "../types";

type Props = {
  card: CardType;
  onGrade: (success: boolean) => void;
};

const Card = ({ card, onGrade }: Props) => {
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div
      className={styles.container}
      onClick={() => setFlipped((state) => !state)}
    >
      <animated.div
        className={styles.card}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      >
        {card.front}
      </animated.div>
      <animated.div
        className={styles.card}
        style={{
          opacity,
          transform,
          rotateY: "180deg",
        }}
      >
        <>
          <div>{card.back}</div>
          <button onClick={() => onGrade(false)}>❌</button>
          <button onClick={() => onGrade(true)}>✅</button>
        </>
      </animated.div>
    </div>
  );
};

export default Card;
