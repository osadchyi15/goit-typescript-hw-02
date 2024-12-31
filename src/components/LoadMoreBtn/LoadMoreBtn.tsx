import { FC } from "react";
import { MoreBtnType } from "../../types";
import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn: FC<MoreBtnType> = ({ onClick }): JSX.Element => {
  return (
    <button type="button" onClick={onClick} className={s.loadMoreBtn}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
