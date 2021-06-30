const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) { //путь записи
    cb(null, 'API/public/txt')
  },
  filename(req, file, cb) { //имя файла
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
  }
});


module.exports = multer({
  storage
});