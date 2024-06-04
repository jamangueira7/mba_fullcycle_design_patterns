import GenerateInvoices from "../src/GenerateInvoices";
import ContractRepository from "../src/ContractRepository";
import ContractDatabaseRepository from "../src/ContractDatabaseRepository";
import MySQLPromiseAdapter from "../src/MySQLPromiseAdapter";
import DatabaseConnection from "../src/DatabaseConnection";

let generateInvoices: GenerateInvoices;
let connection: DatabaseConnection;

beforeEach(() => {
    const contractRepository: ContractRepository = {
        async list(): Promise<any> {
            return [
                {
                    idContract: "",
                    description: "",
                    periods: 12,
                    amount: "6000",
                    date: new Date("2024-01-01T10:00:00"),
                    payments: [
                        {
                            idPayment: "",
                            idContract: "",
                            amount: 6000,
                            date: new Date("2024-01-05T10:00:00"),
                        },

                    ]
                }
            ]
        }
    }

    //sem DB
    //generateInvoices = new GenerateInvoices(contractRepository);
    //com DB
    connection = new MySQLPromiseAdapter();
    const contractDatabaseRepository = new ContractDatabaseRepository(connection)
    generateInvoices = new GenerateInvoices(contractDatabaseRepository);
});
test("Deve gerar as notas fiscais por regime de caixa", async function () {

    const input = {
        month: 1,
        year: 2024,
        type: 'cash'
    };
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2024-01-05");
    expect(output.at(0)?.amount).toBe(6000);
});

test("Deve gerar as notas fiscais por regime de competência", async function () {

    const input = {
        month: 1,
        year: 2024,
        type: 'accrual'
    };
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2024-01-01");
    expect(output.at(0)?.amount).toBe(500);
});

afterEach(async () => {
    await connection.close();
});