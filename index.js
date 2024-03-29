const express = require("express");

const dotenv = require('dotenv');
const dbConnect = require("./config/dbConnect");
dotenv.config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorHandler");
dbConnect();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use('/api/user', authRouter)
app.use(notFound);
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});