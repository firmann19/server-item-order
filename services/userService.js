const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { UnauthorizedError } = require("../errors");
const { CountAllApprove, CountAllReject } = require("./order");

module.exports = {
  signUp: async (req, res) => {
    const { name, email, role, password } = req.body;

    const createdUser = await User.create({
      name,
      email,
      role,
      password,
    });

    return createdUser;
  },

  signIn: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthorizedError("Authentication failed. User not found.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Authentication failed. Wrong password.");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    getDataApprove = await CountAllApprove();
    getDataReject = await CountAllReject();

    return {
      token,
      user: user.name,
      userId: user.id,
      role: user.role,
      getAllApprove: getDataApprove,
      getAllReject: getDataReject,
    };
  },
};
