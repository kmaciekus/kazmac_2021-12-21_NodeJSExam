import { getConnection } from "../database/mysql.js";

export default class Group {
    constructor({id, name}) {
        this.id = id;
        this.name = name;
    }

    static async add(name) {
        try {
            const connection = await getConnection();
            const query = `
			INSERT INTO groups_tb (name)
			VALUES(?)`;

            const [{insertId}] = await connection.query(query,[name]);

            return new Group ({id: insertId, name});
        } catch (error) {
            console.log("Couldn't add group", error);
            throw error;
        }
    }

    static async init() {
        try {
            const connection = await getConnection();
            const query =`
            CREATE TABLE IF NOT EXISTS groups_tb (
				id INTEGER AUTO_INCREMENT NOT NULL,
				name VARCHAR(255) NOT NULL,
				PRIMARY KEY (id)
            )`;

            await connection.query(query);

            console.log("Succesfully created 'groups' table");
        } catch (error) {
            console.log("Could not init 'groups' db", error);
            throw error;
        }
    }
}