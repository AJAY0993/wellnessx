import mongoose from 'mongoose'

const dbString = process.env.DB_STRING
const dbPassword = process.env.DB_PASSWORD
const dbUri = dbString.replace('<password>', dbPassword)
const connectDB = async () => {
    await mongoose.connect(dbUri)
    console.log('Connected to DATABASE')
}

export default connectDB
