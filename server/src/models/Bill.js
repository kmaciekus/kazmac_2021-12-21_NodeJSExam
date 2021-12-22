import { getConnection } from "../database/mysql.js";

export default class Bill {
    constructor ({id, groupId, amount, description}) {
        this.id = id;
        this.groupId = groupId;
        this.amount = amount;
        this.description = description;
    }

    static async getAll(groupId) {
        try {
            const connection = await getConnection();
            const query = `
			SELECT * FROM bills WHERE group_id = ?`;
            const [bills] = await connection.query(query, [groupId]);
            if(!bills) return null;
            return bills;
        } catch (error) {
            console.log("Couldn't get bills", error);
            throw error;
        }
    }

    static async add({groupId, amount, description}) {
        try {
            const connection = await getConnection();
            const query = `
			INSERT INTO bills (group_id, amount, description)
			VALUES (?, ?, ?)`;
            const[{insertId}] = await connection.query(query, [groupId, amount, description]);
            return new Bill ({id: insertId, groupId, amount, description});
        } catch (error) {
            console.log(`Couldn't add bill to ${groupId}`, error);
            throw error;
        }
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