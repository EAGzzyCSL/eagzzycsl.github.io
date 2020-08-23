---
title: GNOME 使用经验
createdAt: 2016-11-07
updatedAt: 2016-11-07
tags: gnome, Linux
introduction: GNOME 是 Linux 世界中一套较为主流的图形界面，但依然有很多小问题需要 hack。这里记录了一些我个人使用 GNOME 中遇到的问题与解决方案。
---

# wayland 相关

GNOME3.22 后默认使用 wayland 作为显示协议，这带来了一些兼容性等的问题。

## fcitx 无法使用

fcitx 无法使用的原因在于 wayland 无法读取`~/.xprofile`中的环境变量，github 的 issue 中有对应的解决方案[解决方案](https://github.com/fcitx/fcitx/issues/230)，只需要设置全局的环境变量即可。

编辑`/etc/environment`，添加如下内容

```bash
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
```

## guake 快捷键 F12 无效

流行的拉幕式终端 guake 切换显示的默认快捷键是 F12，但是在 wayland 下 F12 有时有效有时无效。观察发现当前运行的是桌面，或 gedit，nautils 等 GNOME 的程序时，F12 会失效，而在 firefox 等程序下 F12 可以正常切换 guake。

猜测和 GNOME 程序是原生的使用 wayland 协议有关。最终解决该问题的方法为在 GNOME 快捷键设置里面添加执行`guake`自定义的快捷键`F12`，这样可以在各种程序下都可以使用 F12 切换 guake。

# 无法开启 WIFI 热点

GNOME 的网络设置是可以开启 WIFI 热点的，入口在`All Settings -> Network -> Wi-Fi ->Use as Hotspot`。但点击发现并没有响应，上网找到了对应的[解决方案](https://forum.antergos.com/topic/2258/solved-can-t-create-a-hotspot/)。

首先确保已安装`dnsmasq`和`modemanager`。

启动`ModemManager`服务。

```shell
$ sudo systemctl start ModemManager.service
```

如果不希望每次开热点前都手动开启该服务的话可以设置该服务开机启动。

# 龟速的 eog

eog（eye of Gnome）是 GNOME 自带的图片浏览器，界面简洁美观，和 GNOME 搭配很合适，只是速度敢恭维。可以使用`viewnior`替代。

# 修改默认的 Pictures、Recordings 目录位置

GNOME 会默认建立`Picture`、`Recordings`、`Public`、`Downloads`等系统文件夹，但诸如`Recordings`这样的目录几乎不会用到，有些没有必要，因此想把它们统一收入`Gnome`目录下。

这一类目录被称为`xdg_user_dir`，wiki 上有更详细的介绍[介绍](https://wiki.archlinux.org/index.php/XDG_user_directories)。

ask ubuntu 上提供了一种[解决方案](http://askubuntu.com/questions/18103/how-can-i-change-the-default-location-of-content-directories-eg-pictures-templ)。

编辑`~/.config/user-dirs.dirs`文件，修改其中类似`XDG_TEMPLATES_DIR="$HOME/Templates"`的条目。

比如修改为`XDG_TEMPLATES_DIR="$HOME/Gnome/Templates"`表示把 `Templates` 目录设置为`～/Gnome/Templates`。

# 关闭截图声音

GNOME 自带的截图工具截图完成后会有咔嚓一声，但并没有对应的设置项。Stack Exchange 上提供了一种[方法](http://unix.stackexchange.com/questions/93368/how-can-i-disable-the-shutter-sound-of-gnome-screenshot)。

```shell
$ cd /usr/share/sounds/freedesktop/stereo
$ sudo mv camera-shutter.oga damn-camera-shutter.oga
```

注销或重启之后即可生效。

# pdf 阅读器中文显示不正常

安装`poppler-data`即可。

```shell
# pacman -S poppler-data
```

# GNOME Software 后开机自动下载更新

GNOME Software 是 GNOME 的应用商店，目前有些鸡肋，但有一个使用的功能是能够在 app 列表中增加文件夹。它另一个功能是会自动下载软件的更新，但同样未提供图形化的关闭选项。

参考 Ask Ubuntu 提供的[方法](http://askubuntu.com/questions/773874/disable-gnome-softwares-notification-bubble-notify-osd-for-available-updates)可以关闭这一功能。

```shell
$ gsettings set org.gnome.software download-updates false
```

# 我使用的 Gnome 扩展

GNOME Extension 是由第三方开发的扩展程序，可以实现状态栏显示天气，CPU 温度等功能。

这里收集了我使用的 GNOME 扩展列表。

- ['Window Is Ready' Notification Remover](https://extensions.gnome.org/extension/1007/window-is-ready-notification-remover/)：功能恰如其名。

- [AppMenu Regular Icons](https://extensions.gnome.org/extension/970/appmenu-regular-icons/)：能够让程序在状态栏上显示的图标为图标包的图标。

- [Caffeine](https://extensions.gnome.org/extension/517/caffeine/)：阻止电脑进入休眠状态。

- [cpufreq](https://extensions.gnome.org/extension/1082/cpufreq/)：在状态栏查看和调节 cpu 的频率。

- [Favorites Menu](https://extensions.gnome.org/extension/115/favorites-menu/)：可以在状态栏上显示一个下拉菜单用于放置常用程序。

- [Freon](https://extensions.gnome.org/extension/841/freon/)：监测硬件的温度。

- [Input Method Panel](https://extensions.gnome.org/extension/261/kimpanel/)：替代 fcitx 候选词面板，使其和系统的主题一致。

- [Pixel Saver](https://extensions.gnome.org/extension/723/pixel-saver/)：当窗口最大化时隐藏窗口的标题栏。

- [Simple net speed](https://extensions.gnome.org/extension/1085/simple-net-speed/)：实时网速监测。

- [OpenWeather](https://extensions.gnome.org/extension/750/openweather/)：显示天气。

- [Optirun](https://extensions.gnome.org/extension/985/optirun/)：提供右键以`optirun`运行的选项，需要正确配置双显卡。

- [Recent(Item)s](https://extensions.gnome.org/extension/977/recent-items/)：在状态栏上下拉菜单中快速访问最近件。

- [Refresh Wifi Connections](https://extensions.gnome.org/extension/905/refresh-wifi-connections/)：刷新当前可用 WIFI 列表。

- [Removable Drive Menu](https://extensions.gnome.org/extension/7/removable-drive-menu/)：当弹出 USB 设备时提示 USB 设备已经卸载或正在忙请勿拔出。

- [Services Systemd](https://extensions.gnome.org/extension/1034/services-systemd/)：状态栏查看与控制 systemd services 状态。

- [Status Area Horizontal Spacing](https://extensions.gnome.org/extension/355/status-area-horizontal-spacing/)：调整扩状态栏上图标间的水平间距，在有多个扩展的情况下很实用。

- [System Monitor](https://extensions.gnome.org/extension/1064/system-monitor/)：在状态栏上显示当前 CPU 内存等使用情况。

- [TopIcons Plus](https://extensions.gnome.org/extension/1031/topicons/)：在状态栏显示 Skype，Telegram 等原本会在左下角显示的图标。

- [User Themes](https://extensions.gnome.org/extension/19/user-themes/)：从用户目录加载主题。

- [WindowOverlay Icons](https://extensions.gnome.org/extension/302/windowoverlay-icons/)：窗口预览时在窗口上显示程序的图标。

- [Workspace Indicator](https://extensions.gnome.org/extension/21/workspace-indicator/)：指示当前处于哪个虚拟桌面。

- [AlternateTab](https://extensions.gnome.org/extension/15/alternatetab/)：alt+tab 时按 window 区分窗口而非 按 application。

- [Appfolders Management extension](https://extensions.gnome.org/extension/1217/appfolders-manager/)：在 APP 列表中添加文件夹。

- [Dash to Panel](https://extensions.gnome.org/extension/1160/dash-to-panel/)：让 GNOME 的状态栏 像 windows 一样。

- [Dynamic Panel Transparency](https://extensions.gnome.org/extension/1011/dynamic-panel-transparency/)：透明化 GNOME 的状态栏。
