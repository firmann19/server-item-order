const UnauthorizedError = require("../errors/unauthorized");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  try {
    let token;

    //check header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    } else {
      return res.status(401).send({
        status: false,
        message: "Authenticated Invalid",
        data: null,
      })
    }

    const payload = isTokenValid({ token });

    // Attach the user and his permissions to the req object
    req.user = {
      id: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};


const authorizeRoles = (...rolesUser) => {
  return (req, res, next) => {
    if (!rolesUser.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
