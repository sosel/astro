---
title: "更改ubuntu默认用户ubuntu为root，且仅使用密钥登录"
categories: system
tags: ["ubuntu"]
id: "Log in as root user"
date: 2025-09-15 18:18:19
cover: ""
recommend: false
top: false
---

:::note

腾讯服务器的ubuntu默认用户是ubuntu，平时使用密钥直接登录，并在putty上添加个`sudo -i`,也能一键登录到切换到root用户的，也是这样使用一段时间，最近想在玩astro，想把网站目录映射到本地，然后直接构建保存到目录，省去同步过程，映射需要用到root权限，折腾实现了，记录一下
:::

## 目的

使用密钥登录直接是root用户，不需要sudo提权，通过修改SSH配置文件来禁用root用户的密码登录，只保留密钥认证，**防暴力破解**SSH。

## 操作步骤

使用root账户进行密钥登录，你需要先为root用户设置密码，将你的公钥添加到root用户的`authorized_keys`文件中，然后修改SSH服务器配置文件（`sshd_config`）允许root通过密钥登录，最后重启SSH服务

详细步骤：

1. **登录你的Ubuntu系统**：

   使用当前的普通用户`ubuntu`登录到Ubuntu服务器。

   

2. **设置root用户的密码**：

   - 在终端中执行命令：`sudo passwd root`。

     

   - 按照提示输入你当前用户的密码，然后设置并确认root用户的密码。

     

3. **获取root权限并拷贝密钥**：

   - 切换到root用户，执行命令：`su root`，然后输入你刚才设置的root密码。

     

   - 如果root用户不存在`.ssh`文件夹，需要先创建：`mkdir /root/.ssh && chmod 700 /root/.ssh`。

     

   - 拷贝你现有的公钥文件到root用户的`authorized_keys`文件中。假设你当前的普通用户是`ubuntu`，公钥在`/home/ubuntu/.ssh/authorized_keys`，则执行命令：`cat /home/ubuntu/.ssh/authorized_keys > /root/.ssh/authorized_keys`。﻿

这样就完成了root密码设置和原来ubuntu的密钥复用给root用户，这样就不需要重新生成密钥和配置客户端了

4. **禁用Root用户密码登录：**

    如果之前没修改过，这步可省略，反之，如果想启用Root用户密码登录，保留2的样子

   1. 打开SSH配置文件：

      ```
      sudo nano /etc/ssh/sshd_config
      ```

   2. 找到以下两行（如果没有，可以添加）：

      ```
      PermitRootLogin yes
      PasswordAuthentication yes
      ```

      然后修改它们为：

      ```
      PermitRootLogin prohibit-password
      PasswordAuthentication no
      ```

      解释：

      - `PermitRootLogin prohibit-password`：这将允许root用户通过密钥登录，但禁用密码登录。
      - `PasswordAuthentication no`：完全禁用密码登录，确保没有通过密码的方式访问系统。

   3. 保存并退出编辑器（`Ctrl + O` 然后 `Ctrl + X`）。

   4. 重启SSH服务以应用更改：

      ```
      sudo systemctl restart ssh
      ```

   这样设置后，root用户只能通过密钥认证登录，无法通过密码登录。

   ![image-20250915163717443](https://t.zpea.cn/i/2025/image-20250915163717443.png)

   测试就算使用正确的root密码也没办法登录了，这样就不怕暴力破解了。

## 总结

这样即能保留使用密钥登录SSH，又能直接使用root权限，即解决了winscp登录权限不够，也解决了RaiDrive直接映射本地磁盘权限不足问题，同时还保留了密钥管理服务器的安全性。下篇文章写如何同步astro构建的dist目录到服务器。只要本地npm run build就行了，后面全自动化处理。第二次更新