# koa-mount-hostname

  Mount other Koa applications as middleware on a specific hostname (subdomain).

## Installation

```js
$ npm install koa-mount-hostname
```

### Example

```js
const mountHostname = require('koa-mount-hostname');
const koa = require('koa');

// hello

const a = koa();

a.use(function *(next){
  this.body = 'Hello';
});

// world

const b = koa();

b.use(function *(next){
  this.body = 'World';
});

// app

const app = koa();

app.use(mountHostname('www.website1.com', a));
app.use(mountHostname(/^[a-z]+\.website2\.com$/i, b));

app.listen(3000);
```

## License

  MIT
