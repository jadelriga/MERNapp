const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.port || 5000

app.use(cors());
app.use(express.json());

const db_uri = require('./database.json').uri

mongoose.connect(db_uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("Connected to data base!");
})

const usersRouter  = require('./routes/users');

app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}); 