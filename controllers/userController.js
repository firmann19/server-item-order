const { StatusCodes } = require("http-status-codes");
const { signUp, signIn } = require("../services/userService");

const register = async (req, res, next) => {
  try {
    const result = await signUp(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await signIn(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
    console.log(error)
  }
};

module.exports = { register, login };
