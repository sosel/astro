---
title: "reinstall 快速重装 Ubuntu 22.04 与导出镜像到 NAS"
categories: system
tags: ["reinstall"]
id: "backup os to nas"
date: 2026-07-28 18:18:18
cover: ""
recommend: false
top: false 
---

项目：https://github.com/bin456789/reinstall 原文转自ns@wzx

适用场景：

- VPS 只有一块系统盘。
- 使用 `reinstall.sh` 快速重装 Ubuntu 22.04。
- 服务部署完成后，通过 SSH 将整个系统盘直接压缩并保存到 NAS。
- VPS 本地不生成镜像文件。

### 一、快速重装 Ubuntu 22.04

下载脚本：

```bash
cd /root
curl -O https://raw.githubusercontent.com/bin456789/reinstall/main/reinstall.sh
```

国内 VPS 可使用：

```bash
curl -O https://cnb.cool/bin456789/reinstall/-/git/raw/main/reinstall.sh
```

开始重装：

```bash
bash reinstall.sh ubuntu 22.04
```

根据提示输入：

```text
用户名：root
密码：自己的 root 密码
```

不需要配置 SSH 密钥。脚本执行完成后直接重启：

```bash
reboot
```

等待安装完成，然后登录：

```bash
ssh root@VPS_IP
```

登录后更新系统：

```bash
apt update
apt full-upgrade -y
reboot
```

然后正常部署 Docker、Nginx、数据库和其他服务。

如果运行脚本后发现配置错误，并且还没有重启，可以取消：

```bash
bash reinstall.sh reset
```

### 二、准备 NAS

NAS 需要：

- 开启 SSH 服务。
- 创建用于保存镜像的目录。
- NAS 用户对该目录有写入权限。
- 剩余空间足够保存压缩后的整盘镜像。

下面示例使用：

```text
NAS 用户：backup
NAS 地址：192.168.1.10
NAS 目录：/volume1/vps-images
```

实际使用时替换为自己的 NAS 信息。NAS 地址必须能从 VPS 访问，可以使用公网域名、端口映射地址，或者 Tailscale、WireGuard 等 VPN 地址；普通家庭局域网地址只有在 VPS 已接入同一 VPN 时才可用。

### 三、进入 Alpine Live

在 Ubuntu 中执行：

```bash
cd /root
curl -O https://raw.githubusercontent.com/bin456789/reinstall/main/reinstall.sh
bash reinstall.sh alpine --hold 1
```

根据提示输入：

```text
用户名：root
密码：设置一个临时的 Live 登录密码
```

然后重启：

```bash
reboot
```

VPS 会进入运行在内存中的 Alpine Live，不会自动重装或删除原 Ubuntu。

### 四、登录 Alpine Live

如果 SSH 提示主机密钥发生变化，在本地电脑执行：

```bash
ssh-keygen -R VPS_IP
```

然后登录：

```bash
ssh root@VPS_IP
```

输入刚才设置的临时 root 密码。

### 五、确认系统盘

在 Alpine Live 中执行：

```bash
apk add --no-cache util-linux zstd openssh-client
lsblk
```

确认需要导出的整块系统盘。下面假设系统盘是：

```text
/dev/vda
```

实际也可能是 `/dev/sda` 或 `/dev/nvme0n1`。

导出时必须使用整块磁盘，例如 `/dev/vda`，不能使用分区 `/dev/vda1`。

### 六、测试 NAS SSH

设置 NAS 信息：

```bash
NAS_USER="backup"
NAS_IP="192.168.1.10"
NAS_DIR="/volume1/vps-images"
```

测试连接和目录权限：

```bash
ssh "${NAS_USER}@${NAS_IP}" \
  "mkdir -p '${NAS_DIR}' && test -w '${NAS_DIR}' && echo NAS_OK"
```

输入 NAS 用户密码。看到 `NAS_OK` 表示可以写入。

如果 NAS SSH 不是 22 端口，在后面的每条 `ssh` 命令中增加：

```text
-p NAS_SSH_PORT
```

### 七、直接导出镜像到 NAS

设置镜像文件名：

```bash
IMAGE_NAME="ubuntu22-$(date -u +%Y%m%dT%H%M%SZ).raw.zst"
```

开始导出：

```bash
set -o pipefail

if zstd -T0 -3 -c /dev/vda | \
  ssh "${NAS_USER}@${NAS_IP}" \
  "cat > '${NAS_DIR}/${IMAGE_NAME}.part'"
then
  ssh "${NAS_USER}@${NAS_IP}" \
    "mv '${NAS_DIR}/${IMAGE_NAME}.part' '${NAS_DIR}/${IMAGE_NAME}' && \
     sha256sum '${NAS_DIR}/${IMAGE_NAME}' > '${NAS_DIR}/${IMAGE_NAME}.sha256' && \
     ls -lh '${NAS_DIR}/${IMAGE_NAME}' '${NAS_DIR}/${IMAGE_NAME}.sha256'"
else
  echo "镜像导出失败，NAS 上保留的是不完整的 .part 文件"
fi
```

执行过程中会要求输入 NAS 用户密码。

这条命令会：

1. 从 `/dev/vda` 读取整个系统盘。
2. 在 VPS 内存系统中使用 zstd 压缩。
3. 通过 SSH 将压缩数据直接传到 NAS。
4. 先保存为 `.part` 临时文件。
5. 成功后改为 `.raw.zst`，并在 NAS 上生成 SHA-256 文件。

VPS 系统盘上不会保存镜像文件。

导出期间不要关闭 SSH、重启 VPS 或断开网络。

### 八、确认 NAS 文件

在 Alpine Live 中执行：

```bash
ssh "${NAS_USER}@${NAS_IP}" \
  "ls -lh '${NAS_DIR}/${IMAGE_NAME}' '${NAS_DIR}/${IMAGE_NAME}.sha256'"
```

也可以登录 NAS 管理界面确认文件存在。

如果导出失败，删除对应的 `.part` 文件后重新执行：

```bash
ssh "${NAS_USER}@${NAS_IP}" \
  "rm -f '${NAS_DIR}/${IMAGE_NAME}.part'"
```

### 九、返回 Ubuntu

镜像确认完成后，在 Alpine Live 中执行：

```bash
reboot
```

VPS 会重新启动原来的 Ubuntu 22.04。

### 十、以后定期导出

以后重复以下流程：

```text
运行 reinstall.sh alpine --hold 1
→ 输入临时 root 密码
→ 重启进入 Alpine Live
→ 确认系统盘
→ zstd 压缩并通过 SSH 直传 NAS
→ 确认 NAS 镜像文件
→ 重启回 Ubuntu
```

每次镜像都会包含系统盘的分区表、引导信息、Ubuntu 系统、已部署服务和业务数据，但不会包含其他硬盘。

### 十一、恢复镜像

需要恢复时，将 NAS 中的 `.raw.zst` 镜像放到可直接下载的 HTTP/HTTPS 地址，然后执行：

```bash
cd /root
curl -O https://raw.githubusercontent.com/bin456789/reinstall/main/reinstall.sh
bash reinstall.sh dd --img "https://example.com/ubuntu22-YYYYMMDDTHHMMSSZ.raw.zst"
reboot
```

恢复会覆盖目标整块硬盘，目标硬盘不能小于制作镜像时的系统盘。