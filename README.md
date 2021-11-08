### 用法
* 表单对象通过`initValidate`方法进行验证
* `initValidate`返回一个数组`[validateResult, errMsg]`
    * 第一个值对应验证结果，为`true`则说明验证不通过，存在需要更改的内容
    * 第二值是给出的错误提示，当第一个值为`true`后需要返回出来的错误
* `initValidate`方法有两个参数： `initValidate(data, rules)`
    * `data`是要验证的表单数据
    * `rules`是规则
        * `rules`的属性名对应`data`的属性名
        * `rules`的键值对应详解
      ```json
        {
            ruleName: 'chartRange',  // 规则名称
            errMsg: '输入范围为4~8',  // 错误后的提示
            params: {   // 规则方法会接受到的参数
                min: 4,
                max: 8
            }
        }
```
```js
import FormValidate from "only-validate";

const v = new FormValidate();
const [res, msg] = v.initValidate({b: '13184xxxxxx', a: 'aa', c: [1, 3]}, {
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
})
if (res) {
    alert(msg);
}   
```
### 添加/删除自定义规则处理方法
  * 可通过`addRuleHandler`增加自定义规则处理，如果出现同名方法则后出现的覆盖掉之前的方法
 例子
  * `addRuleHandler`需在验证表单前增加
  * `removeRuleHandler`删除规则验证方法

  ```js
import FormValidate from "only-validate";

const v = new FormValidate();
// 添加
v.addRuleHandler('onlyFour', arr => {
    return arr.some(item => item != 4);
})
// 删除
v.removeRuleHandler('onlyFour')
```
