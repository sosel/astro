---
title: "解决passwall的国内IP裸连分流到直连规则的问题"
categories: system
tags: ["passwall"]
id: "solved passwall ip direct"
date: 2025-06- 18:18:18
cover: "https://img.mailberry.com.cn/i/2026/image-20260626173301268.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff"
recommend: false
top: false
---

## 前因

公司的服务器加了白名单限制，然后在服务上部署了个SS节点供使用，后面叫A服务器IP，正常使用客户端是没有问题的，但博主想集成到OpenWrt的PassWall上，能ALL IN ONE就ALL咯，折腾过程发现要PassWall一直把A服务器IP（VPSLIST）当成直连规则。

![image-20260626173301268](https://img.mailberry.com.cn/i/2026/image-20260626173301268.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

造成无法通过国内裸IP（本机）分流本SS节点的规则上

## 原因

在官网github上找到一位大佬的回复

![image-20260626173756836](https://img.mailberry.com.cn/i/2026/image-20260626173756836.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

问题是“目标 IP 与 SS 节点 IP 相同”导致 Passwall 的节点直连保护压过了裸 IP 分流，也就是VPSLIST有着最高优先级

## 解决思路

- A服务器上再添加一个IP（成本增加）
- B服务器上导入A服务器节点，再做个出站分流
- 直接用B服务器tunnel做端口转发

## 解决要点

本文使用第三种方案，直接添加一下任意门，做端口转发，解决，下面几点需要注意

![image-20260626174544586](https://img.mailberry.com.cn/i/2026/image-20260626174544586.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

在B服务器上添加tunnel转发，如图填写A服务器节点的IP和端口

**一，不能使用服务的IP做节点**

![image-20260626172246248](https://img.mailberry.com.cn/i/2026/image-20260626172246248.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

博主使用了一台B服务器做tunnel端口转发，把节点IP换成了B服务器IP和端口

**二，关了中国列表**

![image-20260626171631162](https://img.mailberry.com.cn/i/2026/image-20260626171631162.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

如果开了这个，就算自定义的规则拉到最上面，还是优先使用这个规则

**三，不能有A服务的IP在节点列表里**

一开始博主复制一个原A节点出来，修改成B服务器IP节点，一直也不成功，删掉原A国内服务IP节点，或者直接修改成B服务器IP

因为只要节点列表里有A服务器的IP，它就会自动形成VPSLIST回路了，也就自己走直连了

## 总结

由于不能裸IP连自己，所以要找个中间人（B服务器）做中转，然后关了中国列表（如果是A服务器不是国内的，可以不关）

