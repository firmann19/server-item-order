const { StatusCodes } = require("http-status-codes");
const { createGroup, getAllGroup } = require("../services/group");

const create = async (req, res, next) => {
  try {
    const result = await createGroup(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllGroup(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  create,
  index,
};
