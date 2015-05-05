'use strict';


var debug = require('debug')('koa-mount-subdomain');
var compose = require('koa-compose');

module.exports = mountHostname;

/**
 * Mount `app` with `hostname`, `app`
 * may be a Koa application or
 * middleware function.
 *
 * @param {String|Application|Function} hostname, app, or function
 * @param {Application|Function} [app or function]
 * @return {Function}
 * @api public
 */

function mountHostname(hostname, app) {
  if ('string' != typeof hostname) {
    app = hostname;
    hostname = '';
  }

  // compose
  var downstream = app.middleware
    ? compose(app.middleware)
    : app;

  // don't need to do mounting here
  if ('' == hostname) return downstream;

  var name = app.name || 'unnamed';
  debug('mount %s %s', hostname, name);

  return function *(upstream){
    if (this.hostname !== hostname) return yield* upstream;

    debug('enter %s', hostname);

    yield* downstream.call(this, function *(){
      yield* upstream;
    }.call(this));

    debug('leave %s', hostname);
  }
}
