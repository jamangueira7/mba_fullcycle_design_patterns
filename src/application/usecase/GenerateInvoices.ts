import moment, {months} from "moment";
import Presenter from "../presenter/Presenter";
import JsonPresenter from "../../infra/presenter/JsonPresenter";
import ContractRepository from "../repository/ContractRepository";
import UseCase from "./UseCase";
import Mediator from "../../infra/mediator/Mediator";

type Input = {
    month: number,
    year: number,
    type: string,
}

export type Output = {
    date: Date,
    amount: number,
}
export default class GenerateInvoices implements UseCase {

    constructor(
        readonly contractRepository: ContractRepository,
        readonly presenter: Presenter = new JsonPresenter(),
        readonly mediator: Mediator = new Mediator()
    ) {
    }
    async execute(input: Input): Promise<Output[]> {


        const output: Output[] = [];
        const contracts = await this.contractRepository.list();
        for (const contract of contracts) {
            const invoices = contract.generateInvoices(
                input.month,
                input.year,
                input.type
            );

            for (const invoice of invoices) {
                output.push({
                    date: invoice.date,
                    amount: invoice.amount
                })
            }
        }

        await this.mediator.public("InvoicesGenerated", output);
        return this.presenter.present(output);
    }
}