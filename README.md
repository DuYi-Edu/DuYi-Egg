# 中间服务器的常见职责

场景1：代替传统后端服务器，托管静态资源、动态渲染页面、提供少量api访问

![image-20200628113628733](http://mdrs.yuanjin.tech/img/image-20200628113628733.png)

场景2：托管单页应用程序的静态资源、提供各种数据api

![image-20200628113828783](http://mdrs.yuanjin.tech/img/image-20200628113828783.png)

# egg中的模板引擎

如果要使用传统的方式进行服务端渲染，就需要用到模板引擎

egg内置了插件`egg-view`，它本身不是模板引擎，但它可以对不同的模板引擎统一配置、统一处理

你需要安装具体的模板引擎插件，完成模板引擎的启用

> https://github.com/eggjs/egg-view

## 安装模板引擎插件

`egg-view`支持多种模板引擎，用的较多是`egg-view-nunjucks`和`egg-view-ejs`

```shell
npm i egg-view-ejs
```

> https://github.com/eggjs/egg-view-ejs

## 启用模板引擎插件

```js
// config/plugin.js
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
}
```

## 统一配置

`egg`启用后，会自动加载插件`egg-view`，`egg-view`会读取配置中的`view`配置，来使用你指定的模板引擎

```js
//config/config.default.js
exports.view = { // 该配置会被 egg-view 读取
  root: "模板所在的根目录", // 告诉egg-view到哪里去寻找模板，多个绝对路径使用逗号分割，默认 /app/view
  cache: true, // 是否在启动时缓存模板路径，以提高效率，默认开启
  mapping: { // 映射配置，将不同的模板后缀映射到对应的模板引擎处理
    ".ejs": "ejs",
    ".html": "ejs"
  },
  defaultViewEngine: "ejs", //如果映射找不到对应的模板引擎，将使用该值作为默认使用的模板引擎
  defaultExtension: ".ejs", //后续在controller中渲染模板时，默认渲染的模板后缀名
}
```

## 渲染页面

配置好模板引擎后，即可在`app/view`中书写各种模板

当某个请求到达后，如果需要经过模板渲染页面，只需要在`action`中使用对应代码即可

```js
render(name, model) // 渲染模板文件, 并赋值给 ctx.body
renderView(name, model) // 渲染模板文件, 仅返回不赋值
renderString(tpl, model) // 渲染模板字符串, 仅返回不赋值
```

在渲染时，它将按照`view`的配置进行处理

此时，已形成完整的`MVC`模式

<img src="http://mdrs.yuanjin.tech/img/image-20200628115800004.png" alt="image-20200628115800004" style="zoom:50%;" />

