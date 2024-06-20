const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors/unauthorized");

const authenticateUser = async (req, res, next) => {
  try {
    let token;

    // Check header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    } else {
      return res.status(401).json({
        status: false,
        message: "Authentication Invalid",
        data: null,
      });
    }

    // Verify JWT token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: false,
          message: "Token is not valid",
          data: null,
        });
      } else {
        // Token is valid, attach decoded user payload to req.user
        req.user = {
          id: decoded.userId,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        };
        next();
      }
    });
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
