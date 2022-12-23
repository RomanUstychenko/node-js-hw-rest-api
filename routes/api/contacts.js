const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validate, isValidId } = require("../../middlewares");
const schemas = require("../../schemas");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validate(schemas.contactSchema), ctrlWrapper(ctrl.addContact));

router.put("/:id", isValidId, validate(schemas.contactSchema), ctrlWrapper(ctrl.updateContact));

router.patch("/:id/favorite", isValidId, validate(schemas.updateFavoriteScheme), ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

module.exports = router;
