import mongoose from "mongoose";
import { commentSchema } from "./comment.schema";

export const watchSchema = new mongoose.Schema(
  {
    watchName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    Automatic: {
      type: Boolean,
      default: false,
    },
    watchDescription: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  },
  { timestamps: true }
);

export const WatchModel = mongoose.model("Watch", watchSchema);
