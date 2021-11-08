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
    getRulesHandlerNames(): string[];
}
declare class FormValidate implements IValidate {
    initValidate(data: Object | Object[], rules: RuleConfig): (string | boolean)[];
    addRuleHandler(name: string, handler: Function): void;
    removeRuleHandler(name: string): void;
    getRulesHandlerNames(): string[];
    required(val: any): boolean;
    chartRange(str: string, { min, max }: {
        min?: number;
        max?: number;
    }): boolean;
    minLength(str: string, min: number): boolean;
    maxLength(str: string, max: number): boolean;
    phone(phoneStr: number | string): boolean;
    email(emailStr: string): boolean;
}
export default FormValidate;
