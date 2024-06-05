import MySQLPromiseAdapter from "./infra/database/MySQLPromiseAdapter";
import ContractDatabaseRepository from "./domain/repository/ContractDatabaseRepository";
import LoggerDecorator from "./application/decorator/LoggerDecorator";
import GenerateInvoices from "./application/usecase/GenerateInvoices";
import JsonPresenter from "./infra/presenter/JsonPresenter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";

const connection = new MySQLPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection)
const generateInvoices = new LoggerDecorator(
    new GenerateInvoices(contractRepository, new JsonPresenter())
);

const httpServer = new ExpressAdapter();
new MainController(httpServer, generateInvoices);
httpServer.listen(3000);