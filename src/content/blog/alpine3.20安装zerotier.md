---
title: "alpine3.20安装zerotier"
categories: system
tags: ["zerotier", "alpine"]
id: "alpine 3-2-0 install zerotier"
date: 2025-03-02 18:18:18
cover: "https://oss.mailberry.com.cn/picgo/2024/10/image-20241005171721472.png"
recommend: false
top: false
---

## 前言

最近突然想给我阿里云5年的香港服务装上zerotier,目的是不想直连，容易那个，就想着套一层马甲——zerotier。发现Alpine的资源库里已没最适配的版本了，上官方找一下原因，说是开源的协议不一至，Zerotier停止了对Alpine的适配，要自己编译，感觉有点难，就直接装旧版本的了，找到最新的源是V3.17使用的1.10.2版本

![image-20241005174059691](https://oss.mailberry.com.cn/picgo/2024/10/image-20241005174059691.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

## 添加源

编辑`vi /etc/apk/repositories`

![image-20241005172834232](https://oss.mailberry.com.cn/picgo/2024/10/image-20241005172834232.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

添加两个V3.17的仓库源

## 安装

`apk update` 更新一下库

`apk add zerotier-one` 就可以直接安装了

![image-20241005173304759](https://oss.mailberry.com.cn/picgo/2024/10/image-20241005173304759.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

成功安装上了。

## 启动

linux的软件默认安装是不会自动运行的，要手动运行一下。

![image-20241005171348700](https://oss.mailberry.com.cn/picgo/2024/10/image-20241005171348700.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

查看状态，还是停止的

使用`service zerotier-one start`启用服务

使用`rc-update add zerotier-one`添加到系统默认启动，这样重启后也能自动启用zerotier-one

![image-20241005171721472](https://oss.mailberry.com.cn/picgo/2024/10/image-20241005171721472.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

重启试一下，可以看到在开机时默认服务已经能正常启动zerotier-one服务了

## 打开TUN

` modprobe tun`打开tun模式

` ls -al /dev/net` 查看网络情况

![image-20241005172043618](https://oss.mailberry.com.cn/picgo/2024/10/image-20241005172043618.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

可以看到最后一行，tun模式已经有了

## 加入ZeroTier 网络

`zerotier-cli join <network-id>` 使用这个命令加出网络ID就可以正常使用了

![image-20241005172357360](https://oss.mailberry.com.cn/picgo/2024/10/image-20241005172357360.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

再到zerotier的后台允许网络加入，便可以

![image-20241005172614641](https://oss.mailberry.com.cn/picgo/2024/10/image-20241005172614641.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

允许后，就能正常加入zerotier的大局域网了。

![image-20241005173523178](https://oss.mailberry.com.cn/picgo/2024/10/image-20241005173523178.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

可以看到与其它的zerotier主机能正常通讯了

## 总结

虽然1.10.2版本有点旧，但至于能适用到Alpine上，也总比自己编译要快捷得多，希望Zerotier官方能适合到Alpine系统吧，系统精小还是得Alpine呀。