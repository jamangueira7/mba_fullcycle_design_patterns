import mysql from 'mysql2/promise';
import moment from "moment";

type Input = {
    month: number,
    year: number,
}

type Output = {
    date: string,
    amount: number,
}
export default class GenerateInvoices {
    async execute(input: Input): Promise<Output[]> {
        const con = await  mysql.createConnection({
            host: "localhost",
            user: "root",
            port: 3306,
            password: "",
            database: "branas",
            jsonStrings: true
        });

        const output: Output[] = [];

        const [contracts, fields]  = await con.query(
            'select * from contract', []
        );

        // @ts-ignore
        for (const contract of contracts) {
            const [payments, fields] = await con.query(
                'select * from payment where id_contract = ?', [contract.id_contract]
            );
            for (const payment of payments) {
                if(payment.date.getMonth() + 1 !== input.month || payment.date.getFullYear() !== input.year) continue;
                output.push({
                    date: moment(payment.date).format("YYYY-MM-DD"),
                    amount: parseFloat(payment.amount)
                })
            }
        }
        return output;
    }
}