const bcrypt = require("bcrypt");

function hashPassword(userPass) {
  const saltRound = 10;
  const salt = bcrypt.genSaltSync(saltRound);
  const hash = bcrypt.hashSync(userPass, salt);
  return hash;
}

module.exports = {
  hashPassword,
};