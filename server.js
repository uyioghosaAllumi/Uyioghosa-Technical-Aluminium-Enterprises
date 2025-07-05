const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const DATA_FILE = 'data.json';
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');

app.post('/upload', upload.single('image'), (req, res) => {
  const { heading, intro } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;

  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  data.push({ heading, intro, image: imageUrl });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data));

  res.json({ success: true, message: 'Uploaded successfully.' });
});

app.get('/gallery', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running at node server.js:${PORT}`);
});