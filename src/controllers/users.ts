import express from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
  getTotalUsers,
  getUserCountMonth,
  getRecentMonthUsers,
  getRecentDataUsers,
  sortUsersByCreatedAt,
} from "../db/users";
import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  formatDistanceToNow,
  startOfMonth,
} from "date-fns";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getTotalAmountUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const countUsers = await getTotalUsers();

    return res.status(200).json(countUsers);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUserTotalCountMonth = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const countUsersMonth = await getUserCountMonth();
    return res.status(200).json(countUsersMonth);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllMonthRecentUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const countRecentUsersMonth = await getRecentMonthUsers();
    return res.status(200).json(countRecentUsersMonth);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// Total users posted or commented this month
export const getAllRecentDataUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const countRecentDataUsers = await getRecentDataUsers({
      by: ["createdAt"],
      _count: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(countRecentDataUsers);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getByMonthOfInterval = async (
  req: express.Request,
  res: express.Response
) => {
  try {

    let currentMonth = new Date();
    currentMonth.setMonth(currentMonth.getMonth());

    const countRecentDataUsers = await sortUsersByCreatedAt();

    const monthlyUsersData = eachMonthOfInterval({
      start: startOfMonth(
        new Date(new Date())
      ),
      end: endOfMonth(currentMonth),
    }).map((month) => {
      const monthString = format(month, "MMM");
      const userMonthly = countRecentDataUsers;
      return { month: monthString, total: userMonthly };
    });

    return res.status(200).json(monthlyUsersData);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deleteUser = await deleteUserById(id);

    return res.json(deleteUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.username = username;

    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
