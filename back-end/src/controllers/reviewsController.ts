import { Request, Response } from "express";
import {
  getFeedbackTagsService,
  getRatingService,
} from "../services/reviewService.js";

export async function getReviews(req: Request, res: Response) {
  try {
    const userId = Number(req.params.user_id);

    if (!userId)
      return res.status(500).json({ message: "user_id nao fornecido" });

    const ratings = await getRatingService(userId);
    const feedbacksQuery = await getFeedbackTagsService(userId);
    const rawFeedbacks = feedbacksQuery.rows || [];
    const feedbacks = {
      positive: rawFeedbacks.filter((tag) => tag.type === "POSITIVE"),
      negative: rawFeedbacks.filter((tag) => tag.type === "NEGATIVE"),
    };
    res.status(201).json({ ratings, feedbacks });
  } catch (error) {
    console.log("erro ao buscar rating do motorista", error);
  }
}
