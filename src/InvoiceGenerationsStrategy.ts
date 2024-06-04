import Contract from "./Contract";
import Invoice from "./Invoice";

export default interface InvoiceGenerationsStrategy {
    generate(
        contract: Contract,
        month: number,
        year: number
    ): Invoice[];
}