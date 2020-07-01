# 编写中间件

在egg中编写koa的中间件，需要满足一定的规范

在实际开发中，绝大部分中间件都是通过一个高阶函数得到的

```js
var myMiddleware = (options) => {
  return async function(ctx, next){
    ...
  }
}
  
// 使用
myMiddleware(配置对象); // 得到一个中间件
```

egg秉承了这种思想，并把它当做规范使用

你需要在`app/middleware`文件夹中编写中间件

```js
// app/middleware/mymid.js
module.exports = (options, app) => {
  // options是针对该中间件的配置，app是egg全局应用对象
  return async function(ctx, next){
    console.log("中间件开始", options);
    await next();
    console.log("中间件结束", options)
  }
}
```



# 应用中间件

在egg中，中间件的使用也是遵循规范的，它的使用分为两种，分别是**全局**和**局部**

## 全局中间件

全局中间件会在**所有**控制器处理之前运行

按照egg统一配置的原则，需要在`config/config.default.js`中配置中间件

```js
// config/config.default.js
// 配置全局中间件，数组中的字符串对应 app/middleware 中的文件名
// 数组中的顺序对应中间件的运行顺序
exports.middleware = ["mymid"];

// mymid 对应中间件的配置，该配置会传递到中间件的options参数中
exports.mymid = {
  a: 1,
  b: 2,
};
```

在中间件的配置中，有一部分是通用配置，通用配置会影响egg是否运行中间件，通用配置包括：

- enable：boolean，是否启用中间件
- match 和 ignore，分别表示匹配和忽略，它们均支持多种类型的配置方式
  - 字符串：当参数为字符串类型时，配置的是一个 url 的路径前缀，所有以配置的字符串作为前缀的 url 都会匹配上。 当然，你也可以直接使用字符串数组。
  - 正则：当参数为正则时，直接匹配满足正则验证的 url 的路径。
  - 函数：当参数为一个函数时，会将请求上下文传递给这个函数，最终取函数返回的结果（true/false）来判断是否匹配。

## 路由中间件

有些中间件并不需要全局使用，而是仅仅针对某个或某几个路由使用

此时，就不需要在`config/config.default.js`进行配置了，而是：

```js
module.exports = (app) => {
  const { router } = app;
  const mymid = app.middleware.mymid(配置); // 得到中间件
  router.get("/", mymid, "home.index"); // 仅在该路由中应用中间件
  router.get("/login", "user.login");
  router.post("/login", "user.handleLogin");
};
```

# 内置中间件

egg提供了一些内置的中间件，可通过`app.config.coreMiddlewares`查看

这些内置中间件将会和自定义的中间件配置合并，最终形成一个真正的中间件函数数组：`app.middleware`，真正起作用的是该数组中的函数



# 横切关注点(AOP)

<img src="http://mdrs.yuanjin.tech/img/20200701143941.png" alt="image-20200701143941918" style="zoom:50%;" />

