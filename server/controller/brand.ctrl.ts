import { Request, Response } from "express";
import { BrandModel } from "../models/brand.model";
import { WatchModel } from "../models/watch.model";

export const getBrand = async (req: Request, res: Response) => {
  try {
    const brand = await BrandModel.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found", success: false });
    }
    return res.status(200).json({ data: brand, success: true, message: "Get brand successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const createBrand = async (req: Request, res: Response) => {
  try {
    const { brandName } = req.body;
    const brand = await BrandModel.findOne({ brandName });
    if (brand) {
      return res.status(400).json({ message: "Brand already exists", success: false });
    }
    const newBrand = new BrandModel(req.body);
    const savedBrand = await newBrand.save();
    return res.status(201).json({ data: savedBrand, success: true, message: "Create brand successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const queryBrand = async (req: Request, res: Response) => {
  try {
    const { brandName, pageNumber = "1", pageSize = "10", sortBy = "brandName", sortOrder = "1" } = req.query;
    const page = parseInt(pageNumber as string, 10);
    const size = parseInt(pageSize as string, 10);

    const query = brandName ? { brandName: { $regex: brandName, $options: "i" } } : {};
    const brands = await BrandModel.find(query)
      .skip((page - 1) * size)
      .limit(size)
      .sort({ [sortBy as string]: Number(sortOrder) === 1 ? 1 : -1 });
    const totalCount = await BrandModel.countDocuments(query);

    return res.status(200).json({ data: brands, totalCount, success: true, message: "Get brands successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const { brandName } = req.body;
    const brand = await BrandModel.findOne({ brandName });
    if (brand) {
      return res.status(400).json({ message: "Brand already exists", success: false });
    }
    const updatedBrand = await BrandModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found", success: false });
    }
    return res.status(200).json({ data: updatedBrand, success: true, message: "Update brand successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const brandId = req.params.id;
    const relatedWatches = await WatchModel.findOne({ brand: brandId });
    if (relatedWatches) {
      return res.status(400).json({ message: "Cannot delete brand with related watches", success: false });
    }

    const deletedBrand = await BrandModel.findByIdAndDelete(brandId);
    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found", success: false });
    }

    return res.status(200).json({ data: deletedBrand, success: true, message: "Delete brand successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
