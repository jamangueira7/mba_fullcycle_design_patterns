import GenerateInvoices from "../src/GenerateInvoices";

test("Deve gerar as notas fiscais por regime de caixa", async function () {
    const generateInvoices = new GenerateInvoices();
    const input = {
        month: 1,
        year: 2024,
        type: 'cash'
    };
    const output = await generateInvoices.execute(input);
    console.log(output)
    expect(output.at(0)?.date).toBe("2024-01-05");
    expect(output.at(0)?.amount).toBe(6000);
});