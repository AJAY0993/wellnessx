declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_STRING: string
            NODE_ENV: 'development' | 'production'
            DB_PASSWORD: string
            JWT_SECRET: string
            GMAIL_PASSWORD: string
            GMAIL: string
        }
    }
}

export {}
