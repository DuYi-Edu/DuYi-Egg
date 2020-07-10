# 插件文件夹结构

```
插件文件夹
├── package.json
├── app.js (可选)
├── app
│   ├── extend (可选)
│   |   ├── helper.js (可选)
│   |   ├── request.js (可选)
│   |   ├── response.js (可选)
│   |   ├── context.js (可选)
│   |   ├── application.js (可选)
│   ├── service (可选)
│   └── middleware (可选)
├── config
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.local.js (可选)
└── test
```

插件文件夹可以独立成一个工程，也可以放到主工程的`lib/plugin`中


# 插件的注意事项

值得注意的是：

- 插件没有独立的 router 和 controller

- 插件没有 `plugin.js`

- 插件需要在 `package.json` 中的 `eggPlugin` 节点指定插件特有的信息：

  - `{String} name` - 插件名（必须配置），具有唯一性，配置依赖关系时会指定依赖插件的 name。
  - `{Array} dependencies` - 当前插件强依赖的插件列表（如果依赖的插件没找到，应用启动失败）。
  - `{Array} optionalDependencies` - 当前插件的可选依赖插件列表（如果依赖的插件未开启，只会 warning，不会影响应用启动）。
  - `{Array} env` - 只有在指定运行环境才能开启

  ```json
  {
    "name": "egg-rpc",
    "eggPlugin": {
      "name": "rpc",
      "dependencies": [ "registry" ],
      "optionalDependencies": [ "vip" ],
      "env": [ "local", "test", "unittest", "prod" ]
    }
  }
  ```