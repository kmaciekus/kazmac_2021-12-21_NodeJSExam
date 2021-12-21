import { getConnection } from "../database/mysql.js";

export default class Group {
	constructor({id, name}) {
		this.id = id;
		this.name = name;
	}

	static async init() {
		try {
			const connection = await getConnection();
			const query =`
            CREATE TABLE IF NOT EXISTS groups_tb (
				id INTEGER AUTO_INCREMENT NOT NULL,
				name VARCHAR(255) NOT NULL,
				PRIMARY KEY (id),
				UNIQUE(name)
            )`;

			await connection.query(query);

			console.log("Succesfully created 'groups' table");
		} catch (error) {
			console.log("Could not init 'groups' db", error);
			throw error;
		}
	}
}