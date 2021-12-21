import { getConnection } from "../database/mysql.js";

export default class User {
	constructor({id, fullname, email, password}) {
		this.id = id;
		this.fullname = fullname;
		this.email = email;
		this.password = password;
	}

	static async init() {
		try {
			const connection = await getConnection();
			const query = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER AUTO_INCREMENT NOT NULL,
                fullname VARCHAR(255) NOT NULL,
                email VARCHAR (255) NOT NULL,
                password VARCHAR (60) NOT NULL,
                PRIMARY KEY (id),
                UNIQUE (email)
            )`;

			await connection.query(query);

			console.log("Succesfully created 'users' table");
		} catch (error) {
			console.log("Could not init 'users' db", error);
			throw error;
		}
	}
}

