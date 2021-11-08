interface RuleConfig {
    [name: string]: {
        ruleName: string;
        params?: Object | [];
        errMsg: string;
    }[];
}
interface IValidate {
    initValidate(data: Object | Object[], rules: RuleConfig): Array<boolean | string>;
    addRuleHandler(name: string, handler: Function): void;
    removeRuleHandler(name: string): void;
}
declare class FormValidate implements IValidate {
    handlerNames: string[];
    constructor();
    initValidate(data: Object | Object[], rules: RuleConfig): (string | boolean)[];
    addRuleHandler(name: string, handler: Function): void;
    removeRuleHandler(name: string): void;
    required(val: any): boolean;
    chartRange(str: string | number, { min, max }: {
        min?: number;
        max?: number;
    }): boolean;
    minLength(str: string | number, min: number): boolean;
    maxLength(str: string | number, max: number): boolean;
    phone(phoneStr: number | string): boolean;
    email(emailStr: string): boolean;
}
export default FormValidate;
