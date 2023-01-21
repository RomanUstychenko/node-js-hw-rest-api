const { User } = require("../../models/user");
const {HttpError, sendEmail} = require("../../helpers");

const {BASE_URL} = process.env

const resendVerify = async (req, res) => {
const {email} = req.body;
const user = await User.findOne({email});
if (!user || user.verify) {
    throw HttpError(404)
}

const verifyEmail = {
    to: user.email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationCode}" >Click verify email</a>`
}
await sendEmail(verifyEmail)

res.json({
    message: "Verify email resend"
})
};

module.exports = resendVerify;