import { MouseEvent } from "react";

export interface Item {
  id: number;
  alt_description: string;
  urls: { small: string; regular: string; [key: string]: any };
  description: string;
  user: { username: string; [key: string]: any };
  [key: string]: any;
}

export type Items = Item[];

export interface Response {
  results: Items;
  total: number;
  total_pages: number;
}

export interface ImageInfo {
  fullUrl: string | undefined;
  alt: string;
}

export interface FetchParameters {
  query: string;
  page: number;
  per_page: number;
}

export interface ToastPosition {
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  reverseOrder: boolean;
}

export type ImageGalleryType = {
  data: Items;
  imageHandler: (e: MouseEvent<HTMLImageElement>) => void;
};

export type ImageCardType = {
  item: Item;
  imageHandler: (e: MouseEvent<HTMLImageElement>) => void;
};

export type ImageModalType = {
  imageInfo: ImageInfo;
  isModalOpen: boolean;
  onCloseModal: () => void;
};

export type MoreBtnType = {
  onClick: () => void;
};

export type SearchBarType = {
  onSearchChanged: (newQuery: string) => void;
  clientQuery: string;
};

export type TopButtonType = { onClickTopButton: () => void };
