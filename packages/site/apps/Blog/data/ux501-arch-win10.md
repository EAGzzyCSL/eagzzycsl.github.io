---
title: ux501 之 Arch 与 Win10 双系统安装记
createdAt: 2016-12-20
updatedAt: 2021-01-30
tags: OS, Linux, Windows, Arch
introduction: 笔记本是华硕的ux501，自带 Win10 系统，自己又装了 Arch 作双系统。这里记录了安装时的操作以供将来快速查看。
---

# 安装前准备

## 分区计划

- esp 分区：UEFI 启动模式支持多个 esp 分区，所以为 Windows 和 Linux 各建立一个 esp 分区，这样两个系统各自的变动互不影响

- Linux 分区：之前曾经为`home`、`var`、`swap` 建立过单独的分区，但发现并没有什么特殊的必要，所以这次选择了只建立`/`分区。不过 btrfs 文件系统目前尚未支持 swap，所以如果使用 btrfs 依然需要创建单独的 `swap` 分区，但如果使用 ext4 则没有这个问题。

- Windows 分区：创建`C://`、`D://`两个分区即可。C 盘用于系统和软件安装，D 盘用于数据存放，同时 D 盘可以挂载到 Linux 下方便访问。

最终分区方案如下表，分区表显然是 GPT 了。

| 分区大小 | 分区用途 | 备注 |
| --- | --- | --- |
| 512MiB | esp for Linux | 512M 对于 esp 分区来说足够大了，取 512M 主要是为了凑整。 |
| 512MiB | esp for Windows |  |
| 320GiB | `/` for Linux |  |
| 16GiB | swap for Linux | 为 btrfs 单独划分的 swap 分区。 |
| 80GiB | `C://` for Windows |  |
| 60GiB | `D://` for Windows |  |

## 安装流程

- 首先是数据的备份，有备无患。

