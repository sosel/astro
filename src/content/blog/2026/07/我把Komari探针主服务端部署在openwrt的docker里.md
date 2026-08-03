---
title: "把Komari探针主服务端部署在内网的docker里"
categories: system
tags: ["komari"]
id: "komari server use lan"
date: 2025-07-09 11:18:18
cover: "https://img.mailberry.com.cn/i/2026/Jul/image-20260709110955443.webp"
recommend: false
top: false
---

博主原来的探针主服务器是丢在Claw Run上的，想着能永久免费，就不省去了更换主服务器的麻烦，不料Claw要退出市场，只能再搬家了，本想放在甲骨文永久免费服务上的，但又不知道它天又封号了，转想放十年的腾讯云锐驰算了，但想到它只是轻量服务器，网站都放这台服务器上，担心有其它问题，就想着把Komari的服务端放在软路由OpenWrt的docker，并把内网映射到公网。

## 外网问题

要把内网IP映射到公网访问，目前常见的有以下几种方案：

1. **Frp**
2. **tunnel** 
3. **iptables端口转发**

FRP比较常见，网上也很多教程，自行搜索一下，tunnel比较方便的就是cloudflare家的，没深究，本文主要使用的是端口转发，但内网并没有公网可直接访问的IP，博主是通过zerotier组了大局域网，从而再实现腾讯服务器有了一个公网IP和一个zerotier虚拟内网IP(192.168.195.5——转发软路由zerotier(192.168.195.6)

## 安装Komari

官方docker命令如下

```
docker run -d \
  -p 25774:25774 \
  -v $(pwd)/data:/app/data \
  --name komari \
  ghcr.io/komari-monitor/komari:latest
```

**需要注意**：如果使用的是默认的-p 25774:25774 \，要解决防火墙问题

博主使用--network host \网络协议 ，直接让Komari走主机openwrt的端口，少一套Bridge

```
docker run -d \
  --network host \
  -v $(pwd)/data:/app/data \
  --name komari \
  ghcr.io/komari-monitor/komari:latest

```

这样简单粗暴，但是有效的。

## 转发

第一步，先把有公网IP的服务器和Openwrt加入同一个zerotier

第二步，添加转发规则

`iptables -t nat -A PREROUTING -p tcp --dport 35523 -j DNAT --to-destination 192.168.195.6:25774`

将访问本机的35523端口转发到192.168.195.6的25774端口（Komari默认端口）

`iptables -t nat -A POSTROUTING -p tcp -d 192.168.195.6 --dport 25774 -j MASQUERADE`

**POSTROUTING 规则**（修改源地址，使其看起来来自本机）

第三步，放行端口

允许 35523 端口：

```
ufw allow 35523/tcp
ufw reload
```

## 反代

如果直接使用公网IP：端口访问，可以不用这一步了，想方便展示，还是绑定个域名方便点

在宝塔上新建个静态站点，绑定域名

并添加一个反代，目标地址就填写服务器的公网IP：端口，不能使用127.0.0.1：端口

## 演示

演示地址：https://tz.zpea.cn/

![image-20260709110955443](https://img.mailberry.com.cn/i/2026/Jul/image-20260709110955443.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

## 总结

先解决内网docker可被跨局域网能访问，最简单的就是直接使用host模式，然后组一下虚拟局域网，再在公网服务器做端口转发