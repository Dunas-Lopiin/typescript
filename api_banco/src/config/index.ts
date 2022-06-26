import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT,
    POSTGRES: {
        CONNECTION_STRING: process.env.POSTGRES_CONNECTION_STRING
    }
}   

export { config };