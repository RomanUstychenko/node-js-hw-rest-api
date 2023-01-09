const {User} = require("../../models/user");
const fs = require("fs/promises")
const path = require("path")
const Jimp = require("jimp")




const tmpDir = path.join(__dirname, "../../", "tmp")
const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

// const updateAvatar = async (req, res) => {
//     const {path: tempUpload, originalname} = req.file
//     const {_id} = req.user
//     // const avatarName = `${_id}_${originalname}`
//     const tmpUpload = path.join(tmpDir, originalname);
    
//     Jimp.read(tmpUpload)
//   .then(lenna => {
//     return lenna
//       .resize(250, 250) // resize
//       .quality(60) // set JPEG quality
//       .greyscale() // set greyscale
//       .write('lena-small-bw.jpg'); // save
//   })
//   .catch(err => {
//     console.error(err);
//   });
    
//   const avatarName = `${_id}_${originalname}`
//     const resultUpload = path.join(tmpDir, avatarName);

//     await fs.rename(tempUpload, resultUpload)
//     const avatarURL = path.join("avatars", avatarName)
//     await User.findByIdAndUpdate(_id, {avatarURL})
    
//     res.json({
//         avatarURL,
//     })
//     }

const updateAvatar = async (req, res) => {
const {path: tempUpload, originalname} = req.file
const {_id} = req.user

const image = await Jimp.read(tempUpload);
await image.resize(250, 250);
await image.writeAsync(tempUpload);

const avatarName = `${_id}_${originalname}`
const resultUpload = path.join(avatarsDir, avatarName);



await fs.rename(tempUpload, resultUpload)
const avatarURL = path.join("avatars", avatarName)
await User.findByIdAndUpdate(_id, {avatarURL})

res.json({
    avatarURL,
})
}

module.exports = updateAvatar;