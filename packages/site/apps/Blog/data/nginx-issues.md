---
title: Nginx 问题小记
createdAt: 2020-07-19
updatedAt: 2020-07-19
tags: Nginx, Mac, Linux
introduction: 我在本地安装 Nginx 的主要目的是使用它的作为静态 web server，通过链接文件到 Nginx root 目录下，可以实现局域网内文件下载，静态页面测试等操作。但 Nginx 的用途不止于此，这里记录一些使用 Nginx 遇到的问题。
---

# Mac 安装 Nginx

## 使用 brew 安装与管理 Nginx

使用`brew install nginx`即可一键安装 Nginx。

Homebrew 同时提供了`brew services`命令，有些类似`systemctl`，可以方便管理 Nginx 这类需要作为服务运行的软件。

```shell
$ brew services start nginx # 注册并启动Nginx服务，相当于systemctl enable nginx && systemctl start nginx
$ brew services stop nginx  # 注销并停止Nginx服务，相当于systemctl disable nginx && systemctl stop nginx
$ brew services restart nginx # 重启Nginx服务，相当于systemctl restart nginx
```

## Nginx 配置

根据自身需要，对 Nginx 配置中`location`做如下修改。

```nginx
location / {
    # 配置局域网访问规则：
    # allow和deny的配置类似iptable，自上往下匹配，命中则结束
    # 这里的配置下localhost的访问会命中第一条而被允许访问，其他来源的访问会命中deny而被拒绝
    # 如果希望允许来自局域网下的访问，则可以关闭deny all规则
    allow       127.0.0.1;
    deny        all;
    # 使用自定义的root目录
    root        /Users/EAGzzyCSL/my/nginxHome/;
    index       index.html index.htm;
    # 开启autoindex，可以直接列出目录下的文件方便查看
    autoindex   on;
}
```

## Nginx 端口设置

一直以来，Nginx 在 Mac 下的默认端口为 `8080`，因为 Mac 限定了非 root 级权限不能使用 1024 ，而 brew 启动的 Nginx 是以 user 身份运行的。

但`http://localhost:8080`显然不如`http://localhost`方便与美观，好在 Mojave 10.14 之后这一限制被取消了，因此直接修改`listen`字段即可。

```nginx
server {
    listen  80;
}
```

关于限制被取消的说法我也是道听途说，只找到了下面两条有限的资料，但验证了使用 80 端口确实可行。

- [MacOS Mojave 10.14 no longer enforces privileged ports](https://news.ycombinator.com/item?id=18302380)
- [Mac OS 普通用户启动 80 端口(Mojave 10.14 原生支持)](http://shaofan.org/mac-bind-80-port/)

# 403 问题说明

Nginx 配置经常会遇到 403 问题，其中一种常见的情况是权限问题。

在 unix 下，cd 到某个目录需要对该目录拥有`x`权限。因此 Nginx 需要`rx`权限来探测和读取 Nginx root 目录下的内容，如果 Nginx 对配置的 root 目录及上层、上上层目录没有`rx`权限，就会出现 403 问题。

在不同操作系统中和不同配置下，Nginx 的主进程和 worker 进程会以不同身份运行，其中 root 目录内容的读取是由 worker 进程负责。

可以通过`ps aux | grep nginx`查看执行`nginx`和执行`sudo nginx`进程状态的不同。（PS：可以通过`nginx -s reload`和`nginx -s stop`重启或结束 Nginx）

当 Nginx 主进程以 root 身份运行时，worker 进程会按照`nginx.config`中配置的`user`身份运行。

当 Nginx 主进程以非 root 身份运行时，worker 进程会忽略`nginx.config`中配置的`user`身份。这时 Nginx 会输出如下的 warning。

> the "user" directive makes sense only if the master process runs with super-user privileges, ignored in /usr/local/etc/nginx/nginx.conf

在 Mac 下，`brew services start nginx`默认以当前用户身份运行 Nginx， worker 进程可以正常读取`~`目录下的文件夹，因此如果配置 Nginx root 为`~`下目录则不会因此遇到 403 问题。

## Linux 下 403

在 Linux 下，`nginx.config`中`user`字段默认为`html`，也就意味着如果以 root 身份启动 Nginx，worker 进程将以 html 身份运行，此时如果以`~`目录下的文件夹作为 Nginx root，则会因为`~`文件夹权限是`rwx------`而无法被用户`html`访问导致 403。

根据前面对 403 的原因分析，可以有以下几种解决方案。

- 为 `html` 用户添加`~`目录的`rx`权限。这种做法需要对`~`目录进行权限修改不太推荐。

- 使用非 root 身份运行 Nginx 主进程。`systemctl enable nginx`默认使用 root 身份，使用非 root 身份单独配置即可。

- 使用`/var`下的目录作为 Nginx root。`/var`的权限是`rwxr-xr-x`因此可以被用户 `html` 正常访问，可以通过软连接方式把`~`下目录连接到`/var`目录下。

- 使用非 root 身份运行 Nginx worker 进程。注意`user`字段的格式为`user user [group];`，如果省略 group 则默认 group 与 user 同名，因此需要写明 group，比如我使用的配置为`user eagzzycsl users;`。
