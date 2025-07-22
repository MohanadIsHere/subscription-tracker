import User from "../database/models/user.model.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({
      message: "User Retrieved Successfully",
      data: { user },
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      message: "Users Retrieved Successfully",
      data: { users },
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
