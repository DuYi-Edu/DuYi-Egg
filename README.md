# 提取通用模型

<img src="http://mdrs.yuanjin.tech/img/20200701154525.png" alt="image-20200701154525867" style="zoom:50%;" />

全局通用模型放到`app.locals`，通常在`app.js`中设置

上下文通用模型放到`ctx.locals`中，通常在中间件中设置

局部模型一般在具体的`action`中设置