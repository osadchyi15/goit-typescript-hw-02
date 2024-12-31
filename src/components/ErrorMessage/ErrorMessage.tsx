import { FC } from "react";
import s from "./ErrorMessage.module.css";

const ErrorMessage: FC = () => {
  return <h2 className={s.error}>Something went wrong!</h2>;
};

export default ErrorMessage;
