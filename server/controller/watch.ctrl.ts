import { Request, Response } from "express";
import { WatchModel } from "../models/watch.model";
import { BrandModel } from "../models/brand.model";

export const createWatch = async (req: Request, res: Response) => {
  const { watchName, brand: brandId } = req.body;
  // Check existing watch, brand
  const existingWatch = await WatchModel.findOne({ watchName });
  if (existingWatch) {
    return res.status(400).json({ message: "Watch already exists", success: false });
  }
  const existingBrand = await BrandModel.findById(brandId);
  if (!existingBrand) {
    return res.status(404).json({ message: "Brand not found", success: false });
  }
  // Create a new watch
  const newWatch = new WatchModel(req.body);
  const savedWatch = await newWatch.save();
  return res.status(201).json({
    data: savedWatch,
    success: true,
    message: "Create watch successfully",
  });
};

export const getWatch = async (req: Request, res: Response) => {
  const existingWatch = await WatchModel.findById(req.params.id)
    .populate([{ path: "brand", select: "brandName" }])
    .select("-createdAt -updatedAt -__v");
  if (!existingWatch) {
    return res.status(404).json({ message: "Watch not found", success: false });
  }
  return res.status(200).json({
    data: existingWatch,
    success: true,
    message: "Get watch successfully",
  });
};

export const queryWatches = async (req: Request, res: Response) => {
  try {
    const { watchName, pageNumber, pageSize, sortBy, sortOrder, brandName } = req.query;
    const page = parseInt(pageNumber as string, 10) || 1;
    const size = parseInt(pageSize as string, 10) || 10;

    const query: any = {};
    if (watchName) {
      query.watchName = { $regex: watchName, $options: "i" };
    }

    // If brandName is provided, find the brand first
    let brand: any = null;
    if (brandName) {
      brand = await BrandModel.findOne({ brandName: { $regex: brandName, $options: "i" } });
      if (!brand) {
        return res.status(404).json({ message: "Brand not found", success: false });
      }
      query.brand = brand._id;
    }

    const watches = await WatchModel.find(query)
      .skip((page - 1) * size)
      .limit(size)
      .sort({ [sortBy as string]: Number(sortOrder) === 1 ? 1 : -1 })
      .populate([{ path: "brand", select: "brandName" }])
      .select("-__v");

    const totalCount = await WatchModel.countDocuments(query);

    return res.status(200).json({ data: watches, totalCount, success: true, message: "Get watches successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
export const updateWatch = async (req: Request, res: Response) => {
  try {
    const existingWatch = await WatchModel.findById(req.params.id);
    if (!existingWatch) {
      return res.status(404).json({ message: "Watch not found", success: false });
    }
    if (req.body.brand) {
      const existingBrand = await BrandModel.findById(req.body.brand);
      if (!existingBrand) {
        return res.status(404).json({ message: "Brand not found", success: false });
      }
    }
    const updatedWatch = await WatchModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({
      data: updatedWatch,
      success: true,
      message: "Update watch successfully",
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteWatch = async (req: Request, res: Response) => {
  try {
    const deletedWatch = await WatchModel.findByIdAndDelete(req.params.id);
    if (!deletedWatch) {
      return res.status(404).json({ message: "Watch not found", success: false });
    }
    return res.status(200).json({
      data: deletedWatch,
      success: true,
      message: "Delete watch successfully",
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
