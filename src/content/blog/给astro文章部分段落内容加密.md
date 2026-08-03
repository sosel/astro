---
title: "给astro文章部分段落内容加密"
categories: 教程
tags: ["astro"]
id: "astro-part-content-encryption"
date: 2025-09-10 18:18:18
cover: "https://img.mailberry.com.cn/i/2025/1757487905991-1757487707170-20250910_123858.webp"
recommend: true
top: true
---


:::note

由于Astro最后构建的是HTML纯静态内容，要实现部分内容加密并没有wordpress那么方便，在借助GPT5的帮助下，完成了纯静态内容加密解密功能，最终实现通过微信扫码关注公众号，发送预设好的自动回复，得到答案完成解锁查看完整内容，效果如动态所示：
:::

![1757487905991-1757487707170-20250910_123858](https://img.mailberry.com.cn/i/2025/1757487905991-1757487707170-20250910_123858.webp)

## 文件变动

1. src\components\ProtectedEncrypted.astro 新建，加密组件
2. script\encrypt-section.mjs 新建，生成json加密脚本
   1. src\secret\tiktok-ios-p3.html 新建，可以任意目录，⚠️不要上传到服务器
   2. public\protected\tiktok-ios-p3.enc.json 在执行2用法时自动生成，无需手动操作
3. src\scripts\ProtectedEncrypted.ts 新建，解密脚本
4. src\styles\Article.less 修改，添加组件样式
5. src\scripts\Init.ts 修改，初始化按需要加载3的脚本，文章没有加密脚本的不加载3
6. src\content\blog\解决苹果版Tiktok网络连接不稳定问题.md 修改，文章里插入2生成的占位块代码

## 步骤

第一步，先创建：src\components\ProtectedEncrypted.astro

```html
---
const { src, placeholder = "输入密码查看内容" } = Astro.props;
const id = `pe-${Math.random().toString(36).slice(2)}`;
---
<div id={id}>
  <form>
    <input type="password" placeholder={placeholder} required />
    <button type="submit">解锁</button>
  </form>
  <div class="content" style="margin-top:.5rem;"></div>
</div>

<script is:inline>
const root = document.currentScript.previousElementSibling;
const form = root.querySelector('form');
const input = form.querySelector('input[type="password"]');
const contentEl = root.querySelector('.content');
const srcUrl = Astro.props.src;

function b64ToBuf(b64){ return Uint8Array.from(atob(b64), c => c.charCodeAt(0)).buffer; }
function concatBuf(a,b){ const ua=new Uint8Array(a.byteLength+b.byteLength); ua.set(new Uint8Array(a)); ua.set(new Uint8Array(b), a.byteLength); return ua.buffer; }

async function deriveKey(password, salt){
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();  // 确保不触发页面刷新
  const pwd = input.value;
  form.querySelector('button').disabled = true;
  try {
    const meta = await fetch(srcUrl, { cache: 'no-store' }).then(r => r.json());
    const salt = b64ToBuf(meta.salt), iv = b64ToBuf(meta.iv);
    const ct = b64ToBuf(meta.ct), tag = meta.tag ? b64ToBuf(meta.tag) : new ArrayBuffer(0);
    const data = concatBuf(ct, tag); // GCM: 密文后拼接 tag
    const key = await deriveKey(pwd, salt);
    const plainBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv, tagLength: 128 }, key, data);
    const html = new TextDecoder().decode(plainBuf);
    contentEl.innerHTML = html; // 直接更新内容
    form.remove();  // 移除表单
  } catch (error) {
    alert('解密失败：密码错误或数据损坏');
  } finally {
    form.querySelector('button').disabled = false;
    input.value = '';  // 清空输入框，防止重试
  }
});



```

第二步，创建：script\encrypt-section.mjs

```jsx
// 用法：node script/encrypt-section.mjs <输入html> <输出json> "<密码>"
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const [,, inFile, outFile, pwdArg] = process.argv;
const password = process.env.SECTION_PASSWORD || pwdArg;
if (!inFile || !outFile || !password) {
  console.error('用法: node script/encrypt-section.mjs <输入html> <输出json> "<密码>"');
  process.exit(1);
}
const plaintext = fs.readFileSync(inFile);

const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);
const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const tag = cipher.getAuthTag();

const payload = {
  kdf: 'PBKDF2-SHA256',
  iter: 100000,
  salt: salt.toString('base64'),
  iv: iv.toString('base64'),
  alg: 'AES-256-GCM',
  ct: ciphertext.toString('base64'),
  tag: tag.toString('base64'),
};
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(payload));
console.log('Wrote', outFile);

```

第三步，创建：src\scripts\ProtectedEncrypted.ts

```ts
export function initProtectedEncrypted(root: Document | HTMLElement = document) {
  const blocks = root.querySelectorAll<HTMLElement>('.pe-block[data-protected-src]:not([data-wired])');
  blocks.forEach((block) => {
    block.setAttribute('data-wired', '');

    const form = block.querySelector<HTMLFormElement>('.pe-form');
    const input =
      block.querySelector<HTMLInputElement>('.pwd-show-input') ||
      block.querySelector<HTMLInputElement>('input[type="password"], input[type="text"]');
    const contentEl = block.querySelector<HTMLElement>('.pe-content');
    const src = block.getAttribute('data-protected-src');

    if (!form || !input || !contentEl || !src) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      (form.querySelector('button') as HTMLButtonElement | null)?.setAttribute('disabled', 'true');
      try {
        const meta = await fetch(src, { cache: 'no-store' }).then((r) => r.json());
        const salt = b64ToBuf(meta.salt), iv = b64ToBuf(meta.iv);
        const ct = b64ToBuf(meta.ct), tag = meta.tag ? b64ToBuf(meta.tag) : new ArrayBuffer(0);
        const data = concatBuf(ct, tag); // AES-GCM期望密文后紧跟tag
        const key = await deriveKey(input.value, salt);
        const plainBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv, tagLength: 128 }, key, data);
        const html = new TextDecoder().decode(plainBuf);
        contentEl.innerHTML = html;
        form.remove();
      } catch {
        alert('解密失败：密码错误或数据损坏');
      } finally {
        (form.querySelector('button') as HTMLButtonElement | null)?.removeAttribute('disabled');
        input.value = '';
      }
    });
  });
}

// ---- helpers ----
function b64ToBuf(b64: string) {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)).buffer;
}
function concatBuf(a: ArrayBuffer, b: ArrayBuffer) {
  const out = new Uint8Array(a.byteLength + b.byteLength);
  out.set(new Uint8Array(a), 0);
  out.set(new Uint8Array(b), a.byteLength);
  return out.buffer;
}
async function deriveKey(password: string, salt: ArrayBuffer) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
}

```

第四步，修改样式，打开：src\styles\Article.less 拉到最后，加上下面样式代码

```less
/* 部分内容加密公众号外层容器：左右两列（左：提示+输入+按钮；右：二维码） */
.wxshow {
  display: flex;
  align-items: center;        /* 让左右在同一水平线 */
  justify-content: space-between;
  gap: 16px;                  /* 左右留点间距 */
  border: 1px solid rgba(0,0,0,.05);
  padding: 10px;
  /* max-width: 450px;  <-- 这会导致一行放不下时换行，建议放大或取消 */
  max-width: 640px;           /* 放大到 640px（可按需调整），更能放下一行 */
  width: 100%;
  margin: 10px auto;
  transition: all .3s ease 0s;
  border-radius: 6px;         /* 稍微圆一点 */
  font-size: 14px;
}

.wxshow:hover {
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 10%);
  border-color: rgba(0,0,0,.1);
  transform: translateY(-3px);
}

/* 左侧：提示 + 输入 + 按钮（横向对齐，不强制换行） */
.wxshow-pwd-plane {
  display: flex;
  align-items: center;
  flex-wrap: wrap;            /* 窄屏时允许换行，但优先同一行 */
  gap: 8px 10px;              /* 元素间距（行间/列间） */
  margin: 0;                  /* 去掉原来 10px 顶部外边距，避免被挤下去 */
  flex: 1 1 auto;             /* 占据剩余空间，给右侧二维码留固定宽 */
}

/* 提示文字更紧凑些，不要把整行撑开 */
.wxshow-pwd-plane p {
  margin: 0;
  font-weight: 600;
  white-space: nowrap;        /* 尽量不折行（窄屏会因为 wrap 规则而换行） */
}

/* 输入框与按钮尺寸 */
.wxshow .pwd-show-input {
  box-sizing: border-box;
  width: min(260px, 50vw);    /* 260px 或者不超过视口宽度一半 */
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
}

.wxshow .pwd-show-btn {
  padding: 8px 14px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  background: #222;
  color: #fff;
}

/* 右侧二维码固定在一列，避免被压缩变形 */
.wxshow-img-plane {
  margin-left: 10px;
  flex: 0 0 auto;             /* 不要挤占左侧空间 */
}

.wxshow-img-plane img {
  display: block;
  width: 200px;               /* 你也可以用 150px，看你左侧空间是否够 */
  height: auto;
  max-width: 100%;
  box-shadow: none !important;
}

/* 小屏：上下堆叠显示，居中 */
@media (max-width: 500px) {
  .wxshow {
    flex-direction: column;
    text-align: center;
    max-width: 100%;
    padding: 10px;
  }
  .wxshow-pwd-plane {
    justify-content: center;
  }
  .wxshow-pwd-note {
    text-align: left;
  }
  .wxshow-img-plane img {
    width: 120px;             /* 可保持与上面一致 */
  }
}

```

第五步，修改初始化文件，打开：src\scripts\Init.ts 拉到最后，加以下代码

```ts
/* ========== ProtectedEncrypted：按需动态加载 + 条件护栏 + 仅在 swup 容器内复位 data-wired ========== */
(() => {
  if (typeof window === 'undefined') return;

  // 和 astro.config.mjs 里的 swup(containers) 保持一致
  const SWUP_CONTAINER_SELECTORS = [
    '.main-inner>.main-inner-content',
    '.vh-header>.main',
  ];

  function getSwupContainers(): Element[] {
    const out: Element[] = [];
    for (const sel of SWUP_CONTAINER_SELECTORS) {
      document.querySelectorAll(sel).forEach((el) => out.push(el));
    }
    return out;
  }

  function hasBlockInContainers(): boolean {
    const cs = getSwupContainers();
    if (cs.length === 0) return false;
    return cs.some((c) => !!c.querySelector('.pe-block[data-protected-src]'));
  }

  function resetWiredInContainers(): void {
    const cs = getSwupContainers();
    if (cs.length === 0) return;
    cs.forEach((c) => {
      c.querySelectorAll<HTMLElement>('.pe-block[data-wired]').forEach((el) => {
        el.removeAttribute('data-wired');
      });
    });
  }

  async function boot(): Promise<void> {
    const m = await import('./ProtectedEncrypted'); // 二次导入会走缓存
    m.initProtectedEncrypted();
  }

  function observeThenBoot(): void {
    const mo = new MutationObserver(() => {
      if (hasBlockInContainers()) {
        mo.disconnect();
        resetWiredInContainers();
        void boot();
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  // —— 提交“条件护栏”：仅在未绑定时拦截，加载完成后自动二次提交 —— //
  let guardArmed = false;
  let guardHandler: ((e: Event) => void) | null = null;

  function armGuard(): void {
    if (guardArmed) return;
    guardArmed = true;
    guardHandler = (e: Event) => {
      const t = e.target as HTMLFormElement | null;
      if (!t || typeof (t as any).matches !== 'function' || !t.matches('.pe-form')) return;

      const block = t.closest('.pe-block') as HTMLElement | null;
      const wired = !!block?.hasAttribute('data-wired');

      if (!wired) {
        // 仅在未绑定时拦截默认提交（避免整页刷新），并自动完成一次“加载→绑定→二次提交”
        e.preventDefault();
        resetWiredInContainers();
        (async () => {
          await boot(); // initProtectedEncrypted 会立刻给 block 加 data-wired 并绑定 submit
          // 再次触发表单提交（此时已绑定，不会被我们这层拦下）
          try {
            t.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
          } catch {}
        })();
      }
      // 如果已经 wired，就不拦（让真正的 submit 监听器接管）
    };
    // 捕获阶段：先于页面其他监听器触发
    document.addEventListener('submit', guardHandler as EventListener, true);
  }

  function wire(): void {
    armGuard();                 // 护栏常驻，但只在“未绑定”时发挥作用
    resetWiredInContainers();   // 返回缓存页时先复位 data-wired，确保能重新绑定
    if (hasBlockInContainers()) {
      void boot();              // 容器里已有受保护块：立即按需加载并绑定
    } else {
      observeThenBoot();        // 等块出现（兼容 swup 异步渲染时序）
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire, { once: true });
  } else {
    wire();
  }

  // swup 切页后重新按需处理
  window.addEventListener('swup:contentReplaced', wire);
})();

```

第六步，创建：src\secret\tiktok-ios-p3.html 这个就是需要加密的内容**2.1**

```html
<p><strong>共享账号</strong></p>
<p>用户名：test</p>
<p>密码：test123</p>
```

第七步，使用第二步的脚本生成加密的json内容，用法第二步代码注解里有。

// 用法：node script/encrypt-section.mjs <输入html> <输出json> "<密码>"

![image-20250910123113350](https://img.mailberry.com.cn/i/2025/image-20250910123113350.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

即生成**2.2**中的：public\protected\tiktok-ios-p3.enc.json文件

第八步，在文章中加入占位块，如我的文章“src\content\blog\解决苹果版Tiktok网络连接不稳定问题.md”，代码如下：

```html
<!-- 受保护段落（前端加密解密，占位块） -->
<div class="pe-block wxshow-main" data-protected-src="/protected/tiktok-ios-p3.enc.json">
  <form class="pe-form wxshow" method="post" autocomplete="off">
    <div class="wxshow-pwd-plane">
      <p>🔒 此处内容需要输入密码才能查看</p>
<input type="text" name="wxpwd" value="" class="pwd-show-input" placeholder="请输入密码" required />

<button type="submit" class="pwd-show-btn">提交</button>
<div class="wxshow-pwd-note">
        <span style="color: red">由于内容特殊性，请见谅！</span><br />
        微信扫码关注公众号，回复：<br />
        <span style="color: red">访问密码</span>，即可获取密码！
      </div>
    </div>

<div class="wxshow-img-plane">
      <img decoding="async" src="/assets/images/your-qrcode.png" alt="公众号二维码" />
    </div>
  </form>

  <!-- 解密后的内容将插入这里 -->
  <div class="pe-content"></div>
</div>
```

如图，在需要位置插入

![image-20250910123545329](https://img.mailberry.com.cn/i/2025/image-20250910123545329.webp?x-oss-process=image/watermark,text_WnBlYS5jbg==,type_ZmFuZ3poZW5naGVpdGk,size_18,shadow_50,t_70,g_se,x_10,y_10,color_ffffff)

成品后和效果看头图

## 总结

仅首次需要搞这么多个文件，后面使用上只要重复678步骤就行了，把内容提出来——用脚本加密——生成加密后的json文件（自动）——在文章引入占位块（输入密码的模块）。

