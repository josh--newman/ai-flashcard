import styles from "./CardsByStage.module.css";
import { CountByStage } from "../types";

function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent) * 21 + 21;
  const y = Math.sin(2 * Math.PI * percent) * 21 + 21;
  return [x, y];
}

function getColorForStage(stage: number) {
  const colors = {
    1: "#dd0093",
    2: "#dd0093",
    3: "#dd0093",
    4: "#dd0093",
    5: "#872d9e",
    6: "#872d9e",
    7: "#294ddb",
    8: "#0093dd",
    9: "#434343",
  };

  return colors[stage];
}

interface Props {
  countByStage: CountByStage[];
}

const CardsByStage = ({ countByStage }: Props) => {
  const total = countByStage.reduce(
    (acc, item) => acc + item._count.srsStage,
    0
  );
  let accumulatedPercent = 0;

  return (
    <div className={styles.container}>
      <h2>Cards by stage</h2>
      <div className={styles.svgContainer}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 42 42"
          preserveAspectRatio="xMidYMid meet"
        >
          {countByStage.map((item, index) => {
            const [startX, startY] =
              getCoordinatesForPercent(accumulatedPercent);
            const percent = item._count.srsStage / total;
            accumulatedPercent += percent;
            const [endX, endY] = getCoordinatesForPercent(accumulatedPercent);
            const largeArcFlag = percent > 0.5 ? 1 : 0;
            const [labelX, labelY] = getCoordinatesForPercent(
              accumulatedPercent - percent / 2
            ); // Midpoint of the segment

            return (
              <g key={index}>
                <path
                  d={`M 21 21 L ${startX} ${startY} A 21 21 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                  fill={getColorForStage(item.srsStage)}
                />
                <text
                  x={labelX}
                  y={labelY}
                  fontSize="3"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {item._count.srsStage}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default CardsByStage;
