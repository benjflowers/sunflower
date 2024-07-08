const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors())

let frameName;
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'canvasFrames'))
  },
  filename: function(req, file, cb) {
    frameName = file.originalname;
    cb(null, file.originalname);
  }
})

const upload = multer({storage: storage})

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({message: `uploaded ${frameName}` });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})