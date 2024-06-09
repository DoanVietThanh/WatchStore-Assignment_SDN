import { Request, Response } from "express";
import { BrandModel } from "../models/brand.schema";

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

export const getAllBrands = async (req: Request, res: Response) => {
  const brands = await BrandModel.find();
  return res.status(200).json({ data: brands, success: true, message: "Get all brands successfully" });
};

export const createBrand = async (req: Request, res: Response) => {
  const { brandName } = req.body;
  const brand = await BrandModel.findOne({ brandName });
  if (brand) {
    return res.status(400).json({ message: "Brand already exists", success: false });
  }
  const newBrand = new BrandModel(req.body);
  const savedBrand = await newBrand.save();
  return res.status(201).json({ data: savedBrand, success: true, message: "Create brand successfully" });
};

export const updateBrand = async (req: Request, res: Response) => {
  const updatedBrand = await BrandModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  return res.status(200).json({ data: updatedBrand, success: true, message: "Update brand successfully" });
};

export const deleteBrand = async (req: Request, res: Response) => {
  const deletedBrand = await BrandModel.findByIdAndDelete(req.params.id);
  return res.status(200).json({ data: deletedBrand, success: true, message: "Delete brand successfully" });
};
