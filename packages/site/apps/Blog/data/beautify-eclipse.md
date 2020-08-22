---
title: eclipse界面美化
createdAt: 2015-09-24
updatedAt: 2015-09-24
tags: eclipse
introduction: 在我第一次见到 eclipse 前，我所唯一使用过的 IDE 是 vb6.0。相比之下，eclipse 显然要高大上很多。由于学习c语言的需要，eclipse被在很长时间被我用作c语言的集成开发环境。熟悉起来后发现它ui也有些过于古老，比如暗色背景下可以发现图标周围有白色像素，应该是抠图时没有处理好细节。因此折腾了一番对eclipse的界面修改，最终效果差强人意，过程记录在此。
---

# 环境与版本

作为双系统用户，我在 Arch Linux 和 Windows 下都尝试了对 eclipse 进行美化，系统与 eclipse 版本见下。

- Windows 版本：win7
- Arch Linux 版本：4.1.6-1
- eclipse 版本：Mars
- java 版本：java8

# Windows

相比 Linux，eclipse 在 Windows 下的界面其实还算协调，但也架不住想折腾的心。

[eclipse marketplace](https://marketplace.eclipse.org)上提供了一些美化插件。在网上搜索“eclipse 美化”结果最多的是[eclipsecolorthemes](https://marketplace.eclipse.org/content/eclipse-color-theme)，但它只提供了代码配色方案而不能对整个界面进行修改。eclipse 自带的配色方案我是满意的所以并未使用这一插件。

[moonrise](http://marketplace.eclipse.org/content/eclipse-moonrise-ui-theme)是一个暗色的主题，开发于 Juno 时期，已经很久没有更新了。在 Mars 下尝试后，发现它并不能将界面完全 dark 化，会出现整体是黑色但小部分区域依然是白色的违和感，所以这一方案也放弃了。

最终使用的是一个名为[jeeeyuls-eclipse-themes](http://marketplace.eclipse.org/content/jeeeyuls-eclipse-themes)的插件，虽然 marketplace 上的安装量不及 eclipsecolorthemes，实测效果令人满意。

## jeeeyuls-eclipse-themes

在 marketplace 上找到[jeeeyuls-eclipse-themes](http://marketplace.eclipse.org/content/jeeeyuls-eclipse-themes)，拖拽那个`install`到 eclipse 界面的空白处即可完成插件安装。

安装完成后可以在点击`Window > Preferences > General > Appearance > Jeeeyul's Themes`进入设置，即可对界面进行颜色等调参。

它的[Theme Store](http://themes.jeeeyul.net/)中提供的一些预设的主题，嫌麻烦的话可以直接使用预设主题，建议选择浅色背景主题，可以避免图标边缘出现白色锯齿。

下载完成后进入`Window > Preferences > General > Appearance > Jeeeyul's Themes > Presets`导入预设主题，而后点击 Apply 即可以应用该配置。

# Arch Linux

Linux 下 eclipse 的界面要惨不忍睹很多，古老的灰色界面和图标一度让人以为回到了上个世纪。

根据 Arch wiki 上关于[eclipse](<https://wiki.archlinux.org/index.php/Eclipse_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>)的说明，eclipse 不完全遵循 gtk 的主题，所以按照 wiki 说法删掉 eclipse 安装目录下 css 文件夹即可使其遵循 gtk 设定。

```shell
# 以eclipse实际安装目录为准
$ cd /usr/lib/eclipse/plugins/org.eclipse.ui.themes_1.1.0.v20150511-0913/
# 为了稳妥起见选择mv而非删除
$ sudo mv css css_backup
```

重启 eclipse 之后就会发现 eclipse 和 gtk 的主题一致，整体界面协调很多。

这时就可以使用 jeeeyuls-eclipse-themes 插件继续对界面做进一步修改。

最后放一张效果图。

![linux下eclipse美化最终效果](eclipse_beautified.png)
