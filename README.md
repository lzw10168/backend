## 前言

前后端项目目前已经部署到线上环境，大家可以通过以下地址进行访问：

**「掘掘记账本」在线预览：** http://cost.chennick.wang

> 测试账号：admin，测试密码：111111。也可以自行注册使用。

**「掘掘记账本」前端代码开源地址：** https://github.com/Nick930826/juejue-vite-h5

**「掘掘记账本」后端代码开源地址：** https://github.com/Nick930826/jue-diary-server

#### 使用到的软件下载地址

- VSCode：[下载地址](https://code.visualstudio.com/)

- DBeaver：[下载地址](https://github.com/dbeaver/dbeaver/releases)

- Postman：[下载地址](https://www.postman.com/downloads/)





## 为什么是 Node

为什么要选择 `Node` 进入全栈开发呢？很简单，作为前端，我们最熟悉的就是 `JS`，而 `Node` 赋予 `JS` 一些系统级的能力，这让我们学习 `Node` 时，不用再重新学习一门新的语言，只要你会 `JS`，结合本小册文档，以及合理的运用搜索引擎，你就能很好的入门 `Node`。

**Node 能做什么有趣的事情**

- 爬虫

- 工具

- 脚本

- 硬件

- 中台

- 通信

**Node 的就业情况**


## 小册设计思路

小册目的很明确，带一部分前端，从纯前端慢慢转变为伪全栈。为什么说是「伪全栈」呢？因为课程的深度不会涉及太多的性能相关的知识，如多集成、高并发、缓存优化、多进程部署之类的问题。这些都是需要你在课后自己去实践学习的内容。

> 如果真的有通过学习一门课程就变成大神，希望知道的同学，把这门课程推荐给我，我也想学。

先带大家拿起板砖🧱 ，敲开全栈的大门。知其然，而后使其然。

我们将会学习掌握下图流程：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b61a509885e41fbba4d955933907797~tplv-k3u1fbpfcp-zoom-1.image)

**需求分析**

项目的逻辑梳理，目的是为了下一步数据库设计做准备，需求分析和数据库设计其实是同步的，需要一边分析，一边设计。

**数据库设计**

本课程采用数据库为 `MySQL`，并且使用更加人性化的可视化工具 [DBeaver](https://dbeaver.io/)，更易于新手上手操作数据库。数据库的作用说简单了，就是为了存储数据，至于用什么技术，不必太过于拘泥，你也可以选择 `MongoDB`。

可视化界面如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3705d4385742472f926205780ed4d5bb~tplv-k3u1fbpfcp-zoom-1.image)

**服务端接口编写**

本课程采用 `Node` 的上层架构 [Egg.js](https://eggjs.org/zh-cn/)，它是由阿里研发维护的，并且是基于 `Koa` 开发，有着高度可扩展的插件机制，很多需求我们可以通过插件的形式来实现，大厂的使用率也很高，文档相对国人友好，学习成本较低。

这里有一份前端早早聊大会公开的各大公司团队的[技术选型](https://www.yuque.com/zaotalk/team/st#6edd)，可以看到 `Node` 这块技术栈，使用 `Egg.js` 的公司占不小的比例。并且大厂都会有自己的前端基建，多数情况下也是采用的 `Egg.js` 作为基础 `Node` 框架。

既然大厂都在使用 `Egg.js`，想要获得更强的竞争力，你需要好好地学习它。

我所在的公司也不例外，包括海报生成、二维码生成、截图服务、静态资源 `CDN` 服务都是基于 `Egg.js` 开发的。


**前端开发**

前端部分采用目前大厂最爱的 `React`，全程使用 `React Hook` 的形式编写。由于咱们做的是记账本，属于金融类项目，所以本小册采用的是 [ZarmUI](https://zarm.gitee.io/#/) 作为组件库。组件库的使用需要根据项目而定，比如你开发的是 `toB` 的管理后台类项目，建议采用 [Ant Design](https://ant-design.gitee.io/docs/react/introduce-cn)。

脚手架采用的是 `Vite2.0`，它在开发模式下的冷启动，让你真正体验到秒更新的快感。我认为 `esm` 的模块化规范会是未来的趋势，趁早学习，占据主动。

后续的章节会对 `Vite` 做一个详细全面的分析。

最终会带大家开发出一个 `toC` 项目，如下图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bcfa727648c4c73be85524e8b028550~tplv-k3u1fbpfcp-zoom-1.image)

**部署上线**

服务端的部署会教大家如何在服务器环境下安装 `MySQL`，前端和后端的代码，会通过 `pm2` 完成自动化部署，部署线上的前提条件是，需要你有一台云服务器。


> “以大多数人的努力程度之低，根本轮不到拼天赋。”
