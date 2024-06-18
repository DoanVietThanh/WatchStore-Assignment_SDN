import { Request, Response } from "express";
import { MemberModel } from "../models/member.model";
import mongoose from "mongoose";
import { WatchModel } from "../models/watch.model";
import { CommentModel } from "../models/comment.model";
export const createComment = async (req: Request, res: Response) => {
  try {
    const { author: memberId } = req.body;
    const { watchId } = req.params;
    const existingMember = await MemberModel.findById(memberId);
    if (!existingMember) {
      return res.status(404).json({ message: "Member not found", success: false });
    }
    const existingWatch = await WatchModel.findById(watchId);
    if (!existingWatch) {
      return res.status(404).json({ message: "Watch not found", success: false });
    }

    // Check if the member has already commented on the watch
    if (existingWatch.comments.some((comment) => comment.author.toString() === memberId)) {
      return res.status(400).json({ message: "Member has already commented on this watch", success: false });
    }
    const newComment = new CommentModel(req.body);
    const savedComment = await newComment.save();
    existingWatch.comments.push(savedComment);
    await existingWatch.save();
    return res.status(201).json({ data: savedComment, success: true, message: "Create comment successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { watchId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(watchId)) {
      return res.status(400).json({ message: "Invalid watchId", success: false });
    }
    const existingWatch = await WatchModel.findById(watchId).populate({
      path: "comments.author",
      select: "_id memberName name yob",
    });
    if (!existingWatch) {
      return res.status(404).json({ message: "Watch not found", success: false });
    }
    return res.status(200).json({ data: existingWatch.comments, success: true, message: "Get comment successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const { watchId, commentId } = req.params;
  const { rating, content, author } = req.body;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(watchId) ||
      !mongoose.Types.ObjectId.isValid(commentId) ||
      !mongoose.Types.ObjectId.isValid(author)
    ) {
      return res.status(400).json({ message: "Invalid watchId or commentId", success: false });
    }

    // Find the watch by ID
    const watch = await WatchModel.findById(watchId);
    if (!watch) {
      return res.status(404).json({ message: "Watch not found", success: false });
    }

    // Find the comment within the watch's comments array
    const commentedWatch = watch.comments.id(commentId);
    if (!commentedWatch) {
      return res.status(404).json({ message: "Comment not found", success: false });
    }

    // Update the comment's fields
    if (rating !== undefined) commentedWatch.rating = rating;
    if (content !== undefined) commentedWatch.content = content;

    // Save both watch and comment documents
    await CommentModel.findByIdAndUpdate(commentId, commentedWatch, { new: true });
    await watch.save();

    return res.status(200).json({ message: "Comment updated successfully", success: true, comment: commentedWatch });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { watchId, commentId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(watchId) || !mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid watchId or commentId", success: false });
    }

    // Find the watch by ID
    const watch = await WatchModel.findById(watchId);
    if (!watch) {
      return res.status(404).json({ message: "Watch not found", success: false });
    }

    // Find the comment within the watch's comments array
    const comment = watch.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found", success: false });
    }

    watch.set(
      "comments",
      watch.comments.filter((c) => c.id !== commentId)
    );
    await watch.save();
    const deletedComment = await CommentModel.findByIdAndDelete(commentId);
    return res.status(200).json({ message: "Comment deleted successfully", success: true, comment: deletedComment });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
