import express from "express";
import {
  getAllPosts,
  deletePost,
  updatePost,
  getTotalAmountPosts,
  getPostTotalCountMonth,
  getAllMonthRecentPosts,
  getAllRecentDataPosts,
} from "../controllers/posts";
// import { isAuthenticated, isOwner } from "../middleware";

export default (router: express.Router) => {
  router.get("/posts", getAllPosts);
  router.delete("/posts/:id", deletePost);
  router.patch("/posts/:id", updatePost);
  router.get("/post-count", getTotalAmountPosts);
  router.get("/post-count-month", getPostTotalCountMonth);
  router.get("/post-recent-month", getAllMonthRecentPosts);
  router.get("/post-recent-data", getAllRecentDataPosts);
};
