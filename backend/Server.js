const express = require('express');
const {mongoose} = require('mongoose');
const cors = require('cors');
const UserAuthRouter = require('./router/UserAuthRouter');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5000;
const { MONGO_URI } = process.env;

app.use(express.json({extended: false}));
app.use(cors({origin: true, credentials: true}));

mongoose
    .connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Database was connected successfully\nThe Server was listening: http://localhost:${PORT}`);
        })
    }).catch((e) => console.log(e.message));

app.use('/', UserAuthRouter);