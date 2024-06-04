import mysql from 'mysql2/promise';
import moment from "moment";

type Input = {
    month: number,
    year: number,
    type: string,
}

type Output = {
    date: string,
    amount: number,
}
export default class GenerateInvoices {
    async execute(input: Input): Promise<Output[]> {
        const con = await mysql.createConnection({
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
            if(input.type === "cash") {
                const [payments, fields] = await con.query(
                    'select * from payment where id_contract = ?', [contract.id_contract]
                );
                for (const payment of payments) {
                    if(payment.date.getMonth() + 1 !== input.month || payment.date.getFullYear() !== input.year) continue;
                    output.push({
                        date: moment(payment.date).format("YYYY-MM-DD"),
                        amount: parseFloat(payment.amount)
                    });
                }
            }

            if(input.type === "accrual") {
                const [payments, fields] = await con.query(
                    'select * from payment where id_contract = ?', [contract.id_contract]
                );
                let period = 0;
                while (period <= contract.periods) {
                    const date = moment(contract.date).add(period++, 'months').toDate();
                    if(date.getMonth() + 1 !== input.month || date.getFullYear() !== input.year) continue;

                    const amount = parseFloat(contract.amount) / contract.periods;
                    output.push({
                        date: moment(date).format("YYYY-MM-DD"),
                        amount: amount
                    })
                }
            }

        }
        return output;
    }
}