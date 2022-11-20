import { insertComment, listPaging, update } from "../helper/comment.js";
import UserModal from "../models/user.model.js";
import CommentModal from "../models/comment.model.js";
export const createComment = async (req, res) => {
  try {
    // if (!imageFile) {
    //   res.status(501).json({ message: "image not found" });
    // }
    const { userId } = req;
    const user = await UserModal.findById(userId, {
      password: 0,
      email: 0,
      role: 0,
    });

    const { blogId, body, commentId } = req.body;

    return res
      .status(201)
      .json(await insertComment({ blogId, body, userId, user, commentId }));
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getByBlog = async (req, res, next) => {
  try {
    const { blogId, page = 1, pagesize = 1 } = req.query;

    const listComments = await listPaging({ blogId, page, pagesize });
    const total = await CommentModal.find({
      blogId: blogId,
    });
    return res.status(200).json({
      status: "listComments",
      elements: listComments[0].comments,
      meta: {
        pagesize,
        count: listComments[0].count,
        totalPages: total.length,
      },
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
export const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { body } = req.body;
    const commentId = id;
    const comment = await update({ body, userId, commentId });
    return res.status(200).json({
      status: "Update success",
      result: comment,
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
