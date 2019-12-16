'use strict';
let counterSchema;
let IdentityCounter;
const mongoose = require('mongoose');
class MongooseAutoIncrement {
  static Init() {
    try {
      IdentityCounter = mongoose.model('IdentityCounter');
    } catch (ex) {
      if (ex.name === 'MissingSchemaError') {
        counterSchema = new mongoose.Schema({
          model: { type: String, require: true },
          field: { type: String, require: true },
          count: { type: Number, default: 0 },
        });
        counterSchema.index({ field: 1, model: 1 }, { unique: true });

        IdentityCounter = mongoose.model('IdentityCounter', counterSchema);
      } else {
        throw ex;
      }
    }
  }
  /**
 * @param {Object} schema mongoose schema
 * @param {{model:String,field:String,startAt:number,incrementBy:number,prefix:String}} options 参数{model ,field ,startAt ,incrementBy ,prefix}
 */
  static async plugin(schema, options) {
    if (!counterSchema || !IdentityCounter) {
      this.Init();
    }
    const settings = {
      model: null,
      field: '_id',
      startAt: 0,
      incrementBy: 1,
      prefix: '',
      unique: true,
    };

    const fields = {};

    switch (typeof options) {
      case 'string':
        settings.model = options;
        break;
      case 'object':
        Object.assign(settings, options);
        break;
      default:
    }

    if (settings.model == null) {
      throw new Error('model must be set');
    }

    fields[settings.field] = {
      type: String,
      require: true,
    };
    if (settings.field !== '_id') {
      fields[settings.field].unique = settings.unique;
    }
    schema.add(fields);

    schema.pre('save', async function(next) {
      if (this.isNew) {
        let index = await IdentityCounter.findOneAndUpdate(
          {
            model: settings.model,
            field: settings.field,
          },
          {
            $inc: { count: settings.incrementBy },
          },
          {
            upsert: true,
            new: true,
          }
        ).lean();
        if (index.count < settings.startAt) {
          index = await IdentityCounter.findOneAndUpdate(
            {
              model: settings.model,
              field: settings.field,
            },
            {
              $inc: { count: settings.startAt },
            },
            {
              upsert: true,
              new: true,
            }
          ).lean();
        }
        this[settings.field] = `${settings.prefix}${index.count}`;
        next();
      } else {
        next();
      }
    });
  }
}
module.exports = MongooseAutoIncrement;
