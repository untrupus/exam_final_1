const path = require("path");
const {nanoid} = require('nanoid');
const multer = require('multer');

const rootPath = __dirname;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  path.join(rootPath, 'public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

module.exports = {
    upload,
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    db: {
        name: "exam_final",
        url: "mongodb://localhost"
    },
    fb: {
        appId: '575331260098121',
        appSecret: 'ed058a9923f3881083c39d3168c69e61'
    }
};