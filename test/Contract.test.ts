import Contract from "../src/domain/Contract";
import Payment from "../src/domain/Payment";

test("Deve calcular o saldo do contrato", async function () {

    const contract = new Contract(
      "",
      "",
        6000,
        12,
        new Date("2024-01-01T10:00:00")
    );

    contract.addPayment(
        new Payment(
            "",
            2000,
            new Date("2024-01-01T10:00:00")
        )
    )
    expect(contract.getBalance()).toBe(4000);
});

test("Deve gerar faturas de um contrato", async function () {

    const contract = new Contract(
        "",
        "",
        6000,
        12,
        new Date("2024-01-01T10:00:00")
    );

    const invoices = contract.generateInvoices(1, 2024, "accrual");
    expect(invoices.at(0)?.date).toEqual(new Date("2024-01-01T13:00:00.000Z"));
    expect(invoices.at(0)?.amount).toBe(500);
});