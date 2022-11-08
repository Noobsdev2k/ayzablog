import cloudinary from "cloudinary";
import BlogModal from "../models/blog.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const createBlog = async (req, res) => {
  const blog = JSON.parse(req.body.data);

  const imageFile = req.files["imageFile"][0];
  console.log(imageFile);
  const resultImage = await cloudinary.v2.uploader.upload(imageFile.path, {
    folder: "imageFile",
  });
  const newBlog = new BlogModal({
    ...blog,
    imageFile: resultImage.secure_url,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    // if (!imageFile) {
    //   res.status(501).json({ message: "image not found" });
    // }
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBlogs = async (req, res) => {
  const { page } = req.query;
  try {
    // const blogs = await BlogModal.find();
    // res.status(200).json(blogs);

    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await BlogModal.countDocuments({});
    const blogs = await BlogModal.find().limit(limit).skip(startIndex);
    res.status(200).json({
      data: blogs,
      currentPage: Number(page),
      totalBlogs: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModal.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBlogsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userBlogs = await BlogModal.find({ creator: id });
  res.status(200).json(userBlogs);
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No blog exist with id: ${id}` });
    }
    await BlogModal.findByIdAndRemove(id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No blog exist with id: ${id}` });
    }

    const updatedBlog = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await BlogModal.findByIdAndUpdate(id, updatedBlog, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBlogsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const blogs = await BlogModal.find({ title });
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBlogsByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const blogs = await BlogModal.find({ tags: { $in: tag } });
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getRelatedBlogs = async (req, res) => {
  const tags = req.body;
  try {
    const blogs = await BlogModal.find({ tags: { $in: tags } });
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const likeBlog = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: "User is not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No blog exist with id: ${id}` });
    }

    const blog = await BlogModal.findById(id);

    const index = blog.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      blog.likes.push(req.userId);
    } else {
      blog.likes = blog.likes.filter((id) => id !== String(req.userId));
    }

    const updatedBlog = await BlogModal.findByIdAndUpdate(id, blog, {
      new: true,
    });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
