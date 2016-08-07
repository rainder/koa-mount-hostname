'use strict';


var debug = require('debug')('koa-mount-subdomain');
var compose = require('koa-compose');

module.exports = mountHostname;

/**
 * Mount `app` with `hostname`, `app`
 * may be a Koa application or
 * middleware function.
 *
 * @param {String|RegExp} hostname, app, or function
 * @param {Application|Function} [app or function]
 * @return {Function}
 * @api public
 */

function mountHostname(hostname, app) {
  // compose
  const downstream = app.middleware
    ? compose(app.middleware)
    : app;

  debug('mount %s %s', hostname, app.name || 'unnamed');

  return function *(upstream) {
    if (typeof hostname === 'string') {
      if (hostname !== this.hostname) {
        return yield* upstream;
      }
    }

    if (hostname instanceof RegExp) {
      if (!hostname.test(this.hostname)) {
        return yield* upstream;
      }
    }


    debug('enter %s', hostname);

    yield* downstream.call(this, function *() {
      yield* upstream;
    }.call(this));

    debug('leave %s', hostname);
  }
}
