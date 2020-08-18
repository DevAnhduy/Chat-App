module.exports = {
    url: `mongodb+srv://sa:${process.env.MONGO_ATLAS_PASSWORD}@iot.ckvbw.mongodb.net/${process.env.MONGO_ATLAS_DATABASE}?retryWrites=true&w=majority`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
}