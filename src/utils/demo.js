'use strict'
export default class Set {
  constructor () {
    this.definition = '默认值'
  }

  /*
* 输入框input模版
*/
  inputTemplatefnd (val, a) {
    const inputTemplate = val + a

    return inputTemplate
  }

  /*
* textarea模版
*/
  textareaTemplatefnd (val, a) {
    const textareaTemplate =
      val + a + a
    return textareaTemplate
  }
}
