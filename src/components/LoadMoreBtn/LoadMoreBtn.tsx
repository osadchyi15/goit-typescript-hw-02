import { FC } from "react";
import { MoreBtnProps } from "../../types";
import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn: FC<MoreBtnProps> = ({ onClick }): JSX.Element => {
  return (
    <button type="button" onClick={onClick} className={s.loadMoreBtn}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
