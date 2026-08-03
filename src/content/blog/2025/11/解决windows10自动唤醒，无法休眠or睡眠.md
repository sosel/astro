---
title: "解决windows10自动唤醒，无法休眠or睡眠"
categories: 分类
tags: ['标签']
id: "54182f6dd1fe5ee4"
date: 2025-11-10 15:44:55
cover: "https://img.mailberry.com.cn/i/2025/image-20251110152514573.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff"
---

:::note

最近把办公室的电脑设置了远程唤醒+远程桌面管理，实现：不需要24小时 开机，但又能随时访问办公室的电脑。目的是我写博客或者公众号的时候，在家里低配置的老古懂机能秒变高配置电脑及直接进入写作状态，减少了配置分散注意力的问题，扯远了，今天主要是记录一下无法休眠或者睡眠问题。
:::

## 分析及解决

前面提到了，我为了让电脑能远程唤醒，已经把电脑的网络适配器设置成“允许此设备唤醒计算机（O）”，这样关机后，确实是可以通过远程唤醒电脑了，但发现一个奇怪的问题，以前不使用了，直接在让电脑睡眠，需要再远程唤醒，最近失灵了，睡眠后几秒自动唤醒了，失不到按需开机的效果，经过检测，原来是“只允许纪数据包唤醒计算机（N）”这个勾不掉了，重新✅勾上就可以了。



![image-20251110103929347](https://img.mailberry.com.cn/i/2026/image-20251229155227343.png?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

## 延伸

这里顺便说一下我使用的远程网络唤醒工具，这里说的远程，是通过公网IP唤醒的，是真正意义的上远程唤醒，不是局域网那种本地网络环境唤醒哈。

一，APP

我是安卓，使用过两款

Wake-On-Lan和Depicu Wake on Lan

![image-20251110152514573](https://img.mailberry.com.cn/i/2025/image-20251110152514573.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

在Wake-On-Lan配置好远程公网IP和内网IP，这里需要做端口映射和ARP绑定，有机会再详细介绍

二，PC端

我使用WEB版本的Depicu 

![image-20251110152742449](https://img.mailberry.com.cn/i/2025/image-20251110152742449.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

直接添加到标签书签栏里，想要唤醒哪台点哪台

配置

```
https://www.depicus.com/wake-on-lan/woli?m=00e04MAC地址87&i=公网IP&s=255.255.255.255&p=端口
```

有网络的地方打开，就能唤醒

## 总结

把唤醒改成只允许纪数据包，也就是Magic数据包，不然平时待机与路由器握手数据包就会自动唤醒了，要真正实现 **远程** 唤醒，还需要做好前期的端口映射和ARP绑定MAC地址，如果大家感兴趣，下篇再分享《如何真正意义的远程唤醒网络计算机》。