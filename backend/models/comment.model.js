const mongoose = require("mongoose");
const moment = require("moment");
const create = moment().format();

const CommentSchema = mongoose.Schema({
  id_blog: { type: String, require: true },
  comments: {
    type: Array,
    default: [
      {
        commentId: { type: Number, required: true },
        id_account: { type: String, required: true },
        account: { type: Object, default: {} },
        body: { type: String, default: "" },
      },
    ],
  },
  count: { type: Number, required: true },
  edit_content: { type: Boolean, default: false },
  createdAt: { type: Date, default: create },
  updatedAt: { type: Date, default: create },
});

module.exports = mongoose.model("Comment", CommentSchema);
