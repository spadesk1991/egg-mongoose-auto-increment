'use strict';
const Increment = require('../../lib/mongoose-auto-increment');
module.exports = {
  /**
   * @param {*} schema mongoose Schema
   * @param {{model:String,field:String,startAt:number,incrementBy:number,prefix:String}} option 参数
   */
  mongoPlugin(schema, option) {
    Increment.plugin(schema, option);
  },
};
