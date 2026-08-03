---
title: "[小白]解决E3强制要求使用2FA指导"
categories: 教程
tags: ["E3"]
id: "e3 use 2fa"
date: 2025-11-17 18:18:18
cover: "https://img.mailberry.com.cn/i/2025/image-20251117173553132.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff"
recommend: false
top: false
---


:::note

相信上周的E3热门BUG福利，大家都已上车了吧，前文《[赶紧上车，价值2K的微软Microsoft 365 E3全局账号申请过程](https://mailberry.com.cn/2025/11/microsoft-365-e3/)》，但最近登录会发现需要强制使用二步认证，即2FA，今天就此问题写一文小白指导文章，只适合从未接触过2FA用户，老司机可以❌点了。
:::

![image-20251117173238577](https://img.mailberry.com.cn/i/2025/image-20251117173238577.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

问题提示：所需操作，启用安全默认值可确保组织安全。请按照提示设置多重身份验证方法以保护帐户。

## 什么是2FA

> 2FA（[双因素身份验证](https://www.google.com/search?q=双因素身份验证&rlz=1C1CHZN_zh-CNTW949TW949&oq=什么是2fa&gs_lcrp=EgZjaHJvbWUyCwgAEEUYDBg5GIAEMgcIARAAGIAEMgoIAhAAGIAEGKIEMgoIAxAAGIAEGKIEMgcIBBAAGO8F0gEINTcyNmowajSoAgCwAgE&sourceid=chrome&ie=UTF-8&mstk=AUtExfBxzxMtgbPD8_ek6HfJxYDSg-xi6lXUI5yzsziLgCRtWQ4SremZvnxWH_hxI92dGEdKUiZEh4ciKa41miYmmJUBjUE-i0ci5Q6dXJipX7mO4Up8qn_BzDY783AG0c4d9UKPNJ0SGP0JTmCvTW_i93IW53Pt2hlEYxkd347b6fWp0CQ&csui=3&ved=2ahUKEwig8Nee8fiQAxUMwOYEHek6N-UQgK4QegQIARAB)）是一种安全流程，要求用户在登录时提供两个不同的验证因素来确认身份，而不仅仅是密码。它在用户输入密码后，还需要提供第二个验证方法，例如通过手机短信、身份验证应用或生物特征识别来完成验证。这种方式能显著增强账户安全，因为即使密码被盗，攻击者也需要同时拥有第二个验证因素才能成功登录

国内常见的是通过短信验证码完成二次认证，即是你通过用户名和密码登录了，还要接收一次短信验证才能登录，但国际上使用最多的还是 **身份验证应用**，目前最流行的Google Authenticator和微软的 Microsoft Authenticator。

## 启用Authenticator

![image-20251117173553132](https://img.mailberry.com.cn/i/2025/image-20251117173553132.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

E3是微软的，推广安装 Microsoft Authenticator也是情理之中，如果能使用Google Play和 App Store直接搜索名字下载便可

如果是安卓手机不支持Google Play，可以从这里下载 Microsoft Authenticator

![image-20251117174632849](https://img.mailberry.com.cn/i/2025/image-20251117174632849.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

https://apkpure.com/cn/search?q=Microsoft+Authenticator

如果打不开，可以从我搬运的盘里下载
::btn[Microsoft Authenticator_6.2511.7533_APKPure.apk]{link="https://4i5i-my.sharepoint.com/:u:/g/personal/sosel_4i5i_onmicrosoft_com/IQCmoIgv7L2jQKOiKg0zCkchAUV5rFZ_K0rze-wN3BLOx2w?e=ajUQGP"}

## 绑定账号

先登录管理员账号，根据提示来到这个页面

![image-20251117175300571](https://img.mailberry.com.cn/i/2025/image-20251117175300571.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)



下一步后，全弹出一个二维码

![image-20251117175402652](https://img.mailberry.com.cn/i/2025/image-20251117175402652.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

这时候打开手机上安装的 Microsoft Authenticator 「**无法截图**，**只能文字说明**」

点击右下角的二维码图标扫码添加

![image-20251117175639648](https://img.mailberry.com.cn/i/2025/image-20251117175639648.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

然后会网页上会让出现一个数字，同时手机上也弹出一个输入框，输入相同的数字，就能完成身份认证

![image-20251117175802386](https://img.mailberry.com.cn/i/2025/image-20251117175802386.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

到这里，就完成了身份认证的添加

## 总结

按提示走其实很简单的，难点可能部分用户没有Google Play，下载安装 Microsoft Authenticator是唯一的难点。简单一句话总结就是要下载个APP绑定要登录的账号，以后登录要用手机协助完成二次身份认证才能登录。