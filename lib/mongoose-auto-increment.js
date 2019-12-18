'use strict';
let counterSchema = null;
let IdentityCounter = null;
/**
 * @param {Egg.Application} app egg application
 */
function init(app) {
  const { mongoose } = app;
  const { Schema } = mongoose;
  try {
    IdentityCounter = mongoose.model('IdentityCounter');
  } catch (ex) {
    if (ex.name === 'MissingSchemaError') {
      counterSchema = new Schema({
        model: { type: String, require: true },
        field: { type: String, require: true },
        count: { type: Number, default: 0 },
        prefix: String,
      });
      counterSchema.index({ field: 1, model: 1, prefix: 1 }, { unique: true });
      IdentityCounter = mongoose.model('IdentityCounter', counterSchema);
    } else {
      throw ex;
    }
  }
}
/**
 * @param {Egg.Application} app egg application
 * @param {Object} schema mongoose schema
 * @param {{model:String,field:String,startAt:number,incrementBy:number,prefix: String }} options 参数{model ,field ,startAt ,incrementBy ,prefix}
 */
async function plugin(app, schema, options) {
  if (!counterSchema || !IdentityCounter) {
    init(app);
  }
  const settings = {
    model: null,
    field: '_id',
    startAt: 0,
    incrementBy: 1,
    prefix: '',
    padStartMaxLength: 0, // 生成序列的最小位数,小于时补0
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
      let prefix = '';
      switch (Object.prototype.toString.call(settings.prefix)) {
        case '[object String]':
          prefix = settings.prefix;
          break;
        case '[object Function]':
          prefix = settings.prefix();
          break;
        case '[object AsyncFunction]':
          prefix = await settings.prefix();
          break;
        default:
          throw new Error('prefix must be string or function or async function');
      }
      let index = await IdentityCounter.findOneAndUpdate(
        {
          model: settings.model,
          field: settings.field,
          prefix,
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
            prefix,
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
      this[settings.field] = index.prefix + String(index.count).padStart(settings.maxLength, '0');
      next();
    } else {
      next();
    }
  });
}
/**
 * @param {Egg.Application} app egg application
 */
module.exports = app => {
  app.mongooseFieldAutoIncrementPlugin = async (schema, options) => { await plugin(app, schema, options); };
};
