const multer = require('multer');

const file_filter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
        cb(null,true);
    else
        cb(null,false);
} 
const multer_storage = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: file_filter
});

module.exports = multer_storage;