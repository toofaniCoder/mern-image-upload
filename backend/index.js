const express = require('express');
const fileUplaod = require('express-fileupload');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));

app.use(
  fileUplaod({
    createParentPath: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/uploads', (req, res) => {
  let thumbnail;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  thumbnail = req.files.thumbnail;

  uploadPath = __dirname + '/public/uploads/' + thumbnail.name;
  thumbnail.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.status(200).json({ url: thumbnail.name });
  });
});

app.listen(port, () => {
  console.log(`Image Uplaod  app listening on port ${port}`);
});
