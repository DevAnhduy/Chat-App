const express = require('express');
const app = express();
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.port || 3001;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

fs.readdir('./src/routes',(err,routes) => {
    if(err) console.log(err);
    else {
        routes.forEach( async route => {
            const require_route = await require(`./src/routes/${route}`);
            app.use(require_route);
        })
    }
})
mongoose.connect(`mongodb+srv://sa:${process.env.MONGO_ATLAS_PASSWORD}@test1-evwhi.mongodb.net/${process.env.MONGO_ATLAS_DATABASE}?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());
app.use(body_parser.raw());

mongoose.Promise = global.Promise;
global.root_path = require.main.path;

app.listen(port, () => console.log(`Server started on:  ${port}`));