const multer = require("multer");
const path = require("path")
// const Jimp = require("jimp")

const tempDir = path.join(__dirname, "../", "tmp");

// Jimp.read(tempDir)
//   .then(image => {
//     return image
//       .resize(250, 250) // resize
//       .quality(60) // set JPEG quality
//       .greyscale() // set greyscale
//       .write(tempDir); // save
//   })
// //   image.writeAsync(path);
// //   console.log("tmpdir", lenna)
//   .catch(err => {
//     console.error(err);
//   });

const mulerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname)
        console.log("tmpdir or name", file.originalname)
    }
});



const upload = multer({
    storage: mulerConfig
});

module.exports = upload;