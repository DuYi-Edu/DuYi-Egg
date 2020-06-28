# 静态资源

默认情况下，`app/public`目录为静态资源目录，请求路径`/public/*`中`*`位置对应的请求将被映射到`app/public`目录

`egg`之所以能够映射静态资源，并非它本身具有这样的能力，而是它在内部使用了插件`egg-static`

> https://github.com/eggjs/egg-static

# 插件

<img src="http://mdrs.yuanjin.tech/img/image-20200623132312138.png" alt="image-20200623132312138" style="zoom:50%;" />

`egg`本身其实只是搭建了一个框架，拥有一套规范，更多的额外功能都是靠各种插件完成的

## 插件的命名

egg插件的命名规范为`egg-*`

比如，静态资源映射的插件名称为`egg-static`

## 插件的启用

安装好插件后，默认是没有启动该插件的，需要在`config/plugin.js`中启用插件

```js
module.exports = {
  插件名称: {
    enable: 是否启用,
    package: 插件在node_modules中的包名,
    path: 插件的绝对路径，与package配置互斥
  }
}
```

比如，对于`egg-static`插件，可以通过下面的配置启用它

```js
module.exports = {
  static: {
    enable: true,
    package: "egg-static"
  }
}

或

exports.static = {
  enable: true,
  package: "egg-static"
}
```

由于`egg-static`是一个内置插件，大部分内置插件都是自动启用的。同时，内置插件可以通过更加简单的方式进行启用和关闭

```js
exports.static = false;
```

## 插件的配置

`config/plugin.js`只是控制插件的启用和关闭，对于插件的配置需要在`config/config.default.js`中完成

这样做的逻辑理念是：集中配置，集中管理

不同的插件有不同的配置，需要阅读插件的官方文档

```js
exports.static = {
  // egg-static 的配置
}
```

