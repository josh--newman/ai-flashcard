import styles from "./UpcomingReviews.module.css";
import { format } from "date-fns";
import { UpcomingReview } from "../types";

interface Props {
  reviewCounts: UpcomingReview[];
}

const UpcomingReviews = ({ reviewCounts }: Props) => {
  return (
    <div className={styles.container}>
      <h2>Upcoming</h2>
      <ul>
        {reviewCounts.map((group) => (
          <li key={group.availableAt}>
            <span>{format(new Date(group.availableAt), "ha")}</span> :{" "}
            <span>{group._count.availableAt} reviews</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingReviews;
