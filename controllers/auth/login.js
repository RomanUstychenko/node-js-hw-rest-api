const {User} = require("../../models/user");
const {HttpError} = require("../../helpers");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {SECRET_KEY} = process.env;

const login = async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    };
    const passwordCompare = await bcryptjs.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    };
    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"})
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
    })
};

module.exports = login;