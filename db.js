const Mongoose = require('mongoose')
const localDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fh8wmme.mongodb.net/?retryWrites=true&w=majority`

const connectDB = async () => {
    await Mongoose.connect(
        localDB,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    console.log('MongoDB Connected')
}

module.exports = {
    connectDB
}