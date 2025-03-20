import express from "express";
import {
  getAllComments,
  deleteComment,
  updateComment,
  getTotalAmountComments,
  getCommentTotalCountMonth,
  getAllMonthRecentComments,
  getAllRecentDataComments,
} from "../controllers/comments";
// import { isAuthenticated, isOwner } from "../middleware";

export default (router: express.Router) => {
  router.get("/comments", getAllComments);
  router.delete("/comments/:id", deleteComment);
  router.patch("/comments/:id", updateComment);
  router.get("/comment-count", getTotalAmountComments);
  router.get("/comment-count-month", getCommentTotalCountMonth);
  router.get("/comment-recent-month", getAllMonthRecentComments);
  router.get("/comment-recent-data", getAllRecentDataComments);
};
