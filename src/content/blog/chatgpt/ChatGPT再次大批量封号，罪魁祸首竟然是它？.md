---
title: "ChatGPT再次大批量封号，罪魁祸首竟然是它？"
id: "chatgpt"
date: 2025-08-27 17:15:50
categories: "chatgpt"
tags: ["ChatGPT", "封号", "IP"]
cover: "https://oss.mailberry.com.cn/picgo/2023/03/image-20230529125728565.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff"
recommend: false
top: false
---

## 前言

昨天起床，看一下手机，群里非常的热闹，看了一下，大家都在问，你Openai封号了吗？收到邮件了吗？从大家聊天内容来看，这次封的不是普通的GPT账号，而是尊贵的Plus用户，上次是因为使用Bug大批量注册的账号封了，能理解，但这次的Plus就有点复杂了。

## 起因



![image-20230529125728565](https://oss.mailberry.com.cn/picgo/2023/03/image-20230529125728565.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

收到这个邮件的，估计都心要凉凉了，这就是封号通知邮件，退款并取消您的订阅，还有一个要封号处理，没写在邮件上。

> 您收到这封电子邮件是因为我们发现您的帐户存在可疑活动，以保护我们的平台，我们已退款并取消了您的订阅，您将无法再访问聊天 gpt plus 服务

## 分析

摘要一部分群友的聊天记录，从记录来看，都是因为使用了Depay，从而导致的封号

![image-20230529130126985](https://oss.mailberry.com.cn/picgo/2023/03/image-20230529130126985.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

前段时间，Depay就开始出现银行卡脖子事件了，官方出的通知如下：

> 1、最近美国银行系统加强了对数字货币的风险管理。因此，Depay体系下的银行账户也受到了严格的风险管理，银行入账速度受到影响，造成卡账户资金不足引起消费功能中断，我们正在努力跟银行沟通以恢复正常速度。
> 2、在恢复到正常速度之前，我们将关闭新用户注册和开卡、关闭卡片充值功能；期间消费可能也会因为银行入账速度导致中断；
> 3、为减轻您的不便，我们将临时降低卡片提现费用和USDT/USD的兑换汇率。您可以在任何时间正常提现USDT。对于由此给您带来的不便，我们深感抱歉。



![image-20230529130254244](https://oss.mailberry.com.cn/picgo/2023/03/image-20230529130254244.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

也有用户给Openai发了邮件 了，回复说是使用了Proxy造成的

![mmexport1685175885913](https://oss.mailberry.com.cn/picgo/2023/03/mmexport1685175885913.jpg?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

**主要原因分析**

Plus涉及到资金，是一个比较敏感的区域，资金链不完整，退款封号，所以这次封号的原因是：

- 主要资金问题
- 其次IP绕了香港地区
- 同时登录，判断一号多用
- 登录地址不稳定

## 总结

经过这次事件，从而看出，资金链的重要性，过程是美国银行系统——卡Depay——与Openai结算失败——判断用户可疑行为——退款封号，从Openai处理的结果来看，还算是良心的，毕竟有些用户已经体验完整的了，后面结算不成功，也会退款。这大度作风值得我们学习