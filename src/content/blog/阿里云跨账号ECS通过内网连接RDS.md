---
title: "阿里云跨账号ECS通过内网连接RDS"
categories: system
tags: ["阿里云", "ECS","RDS"]
id: "aliyun another account"
date: 2025-03-02 18:18:18
cover: "https://oss.mailberry.com.cn/picgo/2024/04/image-20240723102434871.png"
recommend: false
top: false
--- 

## 前言

最近申请到阿里云的3500优惠券，由于新规不能续费，导致购买了三年香港轻量云后，剩下的金额根本花不完，就打算购买一台RDS，把数据库单独出来，而且RDS能购买5年，同时打算把RDS给我另一个99元/年的ECS也使用上，这样ECS都不需要安装数据库了。同账号同地域的很简单，这里要记录一下的是跨账号实现内网连接RDS。

## 结构

1，阿里云A账号购买了99元/年的ECS

2，阿里云B账号购买了5年的RDS

3，同一地域：华南1（深圳）

## 实现

### 创建对等连接

利用阿里云的VPC对等连接，同一地域内网连接免费。

B账号发起对等连接请求

![image-20240723101643859](https://oss.mailberry.com.cn/picgo/2024/04/image-20240723101643859.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

首先，打开控制台——专有网络——VPC对等连接，直达地址：https://vpc.console.aliyun.com/vpcpeer/

第一次会要求开通CDT

![image-20240723102205336](https://oss.mailberry.com.cn/picgo/2024/04/image-20240723102205336.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

接着，创建对等连接

![image-20240723102434871](https://oss.mailberry.com.cn/picgo/2024/04/image-20240723102434871.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

填写相关信息，更详细说明参考[官方文档](https://help.aliyun.com/zh/vpc/user-guide/create-and-manage-vpc-peering-connection?spm=a2c4g.11186623.0.i0)

最后，到A账号同样的位置，接受对等连接便可以

![image-20240723102849200](https://oss.mailberry.com.cn/picgo/2024/04/image-20240723102849200.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

### 配置路由

![image-20240723102930766](https://oss.mailberry.com.cn/picgo/2024/04/image-20240723102930766.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

需要在A和B账号同时配置路由条目

![image-20240723103058764](https://oss.mailberry.com.cn/picgo/2024/04/image-20240723103058764.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

目标网段要根据自己VPC的填写

![image-20240723103255030](https://oss.mailberry.com.cn/picgo/2024/04/image-20240723103255030.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

在A账号的ECS测试，能PING通RDS内网的地址了

## 白名单

登录B账号的RDS，添加A账号ECS的IP地址到白名单

![image-20240723103616278](https://oss.mailberry.com.cn/picgo/2024/04/image-20240723103616278.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

我把ECS的内网和外网的IP都添加到白名单了

## 使用

A账号的ECS使用了宝塔，直接登录宝塔后台添加远程数据库

![image-20240723103955804](https://oss.mailberry.com.cn/picgo/2024/04/image-20240723103955804.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

按要求填写便可

![image-20240723103847282](https://oss.mailberry.com.cn/picgo/2024/04/image-20240723103847282.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

创建数据，状态正常

然后修改wp_config.php的数据库参数为RDS地址，用户名和密码可以直接使用Root的，如果需要使用添加数据库时创建的，还需要到RDS后台用户管理添加相同的用户名和密码。

![image-20240723104547524](https://oss.mailberry.com.cn/picgo/2024/04/image-20240723104547524.png?x-oss-process=image/watermark,text_TWFpbEJlcnJ5LmNvbS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

我就直接使用Root账号和密码了

## 总结

其实经过一通的折腾，我也不确定外网和内网的区别，但总感觉内网肯定比外网快吧。所以就想实现，只是发现网上没什么人写ECS跨账号内网连接RDS的，这完全是我自己摸索出来的，如果大家有更好的实现方式，烦劳评论区指导一下，谢谢