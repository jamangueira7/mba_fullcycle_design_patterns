import Presenter from "./Presenter";
import {Output} from "./GenerateInvoices";

export default class JsonPresenter implements Presenter{
    present(output: Output[]): any {
        return output;
    }

}