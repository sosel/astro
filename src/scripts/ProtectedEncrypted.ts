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
