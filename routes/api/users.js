const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth")
const { ctrlWrapper } = require("../../helpers");
const { validate, authenticate } = require("../../middlewares");
const {schemas} = require("../../models/user");

router.post("/register", validate(schemas.registerSchema), ctrlWrapper(ctrl.register))

router.post("/login", validate(schemas.loginSchema), ctrlWrapper(ctrl.login))

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout))

module.exports = router;