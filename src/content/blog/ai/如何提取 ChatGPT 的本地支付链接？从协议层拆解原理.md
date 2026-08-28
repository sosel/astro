

---
title: "如何提取 ChatGPT 的本地支付链接？从协议层拆解原理"
categories: Ai
tags: ["Stripe"]
id: "how-get-gpt-by-stripe-url"
date: 2026-08-28 14:36:49
cover: ""
recommend: false
top: false
---

:::note 

最近在 AI 合租、代充圈子里，流行一个黑话叫 **“提链”**

简单说，就是把 ChatGPT 只有信用卡选项的支付页面，强行“拽”出一个**本地支付链接**，比如荷兰的 iDEAL、印度的 UPI、巴西的 PIX，韩国的 Kakao Pay，等等

:::

## 你可能会问：OpenAI 不是只收信用卡吗？

对，但那是**前端**给你的错觉。它后端用的 **Stripe**，天生就支持全球几十种本地支付方式。只是 OpenAI 在 UI 上做了过滤，只留了一个信用卡表单

而“提链”的本质，就是**绕过 UI，直接和 Stripe 对接**，把它隐藏的支付能力释放出来

下面从协议层解析原理

## 为什么需要它？

先看一组数据：

- 全球 80 亿人，**有信用卡的不到 20 亿**
- 印度人用 UPI（渗透率超 70%），巴西人用 PIX，荷兰人用 iDEAL，韩国人用 Kakao Pay……

OpenAI 的结账页面，把这些人的支付方式挡在了门外，但实际上 Stripe 本身是支持的

提链工具要做的，就是拿着你的登录凭证，告诉 Stripe：我要用荷兰 iDEAL 支付，然后 Stripe 就会给你一个跳转链接

## 技术原理：从 Token 到支付链接的四步拆解

整个流程可以概括为四步：

### Step 1：拿到“门票” (Access Token)

登录 ChatGPT 后，访问这个接口拿令牌：

```
https://chatgpt.com/api/auth/session
```

它会返回一个`accessToken`（JWT 格式），有效期 5-10 分钟。这是后续所有操作的钥匙

### Step 2：创建“支付会话” (Checkout Session)

用 Token 调用 OpenAI 的支付 API：

`POST https://chatgpt.com/backend-api/payments/checkout`
`Authorization: Bearer {你的Token}`

**关键**：在请求体里指定 `billing_details`：

```json
{
  "billing_details": {
    "country": "NL",   // 荷兰
    "currency": "EUR"  // 欧元
  }
}
```

Stripe 就会在返回的 `payment_method_types` 里包含 `ideal`

### Step 3：走完 Stripe 的“12步长征”

拿到`checkout_session_id`（格式是`oaics_xxx`）后，真正的技术活开始了。这不是一个请求能搞定的，你需要**严格按顺序模拟浏览器的行为**，一共约 12 步：

1. Session Refresh (刷新会话)
2. Create Checkout (就是上面那步)
3. **Stripe Init (初始化页面状态)**
4. Update OAI Taxes (通知 OpenAI 算税)
5. Stripe Tax Region (更新税务区域)
6. Stripe Customer Data (更新客户信息)
7. OAI Checkout Snapshot (保存快照)
8. Pre-Confirm (部分支付方式需要，如 Kakao Pay)
9. Create Payment Method (创建支付方式，类型=ideal/upi/pix)
10. **Confirm (确认支付，触发重定向)**
11. Approve (如需额外批准)
12. **Extract Redirect URL (提取链接)**

**每一步都有严格的参数依赖**（比如`eid`、`mrid`），Stripe 维护着一个状态机，跳步或传错参数都会报错

### Step 4：摘取“果实” (提取支付链接)

第10步`Confirm`成功后，Stripe 会返回一个`redirect_url`：

```json
{
  "status": "requires_action",
  "next_action": {
    "type": "redirect_to_url",
    "redirect_to_url": {
      "url": "https://hooks.stripe.com/redirect/authenticate/src_xxx?client_secret=..."
    }
  }
}
```

打开这个链接，就进入了 iDEAL 的银行选择页、UPI 的付款页或 PIX 的二维码页。付款后，OpenAI 自动开通订阅

## 细节填坑指南

如果你自己写脚本，这几个坑大概率会踩：

1. **IP 必须一致**：创建会话和最终确认必须用**同一个 IP**，否则 Stripe 会认为存在中间人攻击，直接拒绝
2. **金额不能写死**：确认时传的`expected_amount`要用第 4 步算出来的**含税金额**，直接写死会因税额不符而失败
3. **状态要随身带**：每一步响应里的新状态值，必须原封不动传给下一步
4. **特殊支付方式**：Kakao Pay 和 MoMo 这类，在 Confirm 前必须多调用一次`pre_confirm`，不然拿不到链接

## 提链 ≠ 0 元购

很多人会把“提链”和之前那个把价格变成 0 的“CDK 提炼”漏洞混为一谈

**区别巨大**：

- **0 元购工具**：注入了`promo_campaign`等优惠参数，操纵金额，属于**漏洞利用**
- **正常提链工具**：**不注入任何参数**，金额完全来自 Stripe 价格表（比如荷兰就是 20 欧/月），是**合法商业行为**

提链只是把 Stripe 本来就有的、但被 OpenAI 前端隐藏的能力，释放给了真正需要它的人

## 另一条路：直卡绑定

除了提链，还有一种思路叫“直卡绑定”。它不提取第三方支付链接，而是直接在 ChatGPT 后台绑一张卡

原理是通过调用 Stripe 的`SetupIntent`接口，创建一个“先绑卡不扣款”的会话，然后用脚本在页面弹出一个内置 Stripe 卡输入组件的模态框，完成绑定

有卡的用户走这条路，没卡的用户走提链，两条路互补

## 最后

提链不是一个简单的“抓包改参数”就能搞定的操作，它需要完整模拟 Stripe 的 **12 步协议流程**，涉及状态管理、税务计算、IP 绑定等细节

从商业角度看，它让大量没有信用卡的用户，能够通过本地支付方式正常使用 ChatGPT。**技术本身是中立的，关键在于使用它的目的**

最后提醒：**本文所有技术细节和脚本均有强时效性**。OpenAI 和 Stripe 的接口、风控策略随时会变。**理解协议原理，比收藏一个马上会过时的脚本，要有价值得多**