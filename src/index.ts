interface RuleConfig {
    [name: string]: {
        ruleName: string,
        params?: Object | [],
        errMsg: string
    }[]
}

interface IValidate {
    initValidate(data: Object | Object[], rules: RuleConfig): Array<boolean | string>
    addRuleHandler(name: string, handler: Function): void
    removeRuleHandler(name: string): void;
}

class FormValidate implements IValidate {

    handlerNames: string[]

    constructor() {
        this.handlerNames = ['required', 'chartRange', 'minLength', 'maxLength', 'phone', 'email'];
    }

    initValidate(data: Object | Object[], rules: RuleConfig) {
        let errMsgArr: string[] = [];
        for(let key in data) {
            if (rules.hasOwnProperty(key)) {
                const ruleConfigs = rules[key];
                for(let configKey in ruleConfigs) {
                    let rule = ruleConfigs[configKey];
                    if (this.handlerNames.includes(rule.ruleName)) {
                        if(this[rule.ruleName](data[key], rule.params)) {
                           errMsgArr.push(rule.errMsg);
                           break;
                        }
                    }
                }
            }
            if (errMsgArr.length > 0) {
                break;
            }
        }
        return [errMsgArr.length > 0, errMsgArr[0]];
    }

    addRuleHandler(name: string, handler: Function) {
        this[name] = handler;
        this.handlerNames.push(name);
    }

    removeRuleHandler(name: string) {
        delete this[name];
        this.handlerNames.splice(this.handlerNames.indexOf(name), 1);
    }

    required(val: any) {
        return !val || !val.toString().trim();
    }

    chartRange(str: string | number, {min, max}: {min?: number, max?: number}) {
        str = str.toString();
        return str.length < min || str.length > max;
    }

    minLength(str: string | number, min: number) {
        str = str.toString();
        return str.length < min;
    }

    maxLength(str: string | number, max: number) {
        str = str.toString();
        return str.length > max;
    }

    phone(phoneStr: number | string) {
        const regPhone = new RegExp("^0?1[3|4|5|6|7|8][0-9]\\d{8}$", "g");
        return !regPhone.test(phoneStr.toString());
    }

    email(emailStr: string) {
        const regEmail = new RegExp(
            "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
        );
        return regEmail.test(emailStr);
    }
}

export default FormValidate;
