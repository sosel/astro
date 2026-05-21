---
title: "苹果内购GPT的票据无限订阅PLUS PRO的BUG"
categories: Ai
tags: ['BUG']
id: "77e21d6607870811"
date: 2026-04-21 16:26:00
cover: "封面图URL (为空默认随机内置封面 /public/assets/images/banner)"
---

:::note
本该车自网络，可信度自行研究，我觉得这个只是AI写的，并没有实际能实现，大家就当娱乐一下吧。
:::
这俩天被杀的号基本是这类开出来的号，所以openai已经在处理了
那我就讲讲其原理，不建议大家实践，可能后台已经补上票据验证了

**第一步：利用土耳其区低价区 Apple ID 来买票据**

目前土耳其区 ChatGPT Plus 定价为 499 里拉/月，折合人民币约 85 元。相比国内常规渠道 140-150 元的开卡成本，这里存在巨大的套利空间。
操作十分简单：准备好充足的土区 Apple 礼品卡，往一个土耳其区的 Apple ID 里充好备用。

**第二步：配置网络拦截，扣留支付收据**

在 iPhone 上打开 ChatGPT App（此时千万别登录你想开通 Plus 的目标账号，随便登个临时号或者干脆不登）。在触发内购付款前，配置好网络拦截。

**核心逻辑：** 阻止 ChatGPT App 将 Apple 的支付收据（Receipt）发送至 OpenAI 服务器。
此时，App Store 会照常扣费，Apple 也会按标准流程将收据下发到你手机本地的沙盒目录里。但由于你的拦截，这张收据没能自动飞向 OpenAI 完成服务端验证，而是老老实实滞留在本地等你来拿。

**第三步：提取本地收据**

提取收据通常需要越狱环境或利用系统特性，实际主流的黑产玩法有以下三种：

- **mitm劫持：** 利用 mitmproxy、Charles 等工具或者自建 HTTPS 代理加自签证书，通过 DNS 劫持将 ChatGPT App 发往 OpenAI 的请求重定向到你自己的本地服务器。请求体中本身就带着 Base64 编码的收据，直接保存下来即可。

**第四步：利用 API 循环“补单”**

收据到手后，先登录要补单的账号，拿到Bearer后直接向 OpenAI 的订阅接口发送伪造的补单请求：
``` json
POST https://chat.openai.com/backend-api/subscription/upgrade
Content-Type: application/json
Authorization: Bearer <目标账号的 auth token>

{
  "receipt": "<Base64 编码的 iOS 收据>",
  "platform": "ios",
  "product_id": "com.openai.chatgpt.plus",
  "device_info": {
    "model": "iPhone15,2",
    "os_version": "17.0",
    "timezone": "Asia/Shanghai"
  }
}
```