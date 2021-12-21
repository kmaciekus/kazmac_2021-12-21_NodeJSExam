import { getConnection } from "../database/mysql.js";

export default class Bill {
	constructor ({id, groupId, amount, description}) {
		this.id = id;
		this.groupId = groupId;
		this.amount = amount;
		this.description = description;
	}

	static async init() {
		try {
			const connection = await getConnection();
			const query =`
            CREATE TABLE IF NOT EXISTS bills (
                id INTEGER AUTO_INCREMENT NOT NULL,
                group_id INTEGER NOT NULL,
                amount DECIMAL(16,2) NOT NULL,
                description TEXT NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (group_id) REFERENCES groups_tb (id)
            )`;

			await connection.query(query);

			console.log("Succesfully created 'bills' table");
		} catch (error) {
			console.log("Could not init 'bills' db", error);
			throw error;
		}
	}
}