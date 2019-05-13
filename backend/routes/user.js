const express = require("express");

const checkAuth = require("../middleware/check-auth");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/signup", checkAuth, userController.createUser);

router.post("/login", userController.userLogin);

module.exports = router;
