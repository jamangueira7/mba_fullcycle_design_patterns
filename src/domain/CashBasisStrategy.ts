import Invoice from "./Invoice";
import InvoiceGenerationsStrategy from "./InvoiceGenerationsStrategy";
import Contract from "./Contract";

export default class CashBasisStrategy implements InvoiceGenerationsStrategy {
    generate(contract: Contract, month: number, year: number): Invoice[] {
        const invoices: Invoice[] = [];
        for (const payment of contract.getPayments()) {
            if(
                payment.date.getMonth() + 1 !== month
                || payment.date.getFullYear() !== year
            ) continue;

            invoices.push(new Invoice(
                payment.date,
                payment.amount
            ));
        }
        return invoices;
    }
}