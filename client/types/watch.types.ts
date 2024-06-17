import { BrandType } from "./brand.types";
import { CommentType } from "./comment.types";

export type WatchItemType = {
  _id: string;
  watchName: string;
  image: string;
  price: number;
  automatic: boolean;
  watchDescription: string;
  brand: BrandType;
  comments?: CommentType[];
};

export type CreateWatchItemType = {
  watchName: string;
  image: string;
  price: number;
  automatic: boolean;
  watchDescription: string;
  brand: string; // This is the brand's ID
};
