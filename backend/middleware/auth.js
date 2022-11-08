import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
const { ACCESS_TOKEN_SECRET } = process.env;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, ACCESS_TOKEN_SECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await UserModel.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
