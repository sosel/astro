// BaiduAnalytics.ts
export default async () => {
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?7914eed76c219d33106518e2ea3b4eeb";  // 替换为你自己的百度统计 ID
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
}
