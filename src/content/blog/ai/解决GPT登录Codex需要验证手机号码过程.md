---
title: "解决GPT登录Codex需要验证手机号码过程"
categories: 分类
tags: ['标签']
id: "resolv gpt login codex need to verification mobile num problem"
date: 2026-06-11 11:50:22
cover: "https://img.mailberry.com.cn/i/2026/image-20260611112708524.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff"
---

:::note

现在很多用户使用的Codex的时候，都会触发验证手机号，由于Openai对+86并不友好，所以国内号码没办法验证，需要用到海外号码，之前更离谱，需要二次验证，被用户使用脚本轰炸后，才改回只需要验证手机号就能使用了，本文刚好帮一用户解决Codex海外手机号码接码问题，把过程分享出来。

:::

## 需求

![image-20260611111325106](https://img.mailberry.com.cn/i/2026/image-20260611111325106.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

## 过程

博主这次使用的是海外接码平台

**第一步，注册账号**

::btn[注册账号]{link="https://hero-sms.com/?ref=384850"}

**第二步，充值**

![image-20260611111851237](https://img.mailberry.com.cn/i/2026/image-20260611111851237.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

直接点右上角的“充值”选择“支付宝”便可充值

**第三步，选择服务**

![image-20260611112055227](https://img.mailberry.com.cn/i/2026/image-20260611112055227.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

直接在左边的**选择服务**搜索 `openai`

**第四步，选择国家**

![image-20260611112446633](https://img.mailberry.com.cn/i/2026/image-20260611112446633.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

直接购买就可以了

这一步要多试几个国家

![image-20260611112806452](https://img.mailberry.com.cn/i/2026/image-20260611112806452.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

默认是+1的，应该是使用了美国的IP，试了两个号码，一个提示失败，一个成功，但没收到验证码（后来刷新发现也是收到码了的，如下图所示）

最后换了一个美国的号码成功收到码了

![image-20260611112708524](https://img.mailberry.com.cn/i/2026/image-20260611112708524.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

浪费了一个号码，其实第二个号码就已经收到了，而且只要0.1刀，浪费了我0.6刀。

**第五步，提交验证**

复制验证码，回到GPT验证页面提交便可以

![image-20260611113029048](https://img.mailberry.com.cn/i/2026/image-20260611113029048.webp?x-oss-process=image/watermark,text_WnBlYS5jbg,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

## 总结

利用海外接码平台，能以最实惠的价钱解决没有海外号码问题，前提是OpenAI不要恢复二次验证，如果要用回原号码再接验证码才能现次登录，这个方案就是不可行的，可靠方案是养一个海外号码，比较推荐giffgaff,如果需要流量可以考虑这个《[免实名海外号码及合规外网，低至0.01刀/3天2G流量](/article/not%20kyc%20esim%20001/)》