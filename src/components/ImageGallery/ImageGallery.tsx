import { FC } from "react";
import { ImageGalleryType } from "../../types";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery: FC<ImageGalleryType> = ({ data, imageHandler }) => {
  return (
    <ul className={s.itemsList}>
      {data.map((item, index) => (
        <li key={item.id + index}>
          <ImageCard item={item} imageHandler={imageHandler} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
