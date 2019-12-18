import { Schema } from 'mongoose'
declare module 'egg' {
    interface pluginOptions {
        model: String,
        field?: String, // default: _id
        startAt?: number, // default: 0
        incrementBy?: number, // default: 1
        prefix?: String |Function |AsyncFunction // default: ""
        /**
         * padStart maxLength
         * eg: padStartMaxLength= 5 ---> 00005
         * default: 0
         */
        padStartMaxLength?: number,
        unique?: boolean, // default: true
    }
  export interface Application {
    mongooseFieldAutoIncrementPlugin(schema: Schema,options: pluginOptions ): void
  }
};