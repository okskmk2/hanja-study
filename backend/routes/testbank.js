var express = require('express');
var router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploadedFiles/' });

router.post('/upload', upload.single('file'), function (req, res) {
  const file = req.file;

  console.log(file);

  res.sendStatus(200);
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
