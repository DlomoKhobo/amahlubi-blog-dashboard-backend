import { PostModel } from "../models/posts";

export const getPosts = () => PostModel.find();
/* export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    "authentication.sessionToken": sessionToken,
}); */
export const getPostById = (id: string) => PostModel.findById(id);
/* export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save().then((user) => user.toObject()); */
export const deletePostById = (id: string) => PostModel.findOneAndDelete({ _id: id });
export const updatePostById = (id: string, values: Record<string, any>) => PostModel.findByIdAndUpdate( id, values);

export const getTotalPosts = () => PostModel.countDocuments();



let oneMonth = new Date();
oneMonth.setMonth(oneMonth.getMonth() - 1);

export const getPostCountMonth = () => PostModel.countDocuments({ createdAt: { $gt: oneMonth}});
//export const getRecentMonthPosts = (createdAt: Record<string, any>) => PostModel.find(createdAt);
export const getRecentMonthPosts = () => PostModel.aggregate([{$limit: 7}, { $match: { createdAt: { $gt: oneMonth} } }] ).sort({ createdAt:'asc' });



export const getRecentDataPosts = (createdAt: Record<string, any>) => PostModel.find(createdAt);