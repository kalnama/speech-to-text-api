const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/transcribe', upload.single('audio'), (req, res) => {
  const filePath = req.file.path;

  exec(`whisper ${filePath} --model base --language ur`, (err, stdout) => {
    if (err) {
      return res.json({ error: 'Error processing audio' });
    }

    res.json({ text: stdout });
    fs.unlinkSync(filePath);
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
