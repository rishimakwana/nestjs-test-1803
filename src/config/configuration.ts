import * as dotenv from 'dotenv';

export default () => {
    const result = dotenv.config({
        path: `.env.${process.env.NODE_ENV || 'dev'}`,
    });

    if (result.error) {
        throw new Error("Couldn't find .env file");
    }
    return {
        db: {
            database: process.env.DATABASE,
            username: process.env.DB_USER,
            dbPassword: process.env.DB_PASS,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT)
        },
        emailCred: {
            email: process.env.SEND_EMAIL,
            password: process.env.EMAIL_PASSWORD,
            back_office_email: process.env.BACK_OFFICE_EMAIL
        },
        common: {
            port: process.env.PORT,
            jwt: process.env.JWTKEY,
            jwtExpire: process.env.TOKEN_EXPIRATION
        },
    };
};
