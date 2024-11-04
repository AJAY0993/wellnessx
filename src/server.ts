import app from './app'
import conneectDb from './configs/db'
const PORT = process.env.PORT || 3000
const startServer = async () => {
    try {
        console.log('Connecting to DB ...')
        await conneectDb()
        console.log('Connected to DB...')
        console.log('Starting server...')
        app.listen(PORT, () => console.log(`app is listening on port ${PORT}`))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

startServer()
