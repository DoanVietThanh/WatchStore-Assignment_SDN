import { Request, Response } from "express";
import { MemberModel } from "../models/member.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerMember = async (req: Request, res: Response) => {
  const { memberName, password, name, yob } = req.body;
  const member = await MemberModel.findOne({ memberName });
  if (member) {
    return res.status(400).json({ message: "User already exists", success: false });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newMember = new MemberModel({
    name,
    yob,
    memberName,
    password: hashedPassword,
  });
  await newMember.save();
  return res.status(201).json({ message: "User created successfully", data: newMember, success: true });
};

export const loginMember = async (req: Request, res: Response) => {
  const { memberName, password } = req.body;
  const member = await MemberModel.findOne({ memberName });
  if (!member) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  const isPasswordValid = await bcrypt.compare(password, member.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password", success: false });
  }
  const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  return res
    .status(200)
    .cookie("token", token, { secure: true, httpOnly: true })
    .json({ message: "Login successful", data: member, token, success: true });
};

export const logoutMember = async (req: Request, res: Response) => {
  return res.status(200).clearCookie("token").json({ message: "Logout successful", success: true });
};

export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const members = await MemberModel.find().select("-password");
    return res.status(200).json({ data: members, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const members = await MemberModel.find({ isAdmin: false }).select("-password");
    return res.status(200).json({ data: members, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getMember = async (req: Request, res: Response) => {
  try {
    const member = await MemberModel.findById(req.params.id).select("-password");
    if (!member) {
      return res.status(404).json({ message: "Member not found", success: false });
    }
    return res.status(200).json({ data: member, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const updatedMember = await MemberModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found", success: false });
    }
    return res.status(200).json({ data: updatedMember, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const deletedMember = await MemberModel.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found", success: false });
    }
    return res.status(200).json({ data: deletedMember, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};