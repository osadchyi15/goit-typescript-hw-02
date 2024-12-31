import { FC } from "react";
import { ImageCardType } from "../../types";
import s from "./ImageCard.module.css";

const ImageCard: FC<ImageCardType> = ({ item, imageHandler }) => {
  return (
    <>
      <img
        onClick={imageHandler}
        className={s.image}
        src={item.urls.small}
        alt={item.alt_description}
        data-url={item.urls.regular}
        width="450px"
        height="300px"
      />
    </>
  );
};

export default ImageCard;
