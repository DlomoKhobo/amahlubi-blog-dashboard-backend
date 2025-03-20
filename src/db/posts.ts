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
export const getPostCountMonth = (createdAt: Record<string, any>) => PostModel.countDocuments(createdAt);
export const getRecentMonthPosts = (createdAt: Record<string, any>) => PostModel.find(createdAt);
export const getRecentDataPosts = (createdAt: Record<string, any>) => PostModel.find(createdAt);