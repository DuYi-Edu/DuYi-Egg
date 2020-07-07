> egg在内部使用`egg-logger`插件完成日志记录

# 日志路径

默认情况下，日志保存在`根目录/logs/工程名`中

可以通过下面的配置自定义日志路径

```js
exports.logger = {
  dir: '/var/logs/egg-logs',
};
```

> 建议根据环境的不同配置不同的日志路径
>
> 开发环境可以保持不变
>
> 生产环境放到系统统一的日志目录中

# 日志分类

egg的内置日志分为下面几类，通过相关api即可完成日志记录

|    类别    |    输出目标    |        含义         |                api                 |
| :--------- | :------------- | :------------------ | :--------------------------------- |
| **appLogger** | **项目名-web.log** | **应用相关日志** |   **ctx.logger<br />app.logger**   |
| coreLogger |  egg-web.log   | 框架内核、插件日志  | ctx.coreLogger<br>app.coreLogger |
| errorLogger | common-error.log | error级别的日志均会记录到这里 | 详见日志级别 |
| agentLogger | egg-agent.log | agent的进程日志 | agent.logger |

无论使用哪个`api`记录日志，都会有对应的**日志级别**，分别是

```js
日志对象.debug("some info"); // 记录调试信息
日志对象.info("some info"); // 记录普通信息
日志对象.warn("some info"); // 记录警告信息
日志对象.error(new Error("some info")); // 记录错误信息，应该使用错误对象，否则无法得到堆栈信息
```

# 日志配置

```js
// 配置文件
exports.logger = {
  // 配置日志文件的目录
  dir: '/var/logs/egg-logs',
  // 配置不同类别的日志对应的文件名
  appLogName: 'duyi-app-web.log',
  coreLogName: 'egg-web.log',
  agentLogName: 'egg-agent.log',
  errorLogName: 'common-error.log',
  // 配置哪些级别及其以上的日志要被记录到日志文件，设置为NONE则会关闭日志记录，默认为 INFO
  level: 'DEBUG', 
  // 配置哪些级别及其以上的日志要被打印到控制台，设置为NONE则会关闭日志记录，默认为 INFO
  consoleLevel: 'DEBUG'
  // 配置日志文件的编码，默认为 utf-8
  encoding: 'gbk',
  // 是否使用json格式记录日志，默认为false
  outputJSON: true,
};
```

# 自定义日志

使用自定义日志可以增加日志的类别

```js
// 配置文件
// 配置自定义日志类别
exports.customLogger = {
    myLogger: { // 属性名为类别名称
      file: path.resolve(__dirname, "../logs/my-logger.log"), // 配置日志文件
      // 配置哪些级别及其以上的日志要被记录到日志文件，设置为NONE则会关闭日志记录，默认为 INFO
      level: 'DEBUG', 
      // 配置哪些级别及其以上的日志要被打印到控制台，设置为NONE则会关闭日志记录，默认为 INFO
      consoleLevel: 'DEBUG',
      // 配置日志文件的编码，默认为 utf-8
      encoding: 'gbk',
      // 是否使用json格式记录日志，默认为false
      outputJSON: true,
      // app logger
      formatter(meta) {
          return `[${meta.date}] ${meta.message}`;
      },
      // ctx logger
      contextFormatter(meta) {
      	return `[${meta.date}] [${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
      },
    }
}
```

记录自定义日志：

```js
app.getLogger('myLogger') // 获取全局应用日志对象
ctx.getLogger('myLogger') // 获取上下文日志对象
```

> schedule的日志就是一个自定义日志，日志类别名为`scheduleLogger`

> 更多日志的功能参考：https://eggjs.org/zh-cn/core/logger.html

