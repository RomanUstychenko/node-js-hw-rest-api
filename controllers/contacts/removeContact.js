const contacts = require("../../models/contacts");
const HttpError = require("../../helpers");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeContact;