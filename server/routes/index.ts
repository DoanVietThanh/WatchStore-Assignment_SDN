import express from "express";
import { memberRoutes } from "./member.route";
import { brandRoutes } from "./brand.route";
import { watchRoutes } from "./watch.route";
import { commentRoutes } from "./comment.route";

export const mainRoutes = express.Router();

mainRoutes.use("/member", memberRoutes);
mainRoutes.use("/brand", brandRoutes);
mainRoutes.use("/watch", watchRoutes);
mainRoutes.use("/comment", commentRoutes);
