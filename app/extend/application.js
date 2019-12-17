'use strict';
const Increment = require('../../lib/mongoose-auto-increment');
module.exports = {
  /**
   * @param {*} schema mongoose Schema
   * @param {{model:String,field:String,startAt:number,incrementBy:number,prefix:String}} option 参数
   * @param {Egg.Application} app egg application
   */
  mongoPlugin(schema, option, app = this) {
    Increment.plugin(app, schema, option);
  },
};
