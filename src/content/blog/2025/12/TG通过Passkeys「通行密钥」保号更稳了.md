---
title: "TG通过Passkeys「通行密钥」保号更稳了"
categories: 工具
tags: ['TG']
id: "713a4d7d358503fb"
date: 2025-12-10 16:00:24
cover: "https://img.mailberry.com.cn/i/2025/image-20251210113112957.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff"
---

:::note
之前很多用户注册的账号，需要再次登录的时候，发现收不到短信验证而失去了账号使用权，现在通完Passkeys的通行密钥，就能省去这麻烦认证了

**优势：** 通行密钥本身具有完整的身份信息，用户**不需要输入手机号码**，也**不需要发送验证码**，实现免手机号、免验证码的快速登录。
:::

## 设置

直接上操作图

![image-20251210111937870](https://img.mailberry.com.cn/i/2025/image-20251210111937870.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

设置(Settings)——隐私与安全（Privacy and Security）——通行密钥（Passkeys）——创建通行密钥（Create Passkey）——继续

然后**验证指纹**，截不了图

![image-20251210113112957](https://img.mailberry.com.cn/i/2025/image-20251210113112957.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

成功后，会有一个KEY了

⚠️注意版本支持：

Android 12.2.10 或更高版本

iOS 12.2.3 或更高版本

## 使用通行密钥登录

一旦你创建了通行密钥，后续登录将非常快捷。

1. **自动弹出：** 登录时，Telegram 会自动弹出调用通行密钥登录的选项，完成生物识别或 PIN 码认证即可登录。
2. **手动选择：** 如果没有自动弹出登录选项，请等待几秒，Telegram 会在手机号输入框下出现 **使用通行密钥登录** 的选项，点击即可。
3. 仅可用于已有账号设置，不可用于新号注册

## 总结

先用**传统方式登录：** 以传统的手机号码方式登录你的 Telegram 账号。然后 **设置-隐私-通行密钥** ，设置后，以后登录就需要再依赖短信验证码了，保号稳了。如果暂时看不到“通行密钥”选项，说明你的账号暂时还未支持该功能，安卓手机可能需要谷歌框架支持。