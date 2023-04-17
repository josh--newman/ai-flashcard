import { css } from "@emotion/react";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const flipCardCss = css`
  width: 200px;
  height: 200px;
  perspective: 1000px;
`;

const flipCardContentCss = css`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const flipCardFrontCss = css`
  /* background-color: #eee; */
`;

const flipCardBackCss = css`
  /* background-color: #ddd; */
  transform: rotateY(180deg);
`;

const Flashcard = ({ frontContent, backContent }) => {
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div css={flipCardCss} onClick={handleClick}>
      <animated.div
        css={css(flipCardContentCss, flipCardFrontCss)}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      >
        {frontContent}
      </animated.div>
      <animated.div
        css={css(flipCardContentCss, flipCardBackCss)}
        style={{
          opacity,
          transform: transform.to((t) => `${t} rotateY(180deg)`),
        }}
      >
        {backContent}
      </animated.div>
    </div>
  );
};

export default Flashcard;
