# 编写定时任务

有的时候，我们可能会希望定期做一些事情，比如：

- 定期更新缓存
- 定期删除一些不再使用的文件
- 定期检查数据库，删除无意义的数据
- 定期爬取一些数据，保存到数据库
- 等等

尽管我们完全可以通过`setInterval`来处理该问题，但在`egg`中，可以非常简单的完成该操作，你只需要在`app/schedule`文件夹中编写各种任务即可

`egg`启动后，会读取该文件夹中的所有模块，把它们的导出当做任务定期执行

## 方式1

```js
// app/schedule/cacheLocals
const Subscription = require("egg").Subscription;

module.exports = class extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: "1m", // 1 分钟间隔
      type: "all", // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    console.log("更新缓存");
    const key = "province";
    const resp = await this.app.axios.get(`${this.config.$apiBase}/api/local`);
    //缓存
    this.app.redis.set(key, JSON.stringify(resp.data));
  }
};
```

## 方式2

```js
module.exports = {
  schedule: {
    interval: '1m', // 1 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) { // task 是真正定时任务执行时被运行的函数
    console.log("更新缓存");
    const key = "province";
    const resp = await ctx.app.axios.get(`${ctx.app.config.$apiBase}/api/local`);
    //缓存
    ctx.app.redis.set(key, JSON.stringify(resp.data));
  },
}
```

# schedule配置

无论使用哪一种方式，都必须提供`schedule`属性来配置任务

- `interval`：字符串，描述任务执行的间隔时间。参考：https://github.com/vercel/ms

- `cron`：字符串，任务执行的契机，它和`interval`设置一个即可。

  参考：https://github.com/harrisiirak/cron-parser

  在线生成器：https://cron.qqe2.com/

  ```js
  "* */3 * * * * "  // 每隔3分钟执行一次
  "0 0 0 * * 3" // 每周3的凌晨执行一次
  "0 0 0 24 12 *" // 每年圣诞节执行一次
  ```

- `type`，任务类型，支持两种配置：

  - `worker`，只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的
  - `all`，每个 worker 都会执行这个定时任务。

- `immediate`，如果设置为`true`，应用启动时会立即执行该任务

- `env`，数组，只有在指定的环境中才会启动该任务

- `disable`，一个开关，表示任务是否被禁用



> 更多关于任务的操作参考：https://eggjs.org/zh-cn/basics/schedule.html