const { Image } = require("../models");

module.exports = {
  createImages: async (req, res) => {
    const fileName = req.file
      ? `images/${req.file.filename}`
      : "images/avatar/default.jpeg";

    const result = await Image.create({
      name: fileName,
    });

    return result;
  },
};
