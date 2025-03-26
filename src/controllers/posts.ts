import express from "express";
import {
  deletePostById,
  getPostById,
  getPosts,
  getTotalPosts,
  getPostCountMonth,
  getRecentMonthPosts,
  getRecentDataPosts,
} from "../db/posts";
import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  formatDistanceToNow,
  startOfMonth,
} from "date-fns";

export const getAllPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const posts = await getPosts();

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getTotalAmountPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const countPosts = await getTotalPosts();

    return res.status(200).json(countPosts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getPostTotalCountMonth = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const countPostsMonth = await getPostCountMonth();

    return res.status(200).json(countPostsMonth);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllMonthRecentPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const countRecentPostsMonth = await getRecentMonthPosts();

    return res.status(200).json(countRecentPostsMonth);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllRecentDataPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const countRecentDataPosts = await getRecentDataPosts({
      by: ["createdAt"],
      _count: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(countRecentDataPosts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deletePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletePost = await deletePostById(id);

    return res.json(deletePost);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updatePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const { content } = req.body;

    if (!content) {
      return res.sendStatus(400);
    }

    const cont = await getPostById(id);

    cont.content = content;

    await cont.save();

    return res.status(200).json(cont).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
