# egg-cluster

egg内置了一个插件`egg-cluster`，它的作用是在egg启动时，启动多个子进程

因此，egg实际上是运行在多个进程上的应用，这些进程的职责分别为：

- **主进程**，Master 进程：稳定性极高的进程，主要负责管理其他进程。因此，对于egg应用，无须使用`pm2`等工具。
- **worker进程**：由主进程开启，通常情况下数量和cpu的核数保持一致。worker进程是真正用于处理请求的进程。某次请求具体交给哪个worker进程来处理由主进程调度
- **Agent进程**：由主进程在启动后开启，只有一个，相当于其他进程的秘书，通常用于做各种脏活累活，比如维持一个长连接。agent进程通常对开发者是隐形的，我们平时并不会接触它。



# egg-scripts

`egg-scripts`能够提供一些命令，来启动和停止线上环境

1. 安装

   ```
   npm i egg-scripts
   ```

2. 配置脚本

   ```json
   {
     "scripts": {
       "start": "egg-scripts start --daemon",
       "stop": "egg-scripts stop"
     }
   }
   ```

3. 运行

   ```shell
   npm start # 启动
   npm run stop # 停止
   ```

   

启动命令中支持以下参数：

- `--title=name`，设置应用全名，默认为`egg-server-${APP_NAME}`

  - 在停止时，建议指定停止的egg应用名称，否则，如果服务器运行了多个egg应用，将会停止所有的egg应用

    ```
    egg-scripts stop --title=myegg-server
    ```

- `--port=7001` 端口号，默认会读取环境变量 `process.env.PORT`，如未传递将使用框架内置端口 `7001`。
- `--daemon` 是否允许以守护进程的模式运行。
- `--env=prod` 框架运行环境，默认会读取环境变量 `process.env.EGG_SERVER_ENV`， 如未传递将使用框架内置环境 `prod`。
- `--workers=2` 框架 worker 线程数，默认会创建和 CPU 核数相当的 app worker 数，可以充分的利用 CPU 资源。
- `--https.key` 指定 HTTPS 所需密钥文件的完整路径。
- `--https.cert` 指定 HTTPS 所需证书文件的完整路径。