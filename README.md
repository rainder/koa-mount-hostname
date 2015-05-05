# koa-mount-hostname

  Mount other Koa applications as middleware on a specific hostname (subdomain).

## Installation

```js
$ npm install koa-mount-hostname
```

### Example

```js
var mountHostname = require('koa-mount-hostname');
var koa = require('koa');

// hello

var a = koa();

a.use(function *(next){
  this.body = 'Hello';
});

// world

var b = koa();

b.use(function *(next){
  this.body = 'World';
});

// app

var app = koa();

app.use(mountHostname('www.website1.com', a));
app.use(mountHostname('www.website2.com', b));

app.listen(3000);
```

## License

  MIT
