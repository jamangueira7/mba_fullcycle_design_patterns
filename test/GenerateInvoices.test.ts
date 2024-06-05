import GenerateInvoices from "../src/application/usecase/GenerateInvoices";
import ContractRepository from "../src/application/repository/ContractRepository";
import ContractDatabaseRepository from "../src/domain/repository/ContractDatabaseRepository";
import MySQLPromiseAdapter from "../src/infra/database/MySQLPromiseAdapter";
import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import CsvPresenter from "../src/infra/presenter/CsvPresenter";

let generateInvoices: GenerateInvoices;
let connection: DatabaseConnection;
let contractRepository: ContractRepository;

beforeEach(() => {
    /*let contractRepository: ContractRepository = {
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
    }*/

    //sem DB
    //generateInvoices = new GenerateInvoices(contractRepository);
    //com DB
    connection = new MySQLPromiseAdapter();
    contractRepository = new ContractDatabaseRepository(connection)
    generateInvoices = new GenerateInvoices(contractRepository);
});
test("Deve gerar as notas fiscais por regime de caixa", async function () {

    const input = {
        month: 1,
        year: 2024,
        type: 'cash'
    };
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toEqual(new Date("2024-01-05T10:00:00"));
    expect(output.at(0)?.amount).toBe(6000);
});


test("Deve gerar as notas fiscais por regime de competência por csv", async function () {

    const input = {
        month: 1,
        year: 2024,
        type: 'accrual',
        format: "csv"
    };

    const presenter = new CsvPresenter();
    const generateInvoices = new GenerateInvoices(
        contractRepository,
        presenter
    )
    const output = await generateInvoices.execute(input);
    expect(output).toBe("2024-01-01;500\n2024-01-01;200");
});


test("Deve gerar as notas fiscais por regime de competência mes 1", async function () {

    const input = {
        month: 1,
        year: 2024,
        type: 'accrual'
    };
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toEqual(new Date("2024-01-01T10:00:00"));
    expect(output.at(0)?.amount).toBe(500);
});

test("Deve gerar as notas fiscais por regime de competência mes 2", async function () {

    const input = {
        month: 2,
        year: 2024,
        type: 'accrual'
    };
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toEqual(new Date("2024-02-01T10:00:00"));
    expect(output.at(0)?.amount).toBe(500);
});

afterEach(async () => {
    await connection.close();
});