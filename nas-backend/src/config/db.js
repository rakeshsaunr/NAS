const mongoose = require('mongoose')

const connectDB = async () => {
    const mongoURI =
        process.env.MONGODB_URI ||
        'mongodb://127.0.0.1:27017/nasdb'

    try {
        await mongoose.connect(mongoURI, {
            maxPoolSize: 500
        })

        console.log('MongoDB Connected Successfully (Local)')
    } catch (error) {
        console.log('MongoDB Connection Failed:', error.message)
        process.exit(1)
    }
}

module.exports = { connectDB }