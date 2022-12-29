const {User} = require("../../models/user");
const {HttpError} = require("../../helpers");
const bcryptjs = require("bcryptjs")


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

    const token = "hgrhgfrghsdfgbfn.fghrfehgadhetrtehg.ehrjtehrgfegwherehg"
    

    res.json({
        token,
    })
};

module.exports = login;