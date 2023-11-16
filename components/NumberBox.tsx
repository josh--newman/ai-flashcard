import Link from "next/link";
import styles from "./NumberBox.module.css";

interface Props {
  title: string;
  count: number;
  href?: string;
}

const NumberBox = ({ title, count, href }: Props) => {
  return (
    <div className={styles.outerContainer}>
      <Link href={href}>
        <div className={styles.innerContainer}>
          <h2 className={styles.header}>{title}</h2>
          <p className={styles.number}>{count}</p>
        </div>
      </Link>
    </div>
  );
};

export default NumberBox;
