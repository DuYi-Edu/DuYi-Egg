> `egg`提供了许多钩子函数（Hook Function），用于在启动后的不同阶段处理一些事务

这些钩子函数需要配置在`app.js`中：

```js
// app.js
module.exports = class {
  constructor(app) {
    this.app = app;
  }
  //1. 配置文件即将加载，这是最后动态修改配置的时机
  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

    // 例如：服务器每次重启后，使用一个随机的字符串作为cookie加密秘钥，这样可以让之前的cookie强制过期
    this.app.config.keys += Math.random().toString(36).slice(-6);
  }

  //2. 文件加载完成
  async didLoad() {
    // 所有的配置已经加载完毕
    // 该函数可以是异步的

    // 例如：可以把最终的配置保存起来
    save(this.app.config);
  }

  //3. 插件启动完毕
  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未开启
    // 此时worker进程还没有开始工作
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
    // 该函数可以是异步的

    // 例如：根据配置，初始化保存用户上传文件的文件夹
    const dir = this.app.config.$uploadDir;
    if (!isExist(dir)) {
      mkdir(dir);
    }
  }

  //4. worker 准备就绪
  async didReady() {
    // 多个worker进程已开启
  }

  //5. 应用启动完成
  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
  }

  //6. 应用即将关闭
  async beforeClose() {}
};
```

**注意：在自定义生命周期函数中不建议做太耗时的操作，框架会有启动的超时检测。**
