import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { MemberModel } from "../models/member.model";

type AuthRequest = Request & {
  user?: any;
};

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Please login!" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  if (!decoded || !decoded.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await MemberModel.findById(decoded.id);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  req.user = user;
  next();
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Not permission", success: false });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
