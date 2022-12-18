const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validate } = require("../../middlewares");
const schemas = require("../../schemas");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", validate(schemas.contactSchema), ctrlWrapper(ctrl.addContact));

router.put("/:id", validate(schemas.contactSchema), ctrlWrapper(ctrl.updateContact));

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

module.exports = router;
