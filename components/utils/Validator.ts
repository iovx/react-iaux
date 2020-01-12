type PatternMap = {
  [index: string]: RegExp;
}
/**
 *@author 往事如风AHA
 *提代一常用的正则表达的验证
 */
const Validator = function(settings: PatternMap) {
  this.settings = Object.assign(this.settings, settings || {});
  //预定义模式
  const pattern: PatternMap = {
    username: /^[\w\u4E00-\u9FA5]{5,15}$/,
    password: /^[\w!@#\$%\^&\*\(\)\-_\+\=\[\]\{\}\\]{5,14}$/,
    email: /^[a-zA-Z]{4,10}@([a-z0-9]{3,7})\.[a-z]{2,3}$/,
    account: /^[a-zA-Z]{4,10}@([a-z0-9]{3,7})\.[a-z]{2,3}$/,
    cellphone: /^1[3|4|5|7|8][0-9]\d{8}$/,
    ip: /([0-9]{1,3}\.){3}[0-9]/,
    cn: /[\u4E00-\u9FA5]+/,
    en: /^[a-zA-Z]+$/,
    letter: /[a-zA-Z]*/,
    num: /^[0-9]+$/,
    checkCode: /^[0-9a-zA-Z]{4}$/,
    punct: /[`~!@#\$%\^&\*\(\)\-_\+\=\[\]\{\}\\\:\;\；\'\"\<\|\>\,\.\/\?\。\、\，\？\！\￥\（\）\【\】]/g,
    space: /\s+/g,
    all: /.*/,
    '*': /.*/,
    len: /^.{0,244}$/,
  };
  this.pattern = pattern;
  this.get = function(name: string): RegExp | null {
    return this.pattern[name];
  };
};

Validator.prototype = {
  constructor: Validator,
  /**
   * 检测值是否匹配某个模式
   *@item  模式名   或  正则表达 式
   *@value 检查的值
   */
  check: function(item: string | RegExp, value: string): boolean {
    if (typeof item == 'string') {
      if (!this.hasPattern(item)) this.error('no pattern: ' + item);
      return this.pattern[item].test(value);
    } else if (this.isRegExp(item)) {
      return item.test(value);
    } else {
      this.error('wrong regexp expression: ' + item);
    }
    return false;
  },
  isRegExp: function(item: any): boolean {
    return typeof item === 'object' && item instanceof RegExp;
  },
  //判断两个值是否相等   @是否严格相等
  isEqual: function(v1: any, v2: any, oType: boolean = false): boolean {
    return oType ? v1 === v2 : v1 == v2;
  },
  //判断是否为空串
  isEmpty: function(v: string): boolean {
    return this.check(/^\s*$/g, v);
  },
  //过滤字符串中指定模式的字符串子列
  filter: function(str: string, pattern: string) {
    pattern = pattern == undefined || pattern == '' ? this.pattern.illeagal : pattern;
    return str.replace(pattern, '');
  },
  //去除所有空格
  trim: function(str: string): string {
    return str.replace(/\s*/g, '');
  },
  //去除右侧空格
  rtrim: function(str: string): string {
    return str.replace(/\b\s*?$/g, '');
  },
  //去除左侧空格
  ltrim: function(str: string): string {
    return str.replace(/^\s*?\b/g, '');
  },
  //添加自定义模式
  add: function(item: string, reg: RegExp) {
    if (this.hasPattern(item)) this.error('pattern exist:' + item);
    this.pattern[item] = reg;
    return this;
  },
  //判断含有相关模式
  hasPattern: function(item: string): boolean {
    for (let i in this.pattern) {
      if (i == item) return true;
    }
    return false;
  },
  //抛出异常
  error: function(msg: any): void {
    throw new TypeError(msg);
  },
};

export default Validator;
