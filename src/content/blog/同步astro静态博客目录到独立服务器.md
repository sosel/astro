---
title: "同步astro静态博客目录到独立服务器"
categories: 教程
tags: ["astro"]
id: "auto sync astro to vps"
date: 2025-09-16 18:18:18
cover: "https://t.zpea.cn/i/2025/image-20250915180814795.png"
recommend: false
top: false
--- 

:::note

🤵我是这样系列：这系列主要是介绍博主个人使用方式，不一定是最优的。

👩‍👩‍👦‍👦一般人使用astro都是配置github，使用git直接同步内容到github上，再参考官方指南将博客部署至 Vercel, Netlify,Cloudflare Pages, GitHub Pages 等，但我却想使用自己的服务器，而且不想在服务器端部署太多东西，仅装个nginx就能把博客跑起来

:::

## 准备条件

- 一台装了nginx的服务器，假如网站目录`/www/wwwroot/myblog`
- RaiDrive/rclone
- FreeFilesync

## 步骤

**第一步，安装nginx (服务端)**

先在服务器安装好nginx，并确定网站目录路径

**第二步，映射网站目录到本地**

打开RaiDrive或者rclone，我这里就以RaiDrive为例吧，有GUI好操作了

![image-20250915173354664](https://t.zpea.cn/i/2025/image-20250915173354664.png)

添加——新的虚拟驱动器——SFTP（如果是虚拟主机，可以选择FTP）

![image-20250915173522634](https://t.zpea.cn/i/2025/image-20250915173522634.png)

直接填写服务地址，目录，用户名和密码，确定

![image-20250915173709120](https://t.zpea.cn/i/2025/image-20250915173709120.png)

本地电脑就多出一个虚拟硬盘了

**第三步，设置同步**

打开FreeFilesync——新建一个同步配置

![image-20250915171259910](https://t.zpea.cn/i/2025/image-20250915171259910.png)

左边选择**文件内容**

![image-20250915174714421](https://t.zpea.cn/i/2025/image-20250915174714421.png)

右边选择**镜像**

![image-20250915174743592](https://t.zpea.cn/i/2025/image-20250915174743592.png)

最终是这样

1. 本地的构建目录
2. 服务器站点目录，映射到本地的目录
3. 比较“文件内容”
4. 同步“镜像”

![image-20250915170056098](https://t.zpea.cn/i/2025/image-20250915170056098.png)

比较后同步，数据就当镜像上传到目录器的站点目录了

## 自动化

实现定时自动同步，不用每次都打开FreeFilesync手动同步，在FreeFilesync点“另存为批处理作业”

![image-20250915175237917](https://t.zpea.cn/i/2025/image-20250915175237917.png)

另存为

![image-20250915175324839](https://t.zpea.cn/i/2025/image-20250915175324839.png)

得到 一个“ffs_batch”文件，我起名“自动同步astro构建目录到服务器.ffs_batch”

接着打开“RealTimeSync” 安装FreeFilesync时会一起安装的

![image-20250915180814795](https://t.zpea.cn/i/2025/image-20250915180814795.png)

新建一个自动同步——导入“自动同步astro构建目录到服务器.ffs_batch”

然后创建开机自启动

先写个bat批处理文件

```bat
@echo off
start "realtimesync" "D:\Program Files\FreeFileSync\RealTimeSync.exe" "C:\Users\Sosel\OneDrive\备份\FreeFileSync自动脚本\自动同步astro构建目录到服务器.ffs_batch"
```

![image-20250916154414223](https://t.zpea.cn/i/2025/image-20250916154414223.png)

最后把这个bat快捷启动菜单

![image-20250916154702569](https://t.zpea.cn/i/2025/image-20250916154702569.png)

这样开机就会自动运行raltimesync监控目录的变化，只要目录有变化就会自动同步，这个类似网盘一样。

## 总结

在服务端部署好web——把目录映射到本地——监视目录变化选择同步，其实astro可以直接把构建的dist目录更改到web映射目录，这样能减少后面的同步动作，但我尝试更改不生效，有高手可以指点一下，谢谢。