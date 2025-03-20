import { CommentModel } from "../models/comments";

export const getComments = () => CommentModel.find();
/* export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    "authentication.sessionToken": sessionToken,
}); */
export const getCommentById = (id: string) => CommentModel.findById(id);
/* export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save().then((user) => user.toObject()); */
export const deleteCommentById = (id: string) => CommentModel.findOneAndDelete({ _id: id });
export const updateCommentById = (id: string, values: Record<string, any>) => CommentModel.findByIdAndUpdate( id, values);

export const getTotalComments = () => CommentModel.countDocuments();
export const getCommentCountMonth = (createdAt: Record<string, any>) => CommentModel.countDocuments(createdAt);
export const getRecentMonthComments = (createdAt: Record<string, any>) => CommentModel.find(createdAt);
export const getRecentDataComments = (createdAt: Record<string, any>) => CommentModel.find(createdAt);