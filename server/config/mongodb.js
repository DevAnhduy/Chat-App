require('dotenv').config({ path: root_path + '/.env' });

module.exports = {
    url: `mongodb+srv://sa:${process.env.MONGO_ATLAS_PASSWORD}@test1-evwhi.mongodb.net/${process.env.MONGO_ATLAS_DATABASE}?retryWrites=true&w=majority`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
}