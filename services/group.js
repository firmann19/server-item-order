const { Group } = require("../models");

module.exports = {
  createGroup: async (req, res) => {
    const { name } = req.body;

    const createGroup = await Group.create({
      name,
    });

    return createGroup;
  },

  getAllGroup: async (req, res) => {
    const result = await Group.findAll();

    return result;
  },
};
