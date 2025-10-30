import { inRouter, outRouter } from "@/utils/updateRouter";
// Banner 打字效果
import TypeWriteInit from "@/scripts/TypeWrite";
// 泡泡🫧效果
import PaoPaoInit from "@/scripts/PaoPao";
// 初始化文章代码块
import codeInit from "@/scripts/Code";
// 初始化视频播放器
import videoInit from "@/scripts/Video";
// 初始化音乐播放器
import musicInit from "@/scripts/Music";
// 初始化 LivePhoto
import livePhotoInit from '@/scripts/LivePhoto'
// 初始化BackTop组件
import BackTopInitFn from "@/scripts/BackTop";
// 搜索
import { searchFn, vhSearchInit } from "@/scripts/Search";
// 图片懒加载
import vhLzImgInit from "@/scripts/vhLazyImg";
// 图片灯箱
import ViewImage from "@/scripts/ViewImage";
// 底部网站运行时间
import initWebSiteTime from "@/scripts/Footer";
// 友情链接初始化
import initLinks from "@/scripts/Links";
// 朋友圈 RSS 初始化
import initFriends from "@/scripts/Friends";
// 动态说说初始化
import initTalking from "@/scripts/Talking";
// 文章评论初始化
import { checkComment, commentInit } from "@/scripts/Comment";
// 移动端侧边栏初始化
import initMobileSidebar from "@/scripts/MobileSidebar";
// Google 广告
import GoogleAdInit from "@/scripts/GoogleAd";
// Han Analytics 统计
//import HanAnalyticsInit from "@/scripts/HanAnalytics";
// BaiduAnalytics 统计
import BaiduAnalyticsInit from "@/scripts/BaiduAnalytics";
//  谷歌 SEO 推送
import SeoPushInit from "@/scripts/SeoPush";
// SmoothScroll 滚动优化
import SmoothScroll from "@/scripts/Smoothscroll";

// ============================================================

// 页面初始化 Only
const videoList: any[] = [];
const MusicList: any[] = [];
let commentLIst: any = { walineInit: null };
const indexInit = async (only: boolean = true) => {
  // 初始化网站运行时间
  only && initWebSiteTime();
  // 初始化BackTop组件
  only && BackTopInitFn();
  // SmoothScroll 滚动优化
  only && SmoothScroll();
  // 图片灯箱
  only && ViewImage();
  // 初始化文章代码块
  codeInit();
  // 图片懒加载初始化
  vhLzImgInit();
  // 初始化 LivePhoto
  livePhotoInit();
  // 文章视频播放器初始化
  videoInit(videoList);
  // 文章音乐播放器初始化
  musicInit(MusicList);
  // 友情链接初始化
  initLinks();
  // 朋友圈 RSS 初始化
  initFriends();
  // 动态说说初始化
  initTalking();
  // Google 广告
  GoogleAdInit();
  // 谷歌 SEO 推送
  SeoPushInit();
  // 文章评论初始化
  checkComment() && commentInit(checkComment(), commentLIst)
  // Han Analytics 统计
  //HanAnalyticsInit();
  //百度统计
  await BaiduAnalyticsInit();
  // 打字效果
  only && TypeWriteInit();
  // 泡泡🫧效果
  PaoPaoInit();
  // 预加载搜索数据
  only && searchFn("");
  // 初始化搜索功能
  vhSearchInit();
  // 移动端侧边栏初始化
  initMobileSidebar();
};

export default () => {
  // 首次初始化
  indexInit();
  // 进入页面时触发
  inRouter(() => indexInit(false));
  // 离开当前页面时触发
  outRouter(() => {
    // 销毁评论
    commentLIst.walineInit && commentLIst.walineInit.destroy();
    commentLIst.walineInit = null;
    // 销毁播放器
    videoList.forEach((i: any) => i.destroy());
    videoList.length = 0;
    // 销毁音乐
    MusicList.forEach((i: any) => i.destroy());
    MusicList.length = 0;
  });
  console.log("%c🌻 程序：Astro | 主题：vhAstro-Theme | 作者：Han | Github：https://github.com/uxiaohan/vhAstro-Theme 🌻", "color:#fff; background: linear-gradient(270deg, #18d7d3, #68b7dd, #8695e6, #986fee); padding: 8px 15px; border-radius: 8px");
  console.log("%c\u521D\u59CB\u5316\u5B8C\u6BD5.", "color: #ffffff; background: #000; padding:5px");
}
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
