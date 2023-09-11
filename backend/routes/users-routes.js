const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const UsersControllers = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload");

router.get("/", UsersControllers.getUsers);

router.post(
  "/signup",
  fileUpload.single('image'),//single file 
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),//test@gamil.com == test@gamil.com
    check("password").isLength({ min: 6 }),
  ],
  UsersControllers.signup
);

router.post("/login", UsersControllers.login);

module.exports = router;
