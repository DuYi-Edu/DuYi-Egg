# 三层架构 + MVC

```mermaid
graph TD
UI[视图层 MVC]
UI --> 业务逻辑层
业务逻辑层 --> 数据访问层
```

# 在egg中使用数据库

egg支持多种方式操作数据库：

- mysql：https://eggjs.org/zh-cn/tutorials/mysql.html
- sequelize：https://eggjs.org/zh-cn/tutorials/sequelize.html
- mongoose：https://github.com/eggjs/egg-mongoose
- redis：https://github.com/eggjs/egg-redis

