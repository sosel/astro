---
title: "通过token生成GPT管理付款账单地址过程"
categories: Ai
tags: ['Claude']
id: "ccc80f95e8abdc8e"
date: 2026-01-07 17:59:01
cover: "https://img.mailberry.com.cn/i/2026/image-20260107173835540.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff"
---

:::note
对用户实用意义可能并不大，只是博主个人有这个需求，目的不上号直接通过客户的token就能获取到管理付款方式，直接就可以帮客户绑新卡，预备资金让GPT自动续费下个月的PLUS或者PRO会员费用，权当自己的笔记，如果你对自动化有兴趣，也可以参考一下。
:::
## 前景

这个与之前的《[让GPT账号享受0元体验GPT-Business(Team)资格](https://mailberry.com.cn/2025/10/gpt-have-business-team-trial/)》有关联，是在它的基本上增加博主所需要的功能，利用的都是python的requests请求完成自动化，在此再的要感觉AI的帮助呀，这里要特别表扬一下claude，因为我之前让GPT帮忙修改的时候，可能是动到它自身了，总是在糊弄我，并没有给出特别有帮助的建议及解决方案，正好今天写《[一步一步注册Claude账号，验证手机号](https://mailberry.com.cn/2026/01/register-claude-accout/)》，尝试使用Claude的协助，那是干脆及利落的给出了解决思路及代码。

## 过程

第一步，直接丢旧代码给claude

![image-20260107172626833](https://img.mailberry.com.cn/i/2026/image-20260107172626833.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

分析后，再引出我的需求

第二步，提需求

![image-20260107172749982](https://img.mailberry.com.cn/i/2026/image-20260107172749982.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

可以直接验证代码可用性

第三步，执行验证

![image-20260107172905464](https://img.mailberry.com.cn/i/2026/image-20260107172905464.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

把错误丢给它

看来不能一步到位直接修改代码实现，但是它会指引我自己解决思路

**提供思路**

提供了两个思路

![image-20260107173058911](https://img.mailberry.com.cn/i/2026/image-20260107173058911.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

最张我是在浏览器抓取真实请求实现的

## 抓取请示

通过真实操作，实时抓取真实请求，由于博主也是第一次抓取，Claude还挺有耐心指导的

第一次，我丢了个document文档给它

![image-20260107173427255](https://img.mailberry.com.cn/i/2026/image-20260107173427255.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

第二次，不知道要看哪个文件

![image-20260107173543769](https://img.mailberry.com.cn/i/2026/image-20260107173543769.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

第三次，重新指导我

![image-20260107173728954](https://img.mailberry.com.cn/i/2026/image-20260107173728954.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

原来重点是要看Fetch/XHR

第四次，找到重要数据

![image-20260107173835540](https://img.mailberry.com.cn/i/2026/image-20260107173835540.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

原来是要查看“customer portal”的请示

第五次，直接给出可用的代码

![image-20260107174214971](https://img.mailberry.com.cn/i/2026/image-20260107174214971.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

直接提供了可用的代码

![image-20260107174508931](https://img.mailberry.com.cn/i/2026/image-20260107174508931.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

成功拿到付款管理地址

## 总结

Claude可以直接截图互动沟通，等于是手把手教学了，比请靠人省事多了，不需要有什么心理负担，不懂就问，如果换作问朋友，还要考虑对方会不会觉得自己太小白了，反而AI会根据用户的水平重新引导，我爱AI。下篇研究一下《如何低价订阅Claude Pro会员》