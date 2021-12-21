const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const path = require('path')



const { PORT, CONNECTION_URL} = require('./constants');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(routes)


app.get('/', (req, res) => {
    res.send('Api running')
})


mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((err) => console.log('Database connection error:', err.message))
