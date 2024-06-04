import mysql from "mysql2/promise";
import ContractRepository from "./ContractRepository";

export default class ContractDatabaseRepository implements ContractRepository {
    async list(): Promise<any> {
        const con = await mysql.createConnection({
            host: "localhost",
            user: "root",
            port: 3306,
            password: "",
            database: "branas",
            jsonStrings: true
        });

        const [contracts, fields] = await con.query(
            'select * from contract', []
        );

        // @ts-ignore
        for (const contract of contracts) {

            const [payments, fields] = await con.query(
                'select * from payment where id_contract = ?', [contract.id_contract]
            );

            contract.payments = payments;
        }

        return contracts;
    }

}