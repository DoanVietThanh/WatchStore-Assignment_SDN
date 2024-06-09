import mongoose from "mongoose";

export const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const BrandModel = mongoose.model("Brand", brandSchema);
