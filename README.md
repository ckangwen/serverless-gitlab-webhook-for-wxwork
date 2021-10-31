# serverless-gitlab-webhook-for-wxwork

## 简介

本项目是基于腾讯云的serverless实现gitlab的webhook集成企业微信机器人消息通知

**提示**：考虑到安全性，本项目把云函数配置、群机器人的配置隐藏起来，所有本项目不能直接运行。



隐藏的配置如下

```javascript
// config.js

const wxWorkKey = 'xxx'
const GITLAB_EVENT_TOKEN = 'xxx'

exports.wxWorkKey = wxWorkKey
exports.GITLAB_EVENT_TOKEN = GITLAB_EVENT_TOKEN
```



```
# .env
TENCENT_APP_ID=xxx
TENCENT_SECRET_ID=xxx
TENCENT_SECRET_KEY=xxx
TENCENT_TOKEN=xxx
```







## 前置知识
1. serverless(本项目使用的是腾讯云)
2. gitlab的[webhook配置](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html)
3. [企业微信群机器人配置](https://work.weixin.qq.com/api/doc/90000/90136/91770)


## 快速开始

### 运行
``` bash
npm run dev
```



### 测试

为了验证代码是否正确，需要在`postman`上调用`http://localhost:9000/gitlab-webhook`，并填上mock参数，模拟gitlab的webhook的调用

gitlab触发webhook时会返回固定格式的数据，可以参考[Webhook events | GitLab](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html)



### 部署

在 `serverless.yml` 文件所在的项目根目录，运行以下指令，将会弹出二维码，直接扫码授权进行部署：

```bash
serverless deploy
```

> **说明**：如果鉴权失败，请参考 [权限配置](https://cloud.tencent.com/document/product/1154/43006) 进行授权。



### 查看状态

执行以下命令，查看您部署的项目信息：

```bash
serverless info
```

或者前往腾讯云serverless的控制卡查看



### 移除

可以通过以下命令移除 express-starter 应用

```bash
serverless remove
```
