
import ContractRepository from "../../application/repository/ContractRepository";
import DatabaseConnection from "../../infra/database/DatabaseConnection";
import Contract from "../Contract";
import Payment from "../Payment";

export default class ContractDatabaseRepository implements ContractRepository {

    constructor(readonly connection: DatabaseConnection) {
    }
    async list(): Promise<Contract[]> {

        const contracts: Contract[] = [];
        await this.connection.connect();
        const [contractsData, fields] = await this.connection.query(
            "select * from branas.contract",
            []
        );

        // @ts-ignore
        for (const contractData of contractsData) {
            const contract = new Contract(
                contractData.id_contract,
                contractData.description,
                parseFloat(contractData.amount),
                contractData.periods,
                contractData.date
            );
            const [paymentsData, fields] = await this.connection.query(
                'select * from payment where id_contract = ?',
                [contract.idContract]
            );

            for (const paymentData of paymentsData) {
                contract.addPayment(new Payment(
                    paymentData.id_payment,
                    parseFloat(paymentData.amount),
                    paymentData.date,
                ));
            }
            // @ts-ignore
            contracts.push(contract);
        }

        return contracts;
    }

}