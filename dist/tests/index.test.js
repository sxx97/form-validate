"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
var v = new index_1.default();
v.addRuleHandler('onlyFour', function (arr) {
    return arr.some(function (item) { return item != 4; });
});
v.removeRuleHandler('onlyFour');
test('验证数据是否正确', function () {
    expect(v.initValidate({ b: '13184xxxxxx', a: 'aa', c: [1, 3] }, {
        a: [{
                ruleName: 'required',
                errMsg: 'a不能为空',
            }],
        b: [
            {
                ruleName: 'required',
                errMsg: 'b不能为空',
            },
            {
                ruleName: 'chartRange',
                errMsg: '输入范围为4~8',
                params: {
                    min: 4,
                    max: 8
                }
            },
        ],
        c: [
            {
                ruleName: 'required',
                errMsg: 'c不能为空',
            },
            {
                ruleName: 'onlyFour',
                errMsg: '只能为4',
            }
        ]
    })).toStrictEqual([true, '输入范围为4~8']);
});
//# sourceMappingURL=index.test.js.map