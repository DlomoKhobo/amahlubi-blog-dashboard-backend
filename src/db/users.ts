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

let oneMonth = new Date();
oneMonth.setMonth(oneMonth.getMonth() - 1);

export const getUserCountMonth = () => UserModel.countDocuments({ createdAt: { $gt: oneMonth }});
// Users registered this month in an asc order: limit of 7
/* export const getRecentMonthUsers = () => UserModel.countDocuments({ createdAt: { $gt: oneMonth}} ).sort({ createdAt:'asc' });
export const getRecentMonthUsers2 = () => UserModel.find({ createdAt: { $gt: oneMonth}} ).sort({ createdAt:'asc' }); */
export const getRecentMonthUsers = () => UserModel.aggregate([{$limit: 7}, { $match: { createdAt: { $gt: oneMonth} } }]).sort({ createdAt:'asc' });

/* TODO */
// Users made a comment this month
export const getRecentDataUsers = (createdAt: Record<string, any>) => UserModel.find(createdAt);

/* export const sortUsersByCreatedAt = () => UserModel.find({}).sort({ createdAt:'asc' }).countDocuments();
export const sortUsersByCreatedAt2 = () => UserModel.aggregate([{ $count: 'createdAt' }]).sort({ createdAt:'asc' }); */
//export const sortUsersByCreatedAt = () => UserModel.aggregate([{ $count: 'createdAt' }, { $group: { _id: '$createdAt'}}]).sort({ createdAt:'asc' });
export const sortUsersByCreatedAt = () => UserModel.countDocuments({ createdAt: { $gt: oneMonth }});