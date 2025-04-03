import express from "express";
import {
  getAllUsers,
  deleteUser,
  updateUser,
  getTotalAmountUsers,
  getUserTotalCountMonth,
  getAllMonthRecentUsers,
  getAllRecentDataUsers,
  getByMonthOfInterval,
  getByMonthOfInterval2,
} from "../controllers/users";
// import { isAuthenticated, isOwner } from "../middleware";

export default (router: express.Router) => {
  router.get("/users", getAllUsers);
  router.delete("/users/:id", deleteUser);
  router.patch("/users/:id", updateUser);
  router.get("/user-count", getTotalAmountUsers);
  router.get("/user-count-month", getUserTotalCountMonth);
  router.get("/user-recent-month", getAllMonthRecentUsers);
  router.get("/user-recent-data", getAllRecentDataUsers);
  router.get("/user-month-interval", getByMonthOfInterval);
  router.get("/user-month-interval-2", getByMonthOfInterval2);
};
