import express from "express";
import {createConnection} from "mysql2/promise";
import {config} from "dotenv";
import { mysqlConfig } from "./utils/config.js";
import User from "./models/User.js";
import Group from "./models/Group.js";
import Bill from "./models/Bill.js";
import Account from "./models/Account.js";
import userRouter from "./routes/user.js";

config();

const main = async () => {

	const connection = await createConnection(mysqlConfig);

	await User.init();
	await Group.init();
	await Bill.init();
	await Account.init();

	const app = express();

	app.use(express.json());

	app.use("/users", userRouter);

	app.sql = connection;

	app.listen(8080, () => {
		console.log("http://localhost:8080");
	});
};

main();
