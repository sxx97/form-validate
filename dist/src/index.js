"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormValidate = /** @class */ (function () {
    function FormValidate() {
        this.handlerNames = ['required', 'chartRange', 'minLength', 'maxLength', 'phone', 'email'];
    }
    FormValidate.prototype.initValidate = function (data, rules) {
        var errMsgArr = [];
        for (var key in data) {
            if (rules.hasOwnProperty(key)) {
                var ruleConfigs = rules[key];
                for (var _i = 0, ruleConfigs_1 = ruleConfigs; _i < ruleConfigs_1.length; _i++) {
                    var rule = ruleConfigs_1[_i];
                    if (this.handlerNames.includes(rule.ruleName)) {
                        if (this[rule.ruleName](data[key], rule.params)) {
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
    };
    FormValidate.prototype.addRuleHandler = function (name, handler) {
        this[name] = handler;
        this.handlerNames.push(name);
    };
    FormValidate.prototype.removeRuleHandler = function (name) {
        delete this[name];
        this.handlerNames.splice(this.handlerNames.indexOf(name), 1);
    };
    FormValidate.prototype.required = function (val) {
        return !val || !val.toString().trim();
    };
    FormValidate.prototype.chartRange = function (str, _a) {
        var min = _a.min, max = _a.max;
        str = str.toString();
        return str.length < min || str.length > max;
    };
    FormValidate.prototype.minLength = function (str, min) {
        str = str.toString();
        return str.length < min;
    };
    FormValidate.prototype.maxLength = function (str, max) {
        str = str.toString();
        return str.length > max;
    };
    FormValidate.prototype.phone = function (phoneStr) {
        var regPhone = new RegExp("^0?1[3|4|5|6|7|8][0-9]\\d{8}$", "g");
        return !regPhone.test(phoneStr.toString());
    };
    FormValidate.prototype.email = function (emailStr) {
        var regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        return regEmail.test(emailStr);
    };
    return FormValidate;
}());
exports.default = FormValidate;
//# sourceMappingURL=index.js.map