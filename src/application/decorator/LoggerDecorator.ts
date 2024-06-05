import UseCase from "../usecase/UseCase";

export default class LoggerDecorator implements UseCase {
    constructor(readonly usecase: UseCase) {
    }
    execute(input: any): Promise<any> {
        console.log(input.userAgent);
        console.log(input.host);
        return this.usecase.execute(input);
    }

}