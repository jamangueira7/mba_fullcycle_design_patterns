import Presenter from "./Presenter";
import {Output} from "./GenerateInvoices";
import moment from "moment";

export default class CsvPresenter implements Presenter{
    present(output: Output[]): any {
        const lines: any[] = [];
        for (const data of output) {
            const line: string[] = [];
            line.push(moment(data.date).format("YYYY-DD-MM"));
            line.push(`${data.amount}`);
            lines.push(line.join(";"));
        }
        return lines.join("\n");
    }

}