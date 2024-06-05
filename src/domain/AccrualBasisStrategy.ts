import moment from "moment";

import Invoice from "./Invoice";
import Contract from "./Contract";
import InvoiceGenerationsStrategy from "./InvoiceGenerationsStrategy";

export default class AccrualBasisStrategy implements InvoiceGenerationsStrategy {
    generate(contract: Contract, month: number, year: number): Invoice[] {
        const invoices: Invoice[] = [];

        let period = 0;
        while (period <= contract.periods) {
            const date = moment(contract.date).add(period++, 'months').toDate();
            if(
                date.getMonth() + 1 !== month
                || date.getFullYear() !== year
            ) continue;

            const amount = contract.amount / contract.periods;
            invoices.push(new Invoice(
                date,
                amount
            ));
        }

        return invoices;
    }
}