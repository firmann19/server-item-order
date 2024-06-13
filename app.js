const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
var logger = require("morgan");
const port = 2000;
const app = express();
require("dotenv").config();

// Import router
const userController = require("./controllers/userController");
const imageController = require("./controllers/imageController");
const orderController = require("./controllers/orderController");
const groupController = require("./controllers/groupController");
const { authenticateUser, authorizeRoles } = require("./middlewares/auth");

// Import Middlewares
const notFoundMiddleware = require("./middlewares/not-found");
const handleErrorMiddleware = require("./middlewares/handler-error");
const upload = require("./middlewares/multer");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Karyawan
app.post("/login", userController.login);
app.post("/register", userController.register);

//image
app.post(
  "/image",
  authenticateUser,
  authorizeRoles("Finance"),
  upload.single("avatar"),
  imageController.create
);

//group
app.post(
  "/group",
  authenticateUser,
  authorizeRoles("Officer", "Manager", "Finance"),
  groupController.create
);
app.get(
  "/group",
  authenticateUser,
  authorizeRoles("Officer", "Manager", "Finance"),
  groupController.index
);

//order
app.post(
  "/order",
  authenticateUser,
  authorizeRoles("Officer"),
  orderController.create
);
app.get(
  "/order",
  authenticateUser,
  authorizeRoles("Officer", "Manager", "Finance"),
  orderController.index
);
app.get(
  "/order/:id",
  authenticateUser,
  authorizeRoles("Officer", "Manager", "Finance"),
  orderController.getOne
);
app.put(
  "/order/:id",
  authenticateUser,
  authorizeRoles("Finance"),
  orderController.update
);
app.delete(
  "/order/:id",
  authenticateUser,
  authorizeRoles("Manager"),
  orderController.destroy
);
app.put(
  "/reject/:id",
  authenticateUser,
  authorizeRoles("Manager", "Finance"),
  orderController.reject
);
app.put(
  "/approve/:id",
  authenticateUser,
  authorizeRoles("Manager", "Finance"),
  orderController.approve
);

//middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

// Public File Access

app.listen(port, () => {
  console.log(`Server berhasil berjalan di port http://localhost:${port}`);
});

module.exports = app;
