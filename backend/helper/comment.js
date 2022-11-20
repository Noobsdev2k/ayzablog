import CommentModal from "../models/comment.model.js";
export const insertComment = async ({
  blogId,
  commentId,
  userId,
  user,
  body,
}) => {
  try {
    const _blogId = blogId;
    return await CommentModal.findOneAndUpdate(
      {
        blogId: _blogId,
        count: { $lt: 30 },
      },
      {
        $push: {
          comments: {
            commentId,
            userId,
            user,
            body,
          },
        },
        $inc: { count: 1 },
        $setOnInsert: {
          blogId: _blogId,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
};
export const listPaging = async ({ blogId, page, pagesize = 1 }) => {
  try {
    const _blogId = blogId;
    return await CommentModal.find({
      blogId: _blogId,
    })
      .sort({ _id: 1 })
      .skip((page - 1) * pagesize)
      .limit(pagesize);
  } catch (error) {
    console.error(error);
  }
};

export const update = async ({
  commentId,
  userId,

  body,
}) => {
  try {
    return await CommentModal.findOneAndUpdate(
      {
        comments: { $elemMatch: { commentId: commentId, userId: userId } },
      },
      {
        $set: {
          "comments.$.body": body,
        },
      },
      { upsert: true, returnDocument: "after" }
    );
  } catch (error) {
    console.error(error);
  }
};
