import express from "express";
import MySQLPromiseAdapter from "./MySQLPromiseAdapter";
import ContractDatabaseRepository from "./ContractDatabaseRepository";
import GenerateInvoices from "./GenerateInvoices";
import LoggerDecorator from "./LoggerDecorator";
import JsonPresenter from "./JsonPresenter";

const app = express();
app.use(express.json());

const connection = new MySQLPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection)
const generateInvoices = new LoggerDecorator(
    new GenerateInvoices(contractRepository, new JsonPresenter())
);

app.post("/generate_invoices", async function (req: any, res: any){
    const input = req.body;
    input.userAgent = req.headers["user-agent"];
    input.host = req.headers.host;
    const output = await generateInvoices.execute(input);
    res.json(output);
})
app.listen(3000, () => 'Server running on port 3000');