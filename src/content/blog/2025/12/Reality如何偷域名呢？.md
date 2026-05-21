---
title: "Reality如何偷域名呢？"
categories: 教程
tags: ['Reality']
id: "ee1857fe273efd08"
date: 2025-12-05 16:19:08
cover: "https://t.zpea.cn/i/2025/image-20251205153421407.png"
---

:::note
目前相对安全又简单的，应该就是Reality了，这协议特点是借用正常站点的SSL握手，然后再传数据，就面临一个偷域名的问题，今天记录一下我挑选的过程。

## 目标域名要求

主要挑选的域名能满足以下特点，就基本可以了

- 不要使用跳转域名（使用跳转完成的域名）
- 目标网站必须支持 TLS1.3
- 目标网站必须支持 X25519
- 目标网站必须支持HTTP/2 (H2)
- 目标域名必须和 SNI 匹配

## 热门域名

通用型，可以被90%用户成功使用，也就是大众型域名，但是使用的人也多，大家仁者见仁吧。

域名列表

```
academy.nvidia.com
academy.nvidia.com
addons.mozilla.org
aod.itunes.apple.com
ateway.icloud.com
cdn-dynmedia-1.microsoft.com
cname.vercel-dns.com
d1.awsstatic.com
dl.google.com
download-installer.cdn.mozilla.net
github.io
images-na.ssl-images-amazon.com
images.apple.com
itunes.apple.com
lol.secure.dyn.riotcdn.net
m.media-amazon.com
mensura.cdn-apple.com
one-piece.com
osxapps.itunes.apple.com
player.live-video.net
react.dev
redis.io
s0.awsstatic.com
software.download.prss.microsoft.com
swcdn.apple.com
swdist.apple.com
updates.cdn-apple.com
vercel-dns.com
vuejs-jp.org
vuejs.org
www.amd.com
www.asus.com
www.calstatela.edu
www.caltech.edu
www.cisco.com
www.fom-international.com
www.google-analytics.com
www.java.com
www.lovelive-anime.jp
www.mongodb.com
www.mysql.com
www.oracle.com
www.python.org
www.samsung.com
www.suffolk.edu
www.suny.edu
www.swift.com
www.swift.com
www.u-can.co.jp
www.umcg.nl
zh-hk.vuejs.org
apps.mzstatic.com
cdnssl.clicktale.net
```

### 挑选

挑选自己服务器延时最低的，并且各参考数据都还OK的，在服务器运行，不需要额外的工具。

方式一：

“一行命令”

👉 **复制即用：**自行修改域名部分

```bash
DOMAINS="images.apple.com amd.com"; printf '+----------------+---------+---------+---------+-----+-----+-----+-----+-------+\n| %-14s | %-7s | %-7s | %-7s | %-3s | %-3s | %-3s | %-3s | %-5s |\n+----------------+---------+---------+---------+-----+-----+-----+-----+-------+\n' "域名" "握手" "证书" "SNI" "13" "255" "H2" "CDN" "状态"; for d in $DOMAINS; do t1=$(date +%s%3N); o=$(timeout 3 openssl s_client -connect "$d:443" -servername "$d" -alpn h2 </dev/null 2>/dev/null); if [ -n "$o" ]; then t2=$(date +%s%3N); hs=$((t2-t1)); proto=$(echo "$o" | awk -F': *' '/Protocol/{gsub(/ /,"",$2);print $2}'); [ "$proto" = "TLSv1.3" ] && tls=Y || tls=N; echo "$o" | grep -qi 'X25519' && x255=Y || x255=N; echo "$o" | grep -qi 'h2' && h2=Y || h2=N; cert=$(echo "$o" | openssl x509 -noout -dates -ext subjectAltName -subject 2>/dev/null); na=$(echo "$cert" | awk -F= '/notAfter/{print $2}'); days="--"; if [ -n "$na" ]; then end=$(date -d "$na" +%s 2>/dev/null || echo 0); now=$(date +%s); [ "$end" -gt 0 ] && days=$(( (end-now)/86400 )); fi; echo "$cert" | grep -qi "$d" && sni=Y || sni=N; cname=$(dig +short "$d" CNAME 2>/dev/null | tr '[:upper:]' '[:lower:]'); server=$(curl -k -sI --max-time 3 https://$d 2>/dev/null | awk -F': ' 'tolower($1)=="server"{print tolower($2)}' | tr -d '\r'); cs="$cname$server"; cdn="-"; echo "$cs" | grep -q 'cloudfront'  && cdn="CF"; echo "$cs" | grep -q 'akamai' && cdn="AK"; echo "$cs" | grep -q 'cloudflare' && cdn="CF"; echo "$cs" | grep -q 'fastly' && cdn="FS"; echo "$cs" | grep -q 'alicdn' && cdn="AL"; status=$(curl -k -o /dev/null -s -w '%{http_code}' --max-time 3 https://$d); printf '| %-14s | %5sms | %5s天 | %-7s | %-3s | %-3s | %-3s | %-3s | %-5s |\n+----------------+---------+---------+---------+-----+-----+-----+-----+-------+\n' "$d" "$hs" "$days" "$sni" "$tls" "$x255" "$h2" "$cdn" "$status"; else printf '| %-14s | %-7s | %-7s | %-7s | %-3s | %-3s | %-3s | %-3s | %-5s |\n+----------------+---------+---------+---------+-----+-----+-----+-----+-------+\n' "$d" "timeout" "--" "-" "-" "-" "-" "-" "---"; fi; done

```

