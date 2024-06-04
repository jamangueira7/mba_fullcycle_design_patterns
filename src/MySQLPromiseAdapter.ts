import mysql from "mysql2/promise";
import DatabaseConnection from "./DatabaseConnection";

export default class MySQLPromiseAdapter implements DatabaseConnection {
    con: any;
    constructor() {

    }
    async connect(): Promise<void> {
        this.con = await mysql.createConnection({
            host: "localhost",
            user: "root",
            port: 3306,
            password: "",
            database: "branas",
            jsonStrings: true
        });
    }
    async close(): Promise<void> {
        return await this.con.end();
    }

    async query(statement: string, params: any): Promise<any> {
        return await this.con.query(
            statement, params
        );
    }

}