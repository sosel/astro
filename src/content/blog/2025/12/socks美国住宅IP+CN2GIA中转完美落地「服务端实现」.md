---
title: "socks美国住宅IP+CN2GIA中转完美落地「服务端实现」"
categories: 住宅IP
tags: ['家宽，住宅']
id: "24551f67f12ab55e"
date: 2025-12-02 13:56:49
cover: "https://img.mailberry.com.cn/i/2025/image-20251202113911675.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff"
---

:::note
本文通过CN2GIA路线机上的3❌-ui面板，套用socks的IP实现住宅IP落地了，从而解决IP质量和解锁等问题，达到住宅用户的权重，让运营TikTok更容易获得播放推荐，不再是尴尬的0播放、直播不进人、无法点赞收藏等问题。
:::

## 条件
- 先会科学上网
- 线路机装了3❌-ui
- 一个优质的住宅IP  
::btn[购买住宅IP-》webshare]{link="https://www.webshare.io/?referral_code=xsf80slsto9f" type="info"}



## 步骤

购买过程就不写了，可以通过我的推荐购买，感谢！

https://www.webshare.io/?referral_code=xsf80slsto9f

第一步，添加 **出站规则** 

把在[webshare](https://www.webshare.io/?referral_code=xsf80slsto9f)平台拿到的socks信息，如图填写到相关位置

![image-20251202113911675](https://img.mailberry.com.cn/i/2025/image-20251202113911675.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

**重点**注意一下，标签后面会用到

第二步，添加 **路由规则**

和上面的差不多

![image-20251202114344550](https://img.mailberry.com.cn/i/2025/image-20251202114344550.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

1. **Inbound Tags 选择已有的正常节点，我选择Rea1ity (1是L，故意写错)**
2. **Outbound Tag 选择第一步中写的“标签”名，我的是soscktest**

第三步，添加 **添加客户端**

![image-20251202114725381](https://img.mailberry.com.cn/i/2025/image-20251202114725381.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

在入站列表——选择已有的节点，添加客户端，目的是实现不同用户使用不同的IP

![image-20251202114921617](https://img.mailberry.com.cn/i/2025/image-20251202114921617.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

电子邮件用上面相同的标签

**小结：** 客户端的**电子邮件**会触发路由规则的**User**——**Outbound Tag**

## 检验

说明，这里我使用的是webshare平台送的10条免费socks 做演示，IP质量不是文本的重点，后面再购买静态住宅IP，套上就可以了



![image-20251202131049044](https://img.mailberry.com.cn/i/2025/image-20251202131049044.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

可以看到套了延时更低了

**动图检测**

![20251202_120706](https://img.mailberry.com.cn/i/2025/20251202_120706.webp)

## 总结

添加一个出站规则+一个路由规则+客户端区分不同出口IP，可以先用免费的socks测试，成功了再购买独享的住宅IP，也可以找博主代购哟，既能解决付款问题，还能享受博主独家的8折优惠，仅webshare。