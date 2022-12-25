const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth")
const { ctrlWrapper } = require("../../helpers");
const { validate } = require("../../middlewares");
const {schemas} = require("../../models/user");

router.post("/register", validate(schemas.registerSchema), ctrlWrapper(ctrl.register))

module.exports = router;