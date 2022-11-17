import mongoose from "mongoose";
import moment from "moment";
const create = moment().format();

const CommentSchema = mongoose.Schema({
  blogId: { type: String, require: true },
  comments: {
    type: Array,
    default: [
      {
        commentId: mongoose.Types.ObjectId,
        userId: { type: String, required: true },
        user: { type: Object, default: {} },
        body: { type: String, default: "" },
      },
    ],
  },
  count: { type: Number, required: true },
  edit_content: { type: Boolean, default: false },
  createdAt: { type: Date, default: create },
  updatedAt: { type: Date, default: create },
});

const CommentModal = mongoose.model("Comment", CommentSchema);
export default CommentModal;
