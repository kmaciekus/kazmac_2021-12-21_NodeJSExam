import dotenv from "dotenv";

dotenv.config();

const {
    DO_HOST,
    DO_USER,
    DO_PSW,
    DO_DATABASE_CARS,
    DO_PORT
} = process.env;

export const mysqlConfig = {
    host: DO_HOST,
    user: DO_USER,
    password: DO_PSW,
    database: DO_DATABASE_CARS,
    port: DO_PORT,
};
