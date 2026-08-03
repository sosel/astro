---
title: "解决Passwall版本过低，无法支持anytls协议问题"
categories: system
tags: ["openwrt"]
id: "resolving passwall version is too low"
date: 2026-06-12 13:18:18
cover: "https://img.mailberry.com.cn/i/2026/image-20260612111013342.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff"
recommend: false
top: false
---

:::note{type="info"}

随着IPLC和IEPL等专线的拨线，各种IX前置也开始无法互通，很多鸡场都只能转向直连了，现在相对耐操一点的协助算是Anytls吧，发现Anytls要求S-box最低要1.12以上，心想更新一下，发现不少问题，记录下来，以备不时之需。

:::

![image-20260612115218664](https://img.mailberry.com.cn/i/2026/image-20260612115218664.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)



## 更新Sing-Box版本

直接更新，这一步失败了，可以看一下失败原因

![1780883724400](https://img.mailberry.com.cn/i/2026/1780883724400.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

所以需要先更新主程序

## 更新PW

**第一步，下载最新版本**

https://github.com/Openwrt-Passwall/openwrt-passwall/releases

![image-20260612103650147](https://img.mailberry.com.cn/i/2026/image-20260612103650147.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

这个要根据Openwrt版本下载，博主的是Powered by LuCI openwrt-24.10 branch (25.187.32690~3d6dbd2) / ImmortalWrt 24.10.2 

两个ipk文件，

第一个app是主程序，必装

第二个i18n是中文菜单，也顺便更新

**第二步，上传**

直接使用文件管理器上传到tmp目录便可以

![image-20260612104646304](https://img.mailberry.com.cn/i/2026/image-20260612104646304.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

**第三步，安装**

直接进入SSH安装

![image-20260612104610036](https://img.mailberry.com.cn/i/2026/image-20260612104610036.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

`opkg install /tmp/文件名.ipk`

**第四步，检查及更新s-box**

![image-20260612110947579](https://img.mailberry.com.cn/i/2026/image-20260612110947579.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

再次检测，主程序已是最新版本

![image-20260612111013342](https://img.mailberry.com.cn/i/2026/image-20260612111013342.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

Sing-Box版本也轻松从V1.11.15更新到了最新的1.13.13版本

## 总结

主要就是从PW和Github下载对应的新ipk文件，上传到Openwrt，登录SSH使用命令安装，最后在Luci更新组件便可以，难度很低。