- 下载 Arch Linux 的镜像，并制作启动镜像。制作启动镜像可以使用[Rufus](https://rufus.akeo.ie/?locale=zh_CN/)，更多可以参考[wiki](https://wiki.archLinux.org/index.php/USB_flash_installation_media)。

- 下载 Win10 的镜像，可以通过[msdn.itellyou.cn](http://msdn.itellyou.cn/)获得。

- 进入 PE（我使用的是[微 PE](http://www.wepe.com.cn/)），完成分区工作。

- 在 PE 下使用 Windows 安装器（使用安装器可以自由指定 esp 分区）完成 Windows 的安装，先安装 Windows 主要是为了安装后使[Windows 使用 utc 时间](https://wiki.archLinux.org/index.php/Time#UTC_in_Windows)。

- 使用 Arch 启动镜像完成 Arch 安装。

# 安装 Windows

Windows 的安装相对比较简单，轻车熟路静待小娜念诗即可。

## ESP 盘符分配

本来以为安装 Windows 会非常顺利，过结果刚上手就遇上了麻烦事情：在 PE 下没法给 ESP 分区分配盘符，所以安装器也无法选中 ESP 分区。不过这倒也启发了我，可以使用 ESP 分区藏匿一些隐私文件。

上网查询之后发现可以通过下面操作为 ESP 分区分配盘符（需要管理员权限）

```dos
:: 启动diskpart
diskpart
:: 选择磁盘0（如果有多个磁盘的话选实际要操作的磁盘编号）
sel disk 0
:: 列出分区
list part
:: 选中编号为x的分区
sel part x
:: 为x分区分配盘符y
assign letter=y
```

之后安装器一路操作就好了。

## 安装驱动

Win10 自带的系统更新已经可以完成绝大多数驱动的安装，所以安装驱动也方便了很多。

# 安装 Arch

Arch 的安装相比之下要麻烦很多，步骤多，需要手动操作的内容也多，之后的配置也麻烦。所以这里记录了我安装时的实际操作步骤，通用步骤还是需要参考 wiki 上的[安装指南](https://wiki.archLinux.org/index.php/Installation_guide)。

## 执行安装

通过之前制作的 Arch 启动镜像启动电脑，开始执行安装。

### 用一个大一点的字体

ux501 的屏幕是一块 4K 的高分屏，进入启动镜像后，Linux 终端下的默认字体非常小，阅读起来极其不方便，所以首先需要调整一下终端字体大小。

首先安装 `terminus-font`，当然也可以选择其他[点阵字体](https://wiki.archlinux.org/index.php/fonts#Bitmap)。

执行`setfont ter-v32b`以使用一个较大的字体。

执行`ls /usr/share/kbd/consolefonts/` 可以看到所有可用的字体，包括刚刚使用的`ter-v32b`。

可以对这些字体随意试错，如果使用了不合适的字体，执行不带参数的`setfont`便可以将字体设置为默认值。

更多可以参考 wiki 中的[说明](https://wiki.archlinux.org/index.php/Linux_console)。

选中合适的字体后编辑`/etc/vconsole.conf`就可以永久设置终端字体，当然对于启动镜像来说这样是无效的。

```properties
FONT=ter-v32b
```

### 检查是否为 UEFI 模式

```shell
# ls /sys/firmware/efi/efivars
```

### 检查联网是否正常

```shell
# ping -c 3 archLinux.org
```

### 确认系统时间正确

```shell
# timedatectl set-ntp true
```

### 查看分区情况并格式化分区

```shell
# fdisk -l
# mkfs.btrfs /dev/sdaX
```

### 挂载目录

```shell
# 挂载根目录
# mount /dev/sda1 /mnt
# 创建 boot 文件夹
# mkdir /mnt/boot
# 挂载 Linux ESP 分区
# mount /dev/sda2 /mnt/boot
# 创建交换分区
# mkswap /dev/sda2
# 启用交换分区
# swapon /dev/sda2
```

### 镜像源选择

编辑`/etc/pacman.d/mirrorlist`，选择中国区的镜像可以获得速度的提升。

### 安装

```shell
# pacstrap /mnt base linux linux-firmware base-devel btrfs-progs
```

其中`base-devel` 是日后使用 `aur` 的必须，`btrfs-progs` 是使用 btrfs 的必须。

### 生成 fstab

```shell
# genfstab -U /mnt >> /mnt/etc/fstab
```

### chroot

```shell
# arch-chroot /mnt /bin/bash
```

### 设置时间

设置时区为东 8 区

```shell
# ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

使用 UTC 时间

```shell
# hwclock --systohc --utc
```

### 本地化

编辑`/etc/locale.gen`

取消注释下面两行。

```properties
en_US.UTF-8 UTF-8
zh_CN.UTF-8 UTF-8
```

执行 `locale-gen` 以生成 locale。

创建`locale.conf`。

```shell
echo LANG=en_US.UTF-8 > /etc/locale.conf
```

### 设置主机名

```shell
# echo YOUR-HOST-NAME > /etc/hostname
```

编辑`hosts`添加如下内容。

```properties
127.0.0.1       localhost
::1             localhost
127.0.1.1       YOUR-HOST-NAME.localdomain        YOUR-HOST-NAME
```

### 网络配置

执行`pacman -S networkmanager`安装 `networkmanager`

启动服务：`systemctl enable NetworkManager`

这样退出 镜像环境后启动电脑依然可以联网。方便后面的配置操作。

### 设置 root 密码

```shell
# passwd
```

### 安装引导程序

intel 的 cpu，需要安装 intel 的 `intel-ucode`。

```shell
# pacman -S intel-ucode
```

我使用[grub](https://wiki.archLinux.org/index.php/GRUB)做引导，可以安装各种主题，配置也简单，还可以添加 Windows 的启动项。

安装 grub

```shell
# pacman -S grub efibootmgr os-prober
```

grub 是引导程序，efibootmgr 是创建 GRUB 安装脚本使用的.efi 启动项，os-prober 用于发现电脑上的其他系统。

使用安装引导程序

```shell
# grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=grub
```

生成 grub 配置文件

```shell
# grub-mkconfig -o /boot/grub/grub.cfg
```

安装来自 aur 的`grub-customizer`可以提供 grub 的图形化配置界面。

### 重启退出 u 盘环境

退出`chroot`并卸载`/`分区的挂载。

```shell
# exit
# umount -R /mnt
```

执行`reboot`重启电脑后进入配置环节。

## 配置

配置主要参考 wiki 中的[推荐](https://wiki.archLinux.org/index.php/General_recommendations)。

### 创建用户

```shell
# useradd -m -g users -G wheel -s path-of-zsh eagzzycsl
```

如果使用了 `zsh` 作为默认 shell 的话，需要先安装 `zsh`，否则会导致登录失败。

为创建的用户设置密码

```shell
# passwd eagzzycsl
```

### 开启 multilib

在`/etc/pacman.conf`中取消注释`[multilib]`的相关行。

### 图形界面

> 图形界面我还是要要的。

安装 intel 的显卡驱动

```shell
# pacman -S xf86-video-intel
```

nvidia 的驱动在系统配置好后再安装。

安装 xorg

```shell
# pacman -S xorg-server
```

安装 GNOME

```shell
# pacman -S gnome
```

gdm 会随 GNOME 附带安装。

不推荐现在就默认启动 gdm，以避免 gdm 启动遇到问题带来麻烦。可以在验证 gdm 启动正常后再执行`systemctl enable gdm`。

### 字体

字体这一块不太熟悉，所以选择先安装必要的字体，使页面上中文能够正常显示，后面可以再详细配置。

```shell
# pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji adobe-source-han-sans-cn-fonts
```

mac os 上的`monaco`用于编程很不错，可以在 aur 下获得。

```shell
$ yaourt -S ttf-monaco
```

### 基本软件安装

执行`systemct start gdm`验证 gdm 启动成功后可以执行`systemct enable gdm`使 gdm 随系统启动。

在有了图形界面后，在浏览器中查看 wiki 等就可以方便复制粘贴。

安装 firefox 浏览器。

```shell
# pacman -S firefox
```

安装 network-manager-applet 用以管理网络。

```shell
# pacman -S network-manager-applet
```

安装 guake 作为拉幕式终端。

```shell
# pacman -S guake
```

安装 GNOME 的微调工具 gnome-tweak-tool。

```shell
# pacman -S gnome-tweak-tool
```

### 输入法

如果暂时没有中文输入的需求的话，可以之后再安装输入法。

参考[wiki](<https://wiki.archLinux.org/index.php/Fcitx_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>)安装 fcitx。

```shell
# pacman -S fcitx
```

安装 sunpinyin 和 cloudpinyin。

```shell
# pacman -S fcitx-sunpinyin fcitx-cloudpinyin
```

安装图形化的配置工具。

```shell
# pacman -S fcitx-configtool
```

安装针对 GTK 和 QT 的输入法模块。

```shell
# pacman -S fcitx-im
```

编辑`~/.xprofile`配置环境变量。

```bash
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
```

安装 GNOME 的扩展 `gnome-shell-extension-kimpanel` 可以使候选词界面与 GNOME shell 风格统一。

更多诸如繁简切换、候选词个数等可以在 fcitx 的图形化设置中完成。

### 安装 sudo

yaourt 的使用依赖 sudo

安装 sudo

```shell
# pacman -S sudo
```

编辑`sudo`的配置文件`/etc/sudoers`，添加`eagzzycsl ALL=(ALL) ALL`

### 添加 archlinuxcn 源并安装 yaourt

archlinuxcn 是由非官方维护的镜像源，但提供了很多实用的软件，尤其针对中国地区。

编辑`/etc/pacman.conf`加入 archlinuxcn。

```ini
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
Server = https://repo.archlinuxcn.org/$arch
```

更多镜像可以[这里](https://github.com/archlinuxcn/mirrorlist-repo)找到。

安装`archlinuxcn-keyring`。安装时遇到了一个问题，在[bbs](https://bbs.archlinuxcn.org/viewtopic.php?id=4129)中看到了[解决方案](https://www.archlinuxcn.org/gnupg-2-1-and-the-pacman-keyring/)。

安装`yaourt`，之后就可以方便获取来自 aur 的包了。

### 固态

[wiki](https://wiki.archLinux.org/index.php/Solid_State_Drives)中提供了详细的针对固态的资料，这里的配置只适合我的电脑。

添加`discard`参数以支持 TRIM，**需要注意的是如果 SSD 不支持 TRIM 则使用 discard 参数挂载会导致数据丢失。**

也可以通过启用`fstrim.timer`来按周执行 trim。

### 双显卡配置

虽然平时集显也够用了，但是既然有独显也不能浪费。

[wiki](https://wiki.archLinux.org/index.php/Bumblebee)提供了对于 nvidia 双显卡的配置的说明。

我选择了安装 nvidia 驱动配合 bumblebee 实现双显卡交火，bumblebee 提供`optirun`命令来使用独显运行程序。

根据显卡型号选择驱动程序后安装相应包。

```shell
# pacman -S bumblebee mesa xf86-video-intel lib32-virtualgl lib32-nvidia-utils
```

添加用户到 bumblebee 用户组。

```shell
# gpasswd -a $USER bumblebee
```

设置 bumblebeed 开机启动。

```shell
# systemctl enable bumblebeed.service
```

重启电脑进入配置环节。

安装`mesa-demos`，执行`optirun glxgears -info`。如果看到转动的齿轮窗口就说明配置正常。

在启动 bumblebee 的服务后，独立显卡会一直开启，增加电脑功耗和发热，所以需要配合 bbswitch 来控制独显的开关。

安装`bbswitch`。

```shell
# pacman -S bbswitch
```

通过`cat /proc/acpi/bbswitch`可以查看显卡开关状态，更多操作见 bbswitch 的[文档](https://github.com/Bumblebee-Project/bbswitch)

### 挂载相关

支持 ntfs 和 exfat 格式分区挂载。

```shell
# pacman -S ntfs-3g exfat-utils
```

支持手机 mtp。

```shell
# pacman -S mtpfs libmtp
```

### 蓝牙

参考[wiki](https://wiki.archLinux.org/index.php/Bluetooth)关于蓝牙的说明。

安装 bluez。

```shell
# pacman -S bluez
```

启用 bluetooth.service。

```shell
# systectl enalbe bluetooth.service
```

### 更多 GNOME 配置

gnome 的更多配置见[《GNOME 使用经验》](../gnome-experience/)。

## ux501 高分辨率问题

前面已经提到，机器的 4K 屏会在一些时候带来麻烦，可以参考[wiki](https://wiki.archLinux.org/index.php/HiDPI)中关于高分辨率的说明，还有一篇关于 ux501 的[文章](https://wiki.archLinux.org/index.php/ASUS_Zenbook_Pro_UX501)可以参考。

### 虚拟终端下字体过下

这个问题在之前的安装环节已经遇到，按照之前的说明操作即可。同时推荐将更多的配置操作在 guake 等图形化终端模拟器中完成。

### 网易音乐界面问题

网易云音乐有提供 Linux 版本，但安装后发现界面小的可怜，在网上找到了如下解决办法。

```shell
$ env QT_AUTO_SCREEN_SCALE_FACTOR=0 netease-cloud-music --force-device-scale-factor=2
```

如此启动的网易云音乐界面会放大为之前的 2 倍。

在 GNOME 下可以通过 menu 编辑器（在 app 列表里标签叫`main menu`，需要安装`alacarte`）编辑网易云音乐的属性，这样在 app 列表中点击网易云音乐依然可以启动放大版本。

### gimp 界面问题

> 反正就是高分辨率下的问题，我也说不清具体是哪儿了。

有一个 gimp 的[主题](https://github.com/jedireza/gimp-hidpi)可以解决 gimp 的高分辨率问题。

## 美化

Linux 有跟多的可定制性，可以通过安装主题包图标包等方式对界面进行美化

### 图标包

[paper](https://snwh.org/paper)是一套 material design 的图标包，同时还提供了光标主题和界面主题。

### 主题

[vimix](https://github.com/vinceliuice/vimix-gtk-themes)是一套 material design 的主题。

# 双系统共存

## grub 配置

grub 在安装`os-prober`后生成配置文件时可以自动添加其他操作系统的启动项，默认的启动项为 Arch。因此经常会有 Windows 下重启后进入 Linux 的情况，设置 grub 每次启动时使用上一次启动项即可解决这一问题。设置方法在[这里](http://askubuntu.com/questions/148662/how-to-get-grub2-to-remember-last-choice)。

编辑`/etc/default/grub`中如下内容。

```properties
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT=true
```

保存配置后重新生成`grub.cfg`即可。

## Linux 下自动挂载 Windows 分区

我在 Windows 下全部数据都存放在 D 盘，因此在 Linux 下自动挂载 D 盘可以带来很多方便。

编辑`/etc/fstab`，添加如下行。

```properties
# /dev/sda6
UUID=00029F68000CFF9F   /mnt/win_D    ntfs-3g     uid=eagzzycsl,gid=users     0     0
```

其中 UUID 要根据实际情况来不能照搬。`gid=users`表示以用户权限挂载，参考[ntfs-3g 的相关说明](https://wiki.archLinux.org/index.php/NTFS-3G#Allowing_group.2Fuser)

有时候会出现开机时挂载 D 盘失败的问题，wiki 上有关于此问题的[说明](https://wiki.archLinux.org/index.php/NTFS-3G#Metadata_kept_in_Windows_cache.2C_refused_to_mount)，是因为 Windows 在 Win8 后的快速启动机制会在关机时把一些已挂载的分区的元数据保存到硬盘，但如果该分区下次是被 Linux 挂载了那么分区就处于不安全的状态，数据无法得到保障。

对应的解决方法是关闭 Windows 的快速启动即可。

## 文件乱码问题

Windows 下 记事本 创建的文本文件编码都是 gbk2312，在 Linux 会导致乱码，最佳的方法是将它转换为通用的 UTF-8 编码。

可以使用 nautilus 的 script 功能实现右键菜单中`转化为 UTF-8 编码`。

在`~/.local/share/nautilus/scripts`目录下创建一个脚本文件`GBK->UTF-8.sh`。

```bash
#!/bin/bash
iconv -f 'GB2312' -t 'UTF-8' $1 -o ./utf8_$1
rm $1
mv utf8_$1 $1
```

## zip 解压后文件名的乱码问题

这一问题的根源还是在于 zip 自身未保存文件名编码信息。

参考的知乎上的[讨论](https://www.zhihu.com/question/20523036)，最终采用了 Fwolf 提供的[答案](http://zhihu.com/question/20523036/answer/31746415)

安装`unzip-iconv`后使用`unzip -O cp936 xxx.zip`或`unzip -O gbk xxx.zip`执行解压操作即可。

# 桌面截图

最后附上各项配置完成的 Linux 桌面截图一张。

![Linux桌面截图](ux501-screenshot.jpg)
