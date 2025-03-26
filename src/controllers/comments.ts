import express from "express";
import {
  deleteCommentById,
  getCommentById,
  getComments,
  getTotalComments,
  getCommentCountMonth,
  getRecentMonthComments,
  getRecentDataComments,
} from "../db/comments";
import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  formatDistanceToNow,
  startOfMonth,
} from "date-fns";

export const getAllComments = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const comments = await getComments();

    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getTotalAmountComments = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const countComments = await getTotalComments();

    return res.status(200).json(countComments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getCommentTotalCountMonth = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const countCommentsMonth = await getCommentCountMonth();

    return res.status(200).json(countCommentsMonth);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllMonthRecentComments = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const countRecentCommentsMonth = await getRecentMonthComments(/* {
      orderBy: {
        createdAt: "desc",
      },
      take: 7,
    } */);

    return res.status(200).json(countRecentCommentsMonth);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllRecentDataComments = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const countRecentDataComments = await getRecentDataComments({
      by: ["createdAt"],
      _count: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(countRecentDataComments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deleteComment = await deleteCommentById(id);

    return res.json(deleteComment);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const { description } = req.body;

    if (!description) {
      return res.sendStatus(400);
    }

    const desc = await getCommentById(id);

    desc.desc = description;

    await desc.save();

    return res.status(200).json(desc).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
