import { getConnection } from "../database/mysql.js";

export default class Account {
    constructor ({id, groupId, userId}) {
        this.id = id;
        this.groupId = groupId;
        this.userId = userId;
    }

    static async getGroups (userId) {
        try {
            const connection = await getConnection();
            const query = `
			SELECT grp_tb.name as groupName
			FROM accounts AS acc
				LEFT JOIN groups_tb AS grp_tb ON grp_tb.id = acc.group_id
				WHERE acc.user_id = ?
			`;
            const [data] = await connection.query(query, [userId]);
            if(!data) return null;
            return data;
			
        } catch (error) {
            console.log("Couldn't find groups", error);
            throw error;
        }
    }
	
    static async add({groupId, userId}) {
        try {
            const connection = await getConnection();
            const query = `
			INSERT INTO accounts (group_id, user_id)
			VALUES (?, ?)`;
            const [{insertId}] = await connection.query(query, [groupId, userId]);

            return new Account({id: insertId, groupId, userId});
        } catch (error) {
            console.log("Could not create 'account' ", error);
            throw error;
        }
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