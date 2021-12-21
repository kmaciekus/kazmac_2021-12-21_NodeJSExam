import express from "express";
import {createConnection} from "mysql2/promise";
import {config} from "dotenv";
import User from "./models/User.js";
import Group from "./models/Group.js";
import Bill from "./models/Bill.js";
import Account from "./models/Account.js";

config();

const main = async () => {
	const {MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PW, MYSQL_DB} = process.env;

	const connection = await createConnection({
		host: MYSQL_HOST,
		port: MYSQL_PORT,
		user: MYSQL_USER,
		password: MYSQL_PW,
		database: MYSQL_DB,
	});

	await User.init();
	await Group.init();
	await Bill.init();
	await Account.init();

	const app = express();

	app.use(express.json());

	app.sql = connection;

	app.listen(8080, () => {
		console.log("http://localhost:8080");
	});
};

main();
