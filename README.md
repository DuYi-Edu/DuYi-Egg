# 使用 koa 的异常处理模式

```js
// app.js
module.exports = (app) => {
  app.on("error", (err, ctx) => { // 和 koa 的异常处理类似
    console.log(err, ctx);
  });
};
```

# 使用 egg 的异常处理模式

为了更方便的处理常见的应用场景，egg内部使用了`egg-onerror`插件来处理异常

默认情况下，`egg-onerror`会对异常做出以下处理

| 请求需求的格式 | 环境             | errorPageUrl 是否配置 | 返回内容                                             |
| -------------- | ---------------- | --------------------- | ---------------------------------------------------- |
| HTML & TEXT    | local & unittest | -                     | onerror 自带的错误页面，展示详细的错误信息           |
| HTML & TEXT    | 其他             | 是                    | 重定向到 errorPageUrl                                |
| HTML & TEXT    | 其他             | 否                    | onerror 自带的没有错误信息的简单错误页（不推荐）     |
| JSON & JSONP   | local & unittest | -                     | JSON 对象或对应的 JSONP 格式响应，带详细的错误信息   |
| JSON & JSONP   | 其他             | -                     | JSON 对象或对应的 JSONP 格式响应，不带详细的错误信息 |

针对该插件，可以做出以下配置：

```js
// config/config.default.js
exports.onerror = { // 配置 egg-onerror 插件
  errorPageUrl: '/error',// 线上页面发生异常时，重定向到这个地址
  all(err, ctx) {
    // 在此处定义针对所有响应类型的错误处理方法
    // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    ctx.body = 'error';
    ctx.status = 500;
  },
  html(err, ctx) {
    // html hander
    ctx.body = '<h3>error</h3>';
    ctx.status = 500;
  },
  json(err, ctx) {
    // json hander
    ctx.body = { message: 'error' };
    ctx.status = 500;
  }
};
```



## 关于404

框架并不会将服务端返回的 404 状态当做异常来处理

如果开发者对404的状态码没有给予响应体，则egg会自动给予响应体，它的方式是：

- 当请求被框架判定为需要 JSON 格式的响应时，会返回一段 JSON：

  ```json
  { "message": "Not Found" }
  ```

- 当请求被框架判定为需要 HTML 格式的响应时，会返回一段 HTML：

  ```html
  <h1>404 Not Found</h1>
  ```

  

框架支持通过配置，将默认的 HTML 请求的 404 响应重定向到指定的页面。

```js
// config/config.default.js
exports.notfound = {
  pageUrl: '/404',
};
```

