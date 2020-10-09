const { client } = require("../jsconfig.json");
const cors = require('cors');

module.exports = async (app) => {
    // app.use(cors({
    //     //origin: "http://localhost:3000"
    //     credentials: true
    // }));
    app.use(cors())
}