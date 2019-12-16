'use strict';

const mock = require('egg-mock');

describe('test/mongoose-auto-increment.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/mongoose-auto-increment-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, mongooseAutoIncrement')
      .expect(200);
  });
});
