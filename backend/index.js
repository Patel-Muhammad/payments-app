const express = require("express");
const mainRouter = require('./routes/index')
const cors = require('cors');
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/v1/', mainRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}...`)
})


