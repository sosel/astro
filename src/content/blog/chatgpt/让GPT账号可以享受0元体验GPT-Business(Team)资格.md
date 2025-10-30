---
title: "让GPT账号享受0元体验GPT-Business(Team)资格"
categories: Ai
tags: ["team"]
id: "free trial business"
date: 2025-10-24 09:18:18
cover: "https://t.zpea.cn/i/2025/image-20251024100951631.png"
recommend: false
top: false
---

:::note

现在GPT在大力推广GPT5，但是需要Plus会员才能享受到，免费的GPT账号是用不了的，但是可以通过免费Team试用方式来体验最高版本的模型，其实GPT-Team已经推出好几个月的优惠体验了，之前是1美元5席位，现在改名叫GPT-Business了，更是直接0元就能体验，相当于免费5个号使用GPT-5。
:::
## 模型（用量）

**用量额度（参考官方）：**

- codex非网页版(cli或插件)每5小时30-150个会话，网页版每小时600个。
- GPT-5 无限制
- GPT-5 Thinking 每周 200 次请求
- GPT-5 Thinking mini 每周 2800 次请求
- GPT-5 Pro 每月 15 次请求
- 4o 无限制
- 4.1 每 3 小时 500 次请求
- o4-mini 每日 300 次请求
- o3 每日 300 次请求

## 玩法

目前有三种方法可以获取到试用资格，但都要用到虚拟信用卡，如果没有卡的推荐这里注册

推广地址：https://h5.roogoo.money/register?inviteCode=jgkmzt （通过推广链接0元开卡，还返1USD）

### 简单法

使用住宅家宽ISP优质IP，有些太多人使用的IP，可以资格都被试用完了，换一些优质的IP访问，GPT平台认为是优质用户，就会推给你优惠体验入口

![image-20251024100951631](https://t.zpea.cn/i/2025/image-20251024100951631.png)

如果使用了优质IP，还是没看到这个入口，可以尝试注册一下新的账号，一般**优质IP+新号**，基本上就能获取到试用入口了。

### URL法

也可以先登录账号，再直接在URL地址上输入体验入口的链接地址

0美元Team入口地址：

https://chatgpt.com/team-sign-up?promo_campaign=team_free_trial&utm_campaign=WEB-team_free_trial&utm_internal_medium=referral&utm_internal_source=openai_homepage

1美元Team入口地址：

https://chatgpt.com/?promo_campaign=team1dollar&utm_campaign=WEB-team_try_for_1&utm_internal_medium=referral&utm_internal_source=openai_team#team-pricing

### 技术法

这里需要用到python，如何安装自行谷歌或者百度，提供一下代码给会玩的同学参考

```python
from curl_cffi import requests
headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'authorization': 'Bearer xxx',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'oai-language': 'zh-CN',
    'origin': 'https://chatgpt.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://chatgpt.com/',
    'sec-ch-ua': '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
    'sec-ch-ua-arch': '"x86"',
    'sec-ch-ua-bitness': '"64"',
    'sec-ch-ua-full-version': '"140.0.7339.210"',
    'sec-ch-ua-full-version-list': '"Chromium";v="140.0.7339.210", "Not=A?Brand";v="24.0.0.0", "Google Chrome";v="140.0.7339.210"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-model': '""',
    'sec-ch-ua-platform': '"Windows"',
    'sec-ch-ua-platform-version': '"15.0.0"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
}
json_data = {
    'plan_name': 'chatgptteamplan',
    'team_plan_data': {
        'workspace_name': 'Fovt',
        'price_interval': 'month',
        'seat_quantity': 5,
    },
    'billing_details': {
        'country': 'JP',
        'currency': 'USD',
    },
    'cancel_url': 'https://chatgpt.com/?numSeats=5&selectedPlan=month&referrer=https%3A%2F%2Fauth.openai.com%2F#team-pricing-seat-selection',
    'promo_campaign': 'team-1-month-free',
    'checkout_ui_mode': 'redirect',
}
for i in range(100):
    id = requests.post('https://chatgpt.com/backend-api/payments/checkout', headers=headers, json=json_data, impersonate="chrome101").json()["checkout_session_id"]  
    url = f"https://chatgpt.com/checkout/openai_llc/{id}"
    print(url)
```

### 步骤

**第一步**：一个有资格的ChatGPT TEAM试用账号

**第二步**：提取账号的AT，并替换脚本headers——authorization中的xxx为你的accessToken

- 直接访问下面链接即可获取accessToken：[https://chatgpt.com/api/auth/session](https://www.nodeseek.com/jump?to=https%3A%2F%2Fchatgpt.com%2Fapi%2Fauth%2Fsession)

**第三步**：运行脚本，脚本会输出付款链接（想卡几个0元TEAM就让脚本输出几个付款链接）

**第四步**：你会获得N个付款链接，依次付款，付款N个，账号就会出现N个TEAM

**说明**：

1. 有封号的风险
2. 一定要是0刀的活动
3. 随时可能失效

## 扩展

所有这些都要用到信用卡，**如果0元的付款不成功，可以试试1刀的**，参考我之前文章

《[成功使用虚拟卡0元开了一台GPT Business(Team)套餐](https://mailberry.com.cn/2025/10/subscribe-gpt-business-team-with-roogoo/)》

《[ChatGPT-Team失败及成功支付的虚拟信用卡分享](https://mailberry.com.cn/2025/07/chatgpt-team-fail-and-success/)》

《[1美元开通ChatGPT Team一个月教程](https://mailberry.com.cn/2025/06/1-dollar-use-chatgpt-team/)》

## 总结

使用优质家庭住宅代理IP地址，推荐《[套用Socks5或StaicISP：实现原生IP、住宅私人IP、模拟最真实的海外用户IP](https://mailberry.com.cn/2023/03/socks5-staic-isp-ip/)》，换新号，实现不行再尝试使用技术法。