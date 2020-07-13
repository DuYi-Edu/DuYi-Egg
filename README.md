> `egg-passport`插件提供了统一的鉴权方案
>
> 它极大的简化了第三方登录的流程
>
> 本节课仅讲解使用，原理部分见课程：「第三方接口」
>
> 官网文档：https://eggjs.org/zh-cn/tutorials/passport.html

# 安装

```shell
npm i egg-passport
npm i egg-passport-github
```

# 配置

```js
// config/plugin.js
exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportGithub = {
  enable: true,
  package: 'egg-passport-github',
};
```

```js
// config/config.default.js
exports.passportGithub = {
  key: 'your_clientID', // 见第三步
  secret: 'your_clientSecret', // 见第三步
  callbackURL: '/passport/github/callback', // 这是默认值，会影响第三步
};
```

```js
// app/router.js
module.exports = app => {
  const { router, controller } = app;

  // 挂载鉴权路由
  app.passport.mount('github');

  // 上面的 mount 是语法糖，等价于
  // const github = app.passport.authenticate('github', {});
  // router.get('/passport/github', github);
  // router.get('/passport/github/callback', github);
}
```



# 创建应用

新建`github`应用：https://github.com/settings/applications/new

查看`github`应用：https://github.com/settings/applications

创建应用时，`Authorization callback URL`一项，必须和第二步中的配置一致

```
http://127.0.0.1:7001/passport/github/callback
```

创建应用后，会得到`Client ID`和`Client Secret`，把它们填入第二步的配置中

# API

用户的授权地址默认为：`/passport/<strategy>`，比如`/passport/github`

无论你是使用哪一种第三方接口，最终的API都是统一的

- `ctx.user` - 获取当前已登录的用户信息
- `ctx.isAuthenticated()` - 检查该请求是否已授权
- `ctx.logout()` - 退出，将用户信息从 session 中清除

> 更多的api见：https://eggjs.org/zh-cn/tutorials/passport.html#api

