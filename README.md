# 两种设置方式

框架有两种方式指定运行环境：

1. 通过 `config/env` 文件指定

   ```
   // config/env
   prod
   ```

2. 【推荐】通过 `EGG_SERVER_ENV` 环境变量指定运行环境更加方便，比如在生产环境启动应用：

   ```
   EGG_SERVER_ENV=prod egg-bin dev
   ```



# 获取运行环境

框架提供了变量 `app.config.env` 来表示应用当前的运行环境。

若没有指定`config/env`文件，同时也没有指定`EGG_SERVER_ENV`环境变量，`app.config.env`的值由`NODE_ENV`确定

确定的方式如下：

| NODE_ENV   | EGG_SERVER_ENV | 说明         |
| ---------- | -------------- | ------------ |
| 其他       | local          | 本地开发环境 |
| test       | unittest       | 单元测试     |
| production | prod           | 生产环境     |

# 针对环境的配置

egg支持下面这些配置

```
config
|- config.default.js
|- config.prod.js
|- config.unittest.js
|- config.local.js
```

`config.default.js` 为默认的配置文件，所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件。

当指定 env 时会同时加载对应的配置文件，并覆盖默认配置文件的同名配置。如 `prod` 环境会加载 `config.prod.js` 和 `config.default.js` 文件，`config.prod.js` 会覆盖 `config.default.js` 的同名配置

例如：

```js
// config/config.default.js
exports.cluster = {
  listen: {
    port: 7001,
  },
};

// config/config.prod.js
exports.cluster = {
  listen: {
    port: 5000,
  },
};

```

当为`local`环境时，会使用默认配置7001端口，而当为`prod`环境时，会使用`prod`配置的5000端口



有的时候，可能需要自定义环境，比如开发阶段，不同的开发者可能使用的开发环境有差异，尽管这很少见。

如果是这种情况，可以设置`EGG_SERVER_ENV`为一个自定义的值，然后配置相应值的`config`文件即可

```js
// package.json
{
	"scripts":{
		"dev": "EGG_SERVER_ENV=yuanjin egg-bin dev"
	}
}

// config/config.yuanjin.js
exports.cluster = {
  listen: {
    port: 6000,
  },
};
```

