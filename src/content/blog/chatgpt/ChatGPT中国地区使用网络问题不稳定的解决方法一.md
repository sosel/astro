---
title: "ChatGPT中国地区使用网络问题不稳定的解决方法一"
id: "chatgpt"
date: 2025-08-27 17:15:50
categories: "chatgpt"
tags: ["ChatGPT", "网络", "地区"]
cover: "C:/Users/Sosel/OneDrive/tools/synTypora/picgo/image-20230302110633131.png"
recommend: false
top: false
---

## 前言

虽然我们经过九九八十一关，总算能正常使用上ChatGPT了，但是它还是时不时会断线，失联，用起来也是有点憋屈的，其实主要还是规则不完整导致。

## 方法

将以下网站加入代理规则, 并且使用网络最好的节点(日本或者香港等)代理, 基本上app就不会出现经常断连接的情况了
openai.com
auth0.com
sentry.io
hcaptcha.com
recaptcha.net
gstatic.com
gvt2.com
gvt1.com
gvt3.com
live.com
cloudflare.com
sfx.ms

声明：此法来自https://github.com/lencx/ChatGPT/discussions/133#discussioncomment-5117766

作者项目是chatgpt桌面GUI版本，也是我现在使用的EXE文件。他这里给出了中国地区使用问题汇总，我只是觉得这段比较可行，就复制过来。

![image-20230302110633131](C:/Users/Sosel/OneDrive/tools/synTypora/picgo/image-20230302110633131.png)

以上是使用openwrt sp+ 的强制走代理的域名

## 总结

这是因为Openai使用的数据库，负载平衡不只一个主域名，还有一些相关的服务器提供算力，所以把已知的都先加入的规则中，后面再有，再更新。