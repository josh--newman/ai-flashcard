import styles from "./CardsByStage.module.css";
import { CountByStage } from "../types";

const stages = ["Apprentice", "Guru", "Master", "Enlightened", "Burned"];
const numberToStage = {
  1: "Apprentice",
  2: "Apprentice",
  3: "Apprentice",
  4: "Apprentice",
  5: "Guru",
  6: "Guru",
  7: "Master",
  8: "Enlightened",
  9: "Burned",
};

const colors = {
  Apprentice: "#dd0093",
  Guru: "#872d9e",
  Master: "#294ddb",
  Enlightened: "#0093dd",
  Burned: "#434343",
};

const CardByStage = ({ stage, count }: { stage: string; count: number }) => {
  return (
    <div style={{ backgroundColor: colors[stage] }} className={styles.card}>
      <h4 className={styles.stage}>{stage}</h4>
      <div className={styles.count}>{count ?? 0}</div>
    </div>
  );
};

interface Props {
  countByStage: CountByStage[];
}

const CardsByStage = ({ countByStage }: Props) => {
  const countsByStage = countByStage.reduce((acc, { srsStage, _count }) => {
    const stage = numberToStage[srsStage];
    acc[stage] = _count.srsStage;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        {stages.map((stage) => (
          <CardByStage stage={stage} count={countsByStage[stage]} />
        ))}
      </div>
    </div>
  );
};

export default CardsByStage;
