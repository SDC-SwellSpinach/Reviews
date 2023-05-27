const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/', router);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});
