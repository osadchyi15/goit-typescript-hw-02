import { FC } from "react";
import { TopButtonType } from "../../types";
import css from "./ToTopButton.module.css";

const ToTopButton: FC<TopButtonType> = ({ onClickTopButton }) => {
  return (
    <button type="button" onClick={onClickTopButton} className={css.upButton}>
      &#10148;
    </button>
  );
};

export default ToTopButton;
