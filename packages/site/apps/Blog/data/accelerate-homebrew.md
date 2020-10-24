---
title: Homebrew 加速
createdAt: 2020-03-15
updatedAt: 2020-03-15
tags: Mac
introduction: 关于如何在网速有限的情况下安装 Homebrew 以及如何为 Homebrew 更新加速。
---

# 关于 Homebrew

[Homebrew](https://brew.sh/)是 mac 下流行的软件包管理工具，但由于 Homebrew 高度依赖 github，因此使用或安装 Homebrew 时都会受限于飘忽不定的网速，对此常见的办法是使用镜像或者代理。

镜像是一种低成本的解决方案，清华、中科大等镜像站都提供了 Homebrew 的镜像，这里使用[清华开源镜像站](https://mirrors.tuna.tsinghua.edu.cn/)。

代理相比镜像是一种更通用的方式，但最终的下载速度也很大程度取决于代理本身，在这一点上镜像往往会胜出。使用代理可以通过命令行下配置`http_proxy`和`https_proxy`等方式，这里不过多展开。

在 Homebrew 的实现中，`cask`、`core`等官方仓库或者其他第三方仓库（所有的仓库都称为 Taps），本质都是一个存放在 Homebrew 安装目录（默认为`/usr/local/Homebrew`）下的普通 git repo，其中存储了用于安装软件包的 DSL 脚本（称之为 formula）。因此 Homebrew 的安装环节中除去链接可执行文件等操作，本质则是`git clone`，而更新 Homebrew 仓库也就是在执行`git fetch`。

在通过`brew install`安装软件包时，Homebrew 在获取到 formula 后还需要下载软件包本身。对于一些软件包，Homebrew 提供了二进制预编译包（称为 bottles），这一部分也可以通过镜像站获取。但对于更多软件包，其下载地址由软件包自身提供，因此仍然有可能遇到网络问题，这时镜像是无能为力的。

# 使用镜像安装 Homebrew

这一节适用于在没有代理的情况下安装 Homebrew，如果已经安装了 Homebrew 则可以直接跳转下一节`为已安装的 Homebrew 配置镜像`。

## 获取并编辑安装脚本

通常安装 Homebrew 的方式是访问 Homebrew 官网[brew.sh](https://brew.sh/)，复制其提供的安装命令后即可一键安装。

如果访问 Homebrew 官网受限，则可以直接复制下面的 bash 命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

在更早一些时候安装脚本是通过下面的 ruby 命令提供的：

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

这两条命令没有本质差别，本质都是访问[`https://github.com/Homebrew/install`](https://github.com/Homebrew/install)仓库获取并执行仓库下`install.sh`或`install`文件。

`install.sh`中配置了 Homebrew 软件自身的 git 地址，为了能够在安装时使用镜像，需要修改`install.sh`后再使用。

因此先通过`curl https://raw.githubusercontent.com/Homebrew/install/master/install.sh > install.sh`的方式下载`install.sh`到本地，或直接使用浏览器访问`https://raw.githubusercontent.com/Homebrew/install/master/install.sh`并右键“另存为”。如果网络不畅也可以通过网盘、下载工具等其他途径获取`install.sh`，但需要注意渠道自身是否可信。

参考清华镜像源的[使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)，对`install.sh`做出如下修改。

```diff
- BREW_REPO="https://github.com/Homebrew/brew"
+ BREW_REPO="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
```

保存修改后执行`/bin/bash install.sh`开始 Homebrew 安装。

## 手动 clone

如果一切顺利的话，安装会停留在如下的 clone core 仓库阶段：

> ==> Tapping homebrew/core
>
> Cloning into '/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core'...

这时 Homebrew 已经完成了二进制文件的安装与链接，进入了最后的 clone homebrew-core.git 阶段，这一步需要手动中断并使用镜像替代。

利用`ctrl+c`中断 `install.sh` 执行后，cd 到`/usr/local/Homebrew/Library/Taps/homebrew`下。

按照[镜像源](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)提供的地址，根据需要手动 clone 以下 repo，一般`homebrew-core`和`homebrew-cask`是经常用到的。

```bash
git clone https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
git clone https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git
git clone https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask-fonts.git
git clone https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask-drivers.git
```

clone 结束后 Homebrew 的安装就算完成了。但为了实现对 bottles 的加速，还需要为 bottles 配置镜像，这一操作可以参见后文。

PS：替换镜像源后执行`brew doctor`会有如下提示，原因是 Homebrew 检测到当前的 origin 不是标准 origin，这是正常的，忽略即可。

<!--markdownlint-disable no-bare-urls-->

> Please note that these warnings are just used to help the Homebrew maintainers with debugging if you file an issue. If everything you use Homebrew for is working fine: please don't worry or file an issue; just ignore this. Thanks!
>
> Warning: Suspicious https://github.com/Homebrew/brew git origin remote found. The current git origin is: https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
>
> With a non-standard origin, Homebrew won't update properly. You can solve this by setting the origin remote: git -C "/usr/local/Homebrew" remote set-url origin https://github.com/Homebrew/brew
>
> Warning: Suspicious https://github.com/Homebrew/homebrew-core git origin remote found. The current git origin is: https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
>
> With a non-standard origin, Homebrew won't update properly. You can solve this by setting the origin remote: git -C "/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core" remote set-url origin https://github.com/Homebrew/homebrew-core

<!--markdownlint-enable no-bare-urls-->

# 为已安装的 Homebrew 配置镜像

这一节适用于已安装了 Homebrew 的情况。

## 配置 formula 镜像

配置 formula 镜像的本质是修改 git 仓库的 origin，如果安装阶段已经使用了镜像则无需再进行这一步，否则按照[镜像站说明](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)操作即可，同时镜像站也提供了恢复默认镜像的操作。

## 配置 bottles 镜像

直接按照[镜像站说明](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew-bottles/)操作即可。

需要注意的是，如果下载 bottles 失败，Homebrew 默认会通过下载源代码并本地编译的方式完成安装，但通常本地编译往往非常耗时且占用大量 cpu 资源。如果希望关闭这一默认行为，可以通过设置环境变量`HOMEBREW_NO_BOTTLE_SOURCE_FALLBACK`实现，如`export HOMEBREW_NO_BOTTLE_SOURCE_FALLBACK=1`，详细可参考 Homebrew 的[Manpage](https://docs.brew.sh/Manpage#environment)。
