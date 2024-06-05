import MySQLPromiseAdapter from "./infra/database/MySQLPromiseAdapter";
import ContractDatabaseRepository from "./domain/repository/ContractDatabaseRepository";
import LoggerDecorator from "./application/decorator/LoggerDecorator";
import GenerateInvoices from "./application/usecase/GenerateInvoices";
import JsonPresenter from "./infra/presenter/JsonPresenter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
import Mediator from "./infra/mediator/Mediator";
import SendEmail from "./application/usecase/SendEmail";

const connection = new MySQLPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection)
const mediator = new Mediator();
const sendMail = new SendEmail();
mediator.on("InvoicesGenerated", async function (data: any) {
    await sendMail.execute(data);
});
const generateInvoices = new LoggerDecorator(
    new GenerateInvoices(contractRepository, new JsonPresenter(), mediator)
);

const httpServer = new ExpressAdapter();
new MainController(httpServer, generateInvoices);
httpServer.listen(3000);