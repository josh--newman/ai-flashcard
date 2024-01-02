import styles from "./ReviewHeader.module.css";

interface Props {
  numCorrect: number;
  numLeft: number;
  numTotal: number;
}

const ReviewHeader = ({ numCorrect, numLeft, numTotal }: Props) => {
  const percentComplete = Math.round((numCorrect / numTotal) * 100);

  return (
    <div className={styles.container}>
      <div
        className={styles.progressBar}
        style={{
          width: `${percentComplete}%`,
        }}
      ></div>
      <div className={styles.exit}>
        <button>Exit</button>
      </div>
      <div className={styles.stats}>
        <div>
          <span className={styles.label}>👍🏻</span>
          <span className={styles.num}>{percentComplete}%</span>
        </div>
        <div>
          <span className={styles.label}>✅</span>
          <span className={styles.num}>{numCorrect}</span>
        </div>
        <div>
          <span className={styles.label}>📥</span>
          <span className={styles.num}>{numLeft}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewHeader;
