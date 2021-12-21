const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const { PORT, DB_CONNECTION_URL } = require('./constants');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.get('/', (req, res) => {
//     res.json({ text: 'its working' })
// })

app.use(routes)

mongoose.connect(DB_CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((err) => console.log('Database connection error:', err.message))
