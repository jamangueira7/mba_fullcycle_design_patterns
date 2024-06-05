import MySQLPromiseAdapter from "./MySQLPromiseAdapter";
import ContractDatabaseRepository from "./ContractDatabaseRepository";
import LoggerDecorator from "./LoggerDecorator";
import GenerateInvoices from "./GenerateInvoices";
import JsonPresenter from "./JsonPresenter";
import ExpressAdapter from "./ExpressAdapter";
import MainController from "./MainController";

const connection = new MySQLPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection)
const generateInvoices = new LoggerDecorator(
    new GenerateInvoices(contractRepository, new JsonPresenter())
);

const httpServer = new ExpressAdapter();
new MainController(httpServer, generateInvoices);
httpServer.listen(3000);