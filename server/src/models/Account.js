import { getConnection } from "../database/mysql.js";

export default class Account {
	constructor ({id, groupId, userId}) {
		this.id = id;
		this.groupId = groupId;
		this.userId = userId;
	}

	static async init() {
		try {
			const connection = await getConnection();
			const query =`
            CREATE TABLE IF NOT EXISTS accounts (
                id INTEGER AUTO_INCREMENT NOT NULL,
                group_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (group_id) REFERENCES groups_tb (id),
                FOREIGN KEY (user_id) REFERENCES users (id)
            )`;

			await connection.query(query);

			console.log("Succesfully created 'accounts' table");
		} catch (error) {
			console.log("Could not init 'accounts' db", error);
			throw error;
		}
	}
}