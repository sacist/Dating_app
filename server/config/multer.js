const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../photos");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage });

module.exports = upload;