方式二：

“二行命令” 

**其实**就是把一行命令拆分成两个命令，**方便替换**域名，终归也会组合成“一行命令”再执行的

第一条命令

```bash
DOMAINS="images.apple.com amd.com";
```

这复制过去，把域名换成你自己想要的

第二条命令

```bash
printf '+----------------+---------+---------+---------+-----+-----+-----+-----+-------+\n| %-14s | %-7s | %-7s | %-7s | %-3s | %-3s | %-3s | %-3s | %-5s |\n+----------------+---------+---------+---------+-----+-----+-----+-----+-------+\n' "域名" "握手" "证书" "SNI" "13" "255" "H2" "CDN" "状态"; for d in $DOMAINS; do t1=$(date +%s%3N); o=$(timeout 3 openssl s_client -connect "$d:443" -servername "$d" -alpn h2 </dev/null 2>/dev/null); if [ -n "$o" ]; then t2=$(date +%s%3N); hs=$((t2-t1)); proto=$(echo "$o" | awk -F': *' '/Protocol/{gsub(/ /,"",$2);print $2}'); [ "$proto" = "TLSv1.3" ] && tls=Y || tls=N; echo "$o" | grep -qi 'X25519' && x255=Y || x255=N; echo "$o" | grep -qi 'h2' && h2=Y || h2=N; cert=$(echo "$o" | openssl x509 -noout -dates -ext subjectAltName -subject 2>/dev/null); na=$(echo "$cert" | awk -F= '/notAfter/{print $2}'); days="--"; if [ -n "$na" ]; then end=$(date -d "$na" +%s 2>/dev/null || echo 0); now=$(date +%s); [ "$end" -gt 0 ] && days=$(( (end-now)/86400 )); fi; echo "$cert" | grep -qi "$d" && sni=Y || sni=N; cname=$(dig +short "$d" CNAME 2>/dev/null | tr '[:upper:]' '[:lower:]'); server=$(curl -k -sI --max-time 3 https://$d 2>/dev/null | awk -F': ' 'tolower($1)=="server"{print tolower($2)}' | tr -d '\r'); cs="$cname$server"; cdn="-"; echo "$cs" | grep -q 'cloudfront'  && cdn="CF"; echo "$cs" | grep -q 'akamai' && cdn="AK"; echo "$cs" | grep -q 'cloudflare' && cdn="CF"; echo "$cs" | grep -q 'fastly' && cdn="FS"; echo "$cs" | grep -q 'alicdn' && cdn="AL"; status=$(curl -k -o /dev/null -s -w '%{http_code}' --max-time 3 https://$d); printf '| %-14s | %5sms | %5s天 | %-7s | %-3s | %-3s | %-3s | %-3s | %-5s |\n+----------------+---------+---------+---------+-----+-----+-----+-----+-------+\n' "$d" "$hs" "$days" "$sni" "$tls" "$x255" "$h2" "$cdn" "$status"; else printf '| %-14s | %-7s | %-7s | %-7s | %-3s | %-3s | %-3s | %-3s | %-5s |\n+----------------+---------+---------+---------+-----+-----+-----+-----+-------+\n' "$d" "timeout" "--" "-" "-" "-" "-" "-" "---"; fi; done
```

接上一条命令后，再一起执行

**效果**

![image-20251205150324126](https://t.zpea.cn/i/2025/image-20251205150324126_1.png)

挑好心仪域名，再在服务上Ping一样

![image-20251205153421407](https://t.zpea.cn/i/2025/image-20251205153421407.png)

握手延时，和Ping延时都不错，就它了

## 冷门域名

寻找一些与服务器相邻域名的域名，这样可以达到延时最小，少人共同使用，起到更好的伪装，适合10%爱折腾的人。需要用到二个工具

::btn[RealiTLScanner]{link="https://github.com/XTLS/RealiTLScanner"}
在**本地电脑**扫服务器相邻IP的域名，并生成csv表格

::btn[RealityChecker]{link="https://github.com/V2RaySSR/RealityChecker"}
在服务器检查csv表格的，挑选合适自己的域名

**效果**

![image-20251205152058901](https://t.zpea.cn/i/2025/image-20251205152058901.png)

比如我搜到搬瓦工服务器相邻的这个域名就不错，而且比较冷门，当然也可以批量查询，自己看作者GITHUB说明吧，不重复描述了

## 总结

热门的域名就不需要扫描，只要在服务上检测一下哪些域名延时低就可以了，而且热门域名都是大公司，不用担心证书过期，大流量也能说得过去，不容易被注意，如果不想从众的，就自己挑选服务相邻的域名，但要注意对方域