---
title: "GPT Plus和Pro谷歌内购0元无限购BUG分析"
categories: Ai
tags: ['GPT']
id: "503eb61617905c4f"
date: 2026-04-21 10:46:48
cover: "封面图URL (为空默认随机内置封面 /public/assets/images/banner)"
---

:::note
转载自：https://blog.caowo.de/posts/gpt-plus-exploit-revenuecat-vulnerability/
:::
# 前言

今天给大家带来一个相当有意思的支付安全案例分析。这个漏洞的核心在于 ChatGPT 安卓客户端与第三方订阅管理平台 RevenueCat 之间的回调鉴权缺失，导致攻击者可以通过修改响应包的方式，实现 Plus/Pro 权益的无限复制。

先说结论：这不是传统意义上的"破解"，而是典型的业务逻辑漏洞。漏洞根源在于服务端过度信任客户端传入的订阅凭证，且未与 Google Play 侧进行二次校验。

# 漏洞原理概述

整个攻击链可以分为三个关键步骤：

1. **优惠码注入**：通过中间人攻击修改 `/accounts/check/v4-2023-04-27` 接口响应，强行注入优惠码
2. **零元订阅**：利用 100% 折扣优惠完成订阅，触发 Google 风控最低验证
3. **凭证提取**：拦截 RevenueCat 回调获取 `fetch_token`，该凭证可用于给其他账号开通权益

# 环境准备

## 必要条件

- 美区谷歌账号 × 1（任意区均可，非必须英区）
- 任意美卡 × 1（用于绑定账号，实际不扣费）
- 安卓设备 × 1（需 Root 以安装 MITM 证书，模拟器亦可）

## 工具链

- MITM 抓包工具（推荐 HttpCanary 或 Charles）
- Root 权限管理工具（Magisk）
- ChatGPT 安卓客户端

# 技术细节拆解

## 第一步：优惠码注入

ChatGPT 安卓应用在启动时会调用以下接口获取当前登录用户信息：

```sql
GET https://android.chat.openai.com/backend-api/accounts/check/v4-2023-04-27
```

响应包中包含 `eligible_promo_campaigns` 字段，用于存储当前账号可用的优惠活动。正常情况下，这个字段由服务端根据账号资格动态返回。

通过中间人攻击，我们可以修改响应包，强行插入以下固定优惠码：

| 优惠码 | 效果 | 稳定性 |

|--------|------|--------|

| `3-day-free-trial` | 3 天免费试用 | 固定可用 |

| `plus-1-month-free-trial` | 1 个月免费试用 | 固定可用 |

| `1-month-10-dollars` | 半价优惠（$5/月） | 固定可用 |

| `pro-winback-1-month-free` | Pro 挽回试用 1 个月 | 特定资格账号 |

这些优惠码是固定的，每次都可以使用。这也是为什么外面卡网可以持续生产低价 Plus 会员的根本原因。

## 第二步：构造优惠响应

以下是注入 1 个月免费试用优惠的响应包示例：

```json
{

  "eligible_promo_campaigns": {

    "plus": {

      "id": "plus-1-month-free",

      "metadata": {

        "plan_name": "chatgptplusplan",

        "title": "linux.do",

        "summary": "你已获得 1 个月的 Plus 套餐优惠促销代码。",

        "discount": {

          "percentage": 100

        },

        "credit_grant": null,

        "duration": {

          "num_periods": 1,

          "period": "month"

        },

        "schedule": null,

        "price_period": "recurring",

        "promotion_type": "discount",

        "promotion_type_label": "1-month free trial",

        "no_auto_renewal_at_discount_end": true,

        "plan_type_change": null

      }

    }

  }

}
```

关键字段说明：

- `discount.percentage`: 100 表示 100% 折扣（即 0 元）
- `duration.num_periods`: 优惠持续时间（1 表示 1 个月）
- `no_auto_renewal_at_discount_end`: true 表示优惠结束后不自动续费

## 第三步：零元订阅与风控绕过

修改响应后重新打开 ChatGPT 应用，点击升级即可看到 1 个月免费试用界面。

由于是 0 元订阅，Google Play 的风控级别极低，仅需通过验卡环节即可完成订阅。这也是为什么需要提前绑定一张美卡的原因——不是为了扣费，而是为了通过 Google 的风控验证。

## 第四步：提取订阅凭证

订阅成功后，ChatGPT 会向 RevenueCat 回调接口发送订阅凭证：

```bash
POST https://api.revenuecat.com/v1/receipts
```

拦截该请求，提取响应中的 `fetch_token` 字段：

```json
{

  "fetch_token": "xxxx",

  ...

}
```

这个 `fetch_token` 就是订阅凭证。将其保存后，即可用于给其他账号开通 Plus 权益。

# 漏洞利用方式

## 方案一：单账号循环使用

适用于个人使用场景：

1. 使用主账号完成上述流程获取 `fetch_token`
2. 从网页版 Session 中提取目标账号的 `account.id`
3. 调用开通接口传入 `account.id` + `fetch_token`
4. 目标账号获得 Plus 权益

## 方案二：批量开卡（已修复）

这是之前某个公益 Bot 使用的大规模开 Pro 方案：

1. 正价开通一个 ChatGPT Pro 账号
2. 在客户端内点击"降级为 Plus"
3. 客户端向 RevenueCat 请求新的 `fetch_token`
4. 该 token 为一次性凭证，未使用前可无限生成
5. 将 token 分发给需要开 Pro 的账号

**漏洞根源**：RevenueCat 作为第三方订阅管理平台，与 ChatGPT 服务端之间的回调接口缺乏鉴权机制。服务端未校验 `fetch_token` 的来源合法性，仅验证 token 格式有效即开通权益。

**修复状态**：该方案已被修复。目前 `fetch_token` 已与设备指纹和账号绑定，无法跨账号使用。

# 技术总结

## 漏洞类型

- **业务逻辑漏洞**：服务端过度信任客户端传入的订阅凭证
- **第三方集成风险**：RevenueCat 回调接口缺乏鉴权
- **优惠码校验缺失**：未校验优惠码的获取途径合法性

## 攻击链关键点

1. **中间人攻击可行性**：安卓客户端未启用 SSL Pinning（或可被 Root 绕过）
2. **零元订阅风控宽松**：Google Play 对 0 元交易验证级别低
3. **凭证复用漏洞**：`fetch_token` 未与账号/设备绑定

## 防御建议

### 对开发者的建议

1. **服务端校验**：所有订阅状态变更必须与 Google Play Billing 侧二次确认
2. **凭证绑定**：`fetch_token` 应绑定设备指纹、账号 ID、时间戳
3. **优惠码校验**：记录优惠码使用历史，检测异常使用模式
4. **SSL Pinning**：移动端应用应启用证书锁定防止中间人攻击

### 对用户的提醒

1. 此类漏洞属于灰色地带，使用可能导致账号被封禁
2. 绑定的支付方式存在潜在风险，建议使用虚拟卡
3. 漏洞随时可能被修复，不建议作为长期使用方案

# 法律免责声明

本文仅用于技术研究与安全交流，请勿将所述技术用于非法用途。未经授权的订阅漏洞利用可能违反以下法律：

- 《中华人民共和国网络安全法》
- 《计算机信息网络国际联网安全保护管理办法》
- 美国 Computer Fraud and Abuse Act (CFAA)

如因滥用本文技术导致的法律后果，作者不承担任何责任。