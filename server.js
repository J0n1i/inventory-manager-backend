require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const itemsRouter = require('./routes/items');
const cors = require('cors');


//connect to db
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.use(express.json());

const corsOptions = {
    origin: '*',
}

app.use(cors(corsOptions));

app.use('/items', itemsRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});