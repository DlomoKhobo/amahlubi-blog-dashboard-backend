import { UserModel } from "../models/users";
import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  formatDistanceToNow,
  startOfMonth,
} from "date-fns";

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
/* export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    "authentication.sessionToken": sessionToken,
}); */
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate( id, values);

export const getTotalUsers = () => UserModel.countDocuments();
export const getUserCountMonth = (createdAt: Record<string, any>) => UserModel.countDocuments(createdAt);
export const getRecentMonthUsers = (createdAt: Record<string, any>) => UserModel.find(createdAt);
export const getRecentDataUsers = (createdAt: Record<string, any>) => UserModel.find(createdAt);

