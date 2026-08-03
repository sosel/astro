---
title: "代购美国住宅IP及检测过程"
categories: 住宅IP
tags: ['家宽，住宅']
id: "31de1eea0b9c3017"
date: 2025-12-09 17:05:02
cover: "https://img.mailberry.com.cn/i/2025/image-20251209164012405.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff"
---

:::note
之前分享过《[1美元/月美国家宽IP购买及检测过程](https://mailberry.com.cn/2024/12/1usd-buy-usa-isp-ip/)》，但还是有部分用户无办法解决支付问题的，毕竟webshare不支持支付宝和微信支付，要用到信用卡，自己国内的又担心安全问题，虚拟的卡又要用到虚拟B，难度比较大，今天有位朋友找博主代购，帮忙检测质量，就顺便分享出来。
:::

![image-20251209160211062](https://img.mailberry.com.cn/i/2025/image-20251209160211062.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

## 购买

如果你有支付方式的，可以自行到我推广连接购买，謝謝

注册购买地址：
::btn[WebShare注册购买]{link="https://www.webshare.io/?referral_code=xsf80slsto9f"}

如果像这位朋友没有支付方式的，也可以找博主代购买

![image-20251209160443041](https://img.mailberry.com.cn/i/2025/image-20251209160443041.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

购买成功

## 检测

最简单的是在线查询，多查几个

### ISP查验

1，ping0.cc

![image-20251209160719907](https://img.mailberry.com.cn/i/2025/image-20251209160719907.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

双ISP

2，iping

![image-20251209160906186](https://img.mailberry.com.cn/i/2025/image-20251209160906186.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

双ISP

3，ipinfo

![image-20251209161108375](https://img.mailberry.com.cn/i/2025/image-20251209161108375.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

4，ipdata

![image-20251209161224806](https://img.mailberry.com.cn/i/2025/image-20251209161224806.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

双ISP

### 欺诈检测

1, https://scamalytics.com/ip

![image-20251209161617095](https://img.mailberry.com.cn/i/2025/image-20251209161617095.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

2,whoer

![image-20251209162613466](https://img.mailberry.com.cn/i/2025/image-20251209162613466.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

3,IPjiance

![image-20251209162835312](https://img.mailberry.com.cn/i/2025/image-20251209162835312.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

### 脚本检测

检测代码

```bash
bash <(curl -Ls https://IP.Check.Place) -x socks5://username:password@socksproxy:port
```

![image-20251209164012405](https://img.mailberry.com.cn/i/2025/image-20251209164012405.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

解锁还不错

## 总结

各家的数据库并不一致，所以多查几家，取个平均值就差不多了，而且IP固定下来只有自己使用的话，养段时间后，一样会回归良好的，没必要太在呼，只要正常上网不老弹**人机认证**就可以使用了。