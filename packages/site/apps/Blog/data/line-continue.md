---
title: 代码续行
createdAt: 2020-07-05
updatedAt: 2020-07-05
tags: code
introduction: 写代码中偶尔会遇上单行过长的情况，在一些编程语言中提供了一种名为“续行”的功能以应对这一问题。
---

# 为什么会有续行

在文字处理软件中，如果某一行内容过长，编辑器往往会对该行折行展示，表现形式为一个行号对应多行内容。但由于实际文本中并未插入换行符号（`\n`，此处忽略`\n`、`\r\n`、`\r`三者区别），所以这种方式也被称为[软回车](https://baike.baidu.com/item/%E8%BD%AF%E5%9B%9E%E8%BD%A6/1016989)，区别于通过插入换行符产生多个行号的硬回车。

对于普通文本，编辑器自动软回车是考虑到通常阅读习惯，为了避免出现横向滚动条。但对于代码编辑，软回车反而会破坏通常的代码阅读习惯，尤其在未启用行号的情况下。所以在 vscode 等代码编辑器中，同样是一行过长的文本，markdown 等文本文件中会触发软回车而 js 等代码文件中不会触发软回车。

在实际开发中，通常会通过代码风格规范约定单行代码长度在 80-120 个字符左右，避免了因为单行代码过长导致横向滚动，当然缩进过深是另外一回事情。

通常单行代码过长也往往可以通过合理的格式化来解决。

```js
// prettier-ignore
// bad
window.onload = function () { document.getElementById('button-alert').onclick = function () { alert('Lake Char­gogg­a­gogg­man­chaugg­a­gogg­chau­bun­a­gung­a­maugg is a lake in the town of Webster, Massachusetts.') } }
// good
window.onload = function () {
  document.getElementById('button-alert').onclick = function () {
    alert(
      'Lake Char­gogg­a­gogg­man­chaugg­a­gogg­chau­bun­a­gung­a­maugg is a lake in the town of Webster, Massachusetts.',
    )
  }
}
```

上面的例子中，通过换行，原本压缩在一行的代码被拆分为 5 行更加方便阅读，但 alert 中的字符串由于含有`Char­gogg­a­gogg­man­chaugg­a­gogg­chau­bun­a­gung­a­maugg`导致内容过长依然容易造成阅读不便，但这种情况换行是无能为力的，如果强行在引号内换行会出现语法错误。

PS：[Char­gogg­a­gogg­man­chaugg­a­gogg­chau­bun­a­gung­a­maugg](https://en.wikipedia.org/wiki/Lake_Chaubunagungamaug) 是美国马萨诸塞州一个湖的名称，它也是美国最长的地名，一共有 45 个字母，更多最长地名可以参考阮一峰博客[《美国最长的地名，以及其他》](http://www.ruanyifeng.com/blog/2009/04/the_longest_place_name_in_the_us.html)。

对于 Java、JavaScript 等以分号作为语句结束或解释器自动插入分号的语言，甚至可以对单条语句换行，比如常见的链式调用。

```java
DialogBuilder
  .setTitle("title")
  .setContent("content")
  .show();
```

但对于 Bash 等语言，命令无需以分号结尾，回车表示命令结束。不恰当的换行操作会造成解析失败或执行结果异常，而如果强行将命令书写为一行，又会给阅读带来很大障碍。

对此，在 Bash 中，使用反斜线（`\`）可以对命令换行，如下面对`curl`的使用。

```bash
curl 'http://localhost/' \
  -H 'Cache-Control: no-cache' \
  -H 'Authoritarian: token' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36' \
  --compressed
```

这样既不会造成命令解析异常，又方便了阅读。

这种在行末使用的反斜线（也叫反斜杠）英文称作[backslash](https://en.wikipedia.org/wiki/Backslash)，与`/`相对应。更多的情况下，backslash 被用在字符串中表示转义，比如用`\n`表示换行。

行末使用 backslash 的操作被称为 **line continuation**Bash 手册中对这种用法提供了[说明](https://www.gnu.org/software/bash/manual/bash.html#Escape-Character)，具体规则为 Bash 会忽略未被引号包裹的`\`和其后紧接的换行符，也就是把这样的多行代码当作一行处理。

`line continuation`在中文中一般被称为**续行**，这里沿用该翻译。

从 Bash 的语法中可以看出，所谓续行，只是语法中规定前一行行末使用特殊字符表示此处换行并不代表该行结束，请继续阅读或解析下一行。

## 续行与换行的不同

只看前面的示例，似乎是续行是 Bash 因为没有分号而提供的替代方案，实则不然。

与续行相比，换行的语法非常局限，比如 `DialogBuilder` 作为标识符是无法从中间断开的。

但续行却可以在任意字符中间完成断行操作，比如可以把 `ls` 拆分为两行。

```bash
l\
s
```

## 续行的实际用途

续行可以解决当单行语句过长时阅读不便的问题。但在实际开发中，JS、Python、C 等语言与 Bash 在语法、应用场景等方面都差异很大，一般会出于对代码美观、可维护性的考虑，人为限制单行代码长度，因此很少遇到需要语句续行的场景，甚至这种语法都被人淡忘。

在更多时候，需要续行的最高频场景一般是硬编码过长的字符串，这也是 Google `编程语言 + line continuation` 时最为常见的结果。

硬编码过长字符串的场景可以分为两种，一是中间没有换行的大段文本，二是由多行短文本组成的大段文本。

[《自河南经乱，关内阻饥，兄弟离散，各在一处。因望月有感，聊书所怀，寄上浮梁大兄、於潜七兄、乌江十五兄，兼示符离及下邽弟妹》](https://baike.baidu.com/item/%E8%87%AA%E6%B2%B3%E5%8D%97%E7%BB%8F%E4%B9%B1%E5%85%B3%E5%86%85%E9%98%BB%E9%A5%A5%E5%85%84%E5%BC%9F%E7%A6%BB%E6%95%A3%E5%90%84%E5%9C%A8%E4%B8%80%E5%A4%84%E5%9B%A0%E6%9C%9B%E6%9C%88%E6%9C%89%E6%84%9F%E8%81%8A%E4%B9%A6%E6%89%80%E6%80%80%E5%AF%84%E4%B8%8A%E6%B5%AE%E6%A2%81%E5%A4%A7%E5%85%84%E6%96%BC%E6%BD%9C%E4%B8%83%E5%85%84%E4%B9%8C%E6%B1%9F%E5%8D%81%E4%BA%94%E5%85%84%E5%85%BC%E7%A4%BA%E7%AC%A6%E7%A6%BB%E5%8F%8A%E4%B8%8B%E9%82%BD%E5%BC%9F%E5%A6%B9/6970725?fromtitle=%E6%9C%9B%E6%9C%88%E6%9C%89%E6%84%9F&fromid=853980)是白居易创作的一首七言律诗，诗题 50 字，内容 56 字，取它作为例子非常合适。

全诗如下：

> 时难年荒世业空，弟兄羁旅各西东。
>
> 田园寥落干戈后，骨肉流离道路中。
>
> 吊影分为千里雁，辞根散作九秋蓬。
>
> 共看明月应垂泪，一夜乡心五处同。

在 Bash 中，只要引号没有结束，中间可以任意换行。

因此对于第二种情况，Bash 可以轻松处理。

```bash
echo "时难年荒世业空，弟兄羁旅各西东。
田园寥落干戈后，骨肉流离道路中。
吊影分为千里雁，辞根散作九秋蓬。
共看明月应垂泪，一夜乡心五处同。"
```

只需复制粘贴即可完全保留全部格式。

对于第一种情况，需要使用 `\` 续行。

```bash
echo "自河南经乱，关内阻饥，兄弟离散，各在一处。\
因望月有感，聊书所怀，\
寄上浮梁大兄、於潜七兄、乌江十五兄，兼示符离及下邽弟妹"
```

最后输出的内容将会是连续的一行。

扩展到其他编程语言，这种操作可能会更加困难或更加容易。

# 一些编程语言中的续行

这里整理了一些热门编程语言对续行操作的支持情况，按照字母顺序排列。

**续行并不是一种好的代码风格、不推荐在实际编码中使用**，当然反之也可以推导出，如果希望[提高自己的技术壁垒](https://coolshell.cn/articles/4758.html)，续行将会是一个非常实用的技巧。

此外，对于一些编程语言，提供了硬编码大段文本时的可行方式。

由于续行是一个相对小众的语法，因此这里提供的信息**不一定准确**，其可靠性由下面两点决定。

- 对于支持续行操作的编程语言，我会**努力**给出官方文档中对于续行操作的说明。
- 对于不支持续行操作的编程语言，由于无法提供官方文档中对于不支持续行操作的声明，所以仅提供囿于我既有认知和搜索引擎综合分析得出的结论。

## C&C++

很遗憾，由于我对历史悠久、广泛使用又字母序靠前的 C 语言和 C++ 不够熟悉，甚至不知道该到哪里去查询相关的语法规范，所以对于 C 和 C++的续行支持，仅能以 Stack Overflow 的结果为准。

C 语言和 C++均支持使用`\`续行，相关的讨论分别见[how-to-split-a-string-literal-across-multiple-lines-in-c-objective-c](https://stackoverflow.com/questions/797318/how-to-split-a-string-literal-across-multiple-lines-in-c-objective-c)和[c-multiline-string-literal](https://stackoverflow.com/questions/1135841/c-multiline-string-literal)。

## C-sharp

C# [不支持](https://stackoverflow.com/questions/4086138/line-continue-character-in-c-sharp)续行操作，但 C# 的字符串可以使用一种名为 [verbatim literal](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/verbatim) 的语法，只需要在字符串双引号前添加 `@`，字符串中的所有字符将都会按照字面量处理而不会发生诸如`\\`的转义行为，同时也可以支持字符串的跨行。

```csharp
string myString = @"this is a
                    test
                   to see how long my string
                   can be



                    and it can be quite long";
```

最终输出的内容会保留字符串中所有的回车与空格。

## CSS

CSS 仅支持在字符串中使用`\`续行，比如背景图 url 过长时，可以以如下方式书写。

```css
body {
  background: url('https://cn.bing.com/th\
?id=OHR.PontFawr_ZH-CN1780190468_UHD.jpg\
&pid=hp\
&w=3840\
&h=2160\
&rs=1\
&c=4&\
r=0');
}
```

需要注意的是行末使用了`\`的行下一行不能使用空格或 tab 缩进，否则空格和 tab 也会被视为链接的内容。

这一语法在 CSS2.1 中[引入](https://www.w3.org/TR/CSS21/syndata.html#characters)。

## Go

Go 不支持续行操作。

## HTML

（如果 html 也视为一门编程语言）

HTML 本身不支持续行，但 HTML 的换行非常灵活。

对于标签属性过多导致的标签过长，可以通过对标签中属性换行来解决。

如果某个属性值内容过长，比如`href`，**据说**也可以通过[直接换行](https://stackoverflow.com/questions/22831988/string-attribute-values-in-multiple-lines-html)解决，但我未来得及阅读文档所以这里姑妄言之。

```html
<a
  href="www
.github
.com"
  title="www
.github
.com"
>
  this is a link
</a>
```

如上代码在 Chrome 中测试结果为，链接可以正常访问，但光标在链接上悬停时展示的附加说明是带有换行的。

在标签中，HTML 对空格和换行有自己的[处理规则](https://wangdoc.com/html/intro.html#%E7%A9%BA%E6%A0%BC%E5%92%8C%E6%8D%A2%E8%A1%8C)：

- 标签内容头部和尾部的空格，一律忽略不计。
- 标签内容里面的多个连续空格（包含制表符\t），会被浏览器合并为一个。
- 标签内容里面里面的换行符（\n）和回车符（\r），会被替换成空格。

在此规则下，对于英文文本，完全可以在任意空格处换行。但对于连续的中文文本，不恰当的换行会带来意料之外的空格。这种情况一时没有想到好的解决方法。不过如果是以文本为主的的 HTML，或许可以考虑直接使用 markdown 编写，markdown 中同样可以自由使用 HTML 标签。

## Java

Java 不支持续行操作，对于多行字符串的处理，可以使用 `StringBuilder` 或 `String.join` 等[方法](https://stackoverflow.com/questions/878573/java-multiline-string)，但书写上会稍有繁琐。

## JavaScript

JS 仅支持在字符串中使用`\`续行。

比如：

```js
var s =
  'hello \
world'
```

这种写法过于不见经传以至于我一直以为这是以讹传讹，直到实际操作后惊掉下巴。

查阅文档后了解到，该语法在 ES3 时代是[不被支持](https://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf)的，从 ES5 开始[引入](https://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262%205th%20edition%20December%202009.pdf)，在标准文献中检索`backslash`或`line continuation`可以定位到相关内容。目前 ES5 已经被全部主流浏览器支持，所以这一语法可以放心使用。

从 ES6 开始，JS 引入了模板字符串语法，可以更方便地实现字符串拼接与换行。

```js
var s = `hello
world`
```

## PHP

PHP 不支持续行语法，但 PHP 对字符串的处理[非常灵活](https://www.php.net/manual/en/language.types.string.php)，支持引号中的字符串换行。

```php
<?php

echo 'You can also have embedded newlines in
strings this way as it is
okay to do';

?>
```

此外还有 Heredoc 语法可以带来更方便的字符串拼接，但我还未完全理解所以此处暂不做搬运。

不过对于 php 而言，如果需要硬编码大段字符串，另一种可行的方案是直接将这段字符串置于`<?php ?>`标签之外。

## Python

Python 支持使用`\`续行，有[提案](https://www.python.org/dev/peps/pep-3125/)建议移除这一语法，但是被拒绝了。

## SQL

SQL 中已知 SQL Server 所使用的 [T-SQL](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-backslash?view=sql-server-ver15) 支持使用 `\` 续行，但由于各大数据库中使用的 SQL 事实上存在语法差异，还需要了解这一语法所属的语言标准，只能留待后续学习。

## VB

VB 目前已经淡出主流编程语言行列，但由于 VB 使用 `_` 作为续行语法较为特殊，所以在此列出。

VB6.0 诞生于 1998 年，当时互联网还不够发达，VB6.0 的文档主要以光盘形式提供。时过境迁，web 提供的文档链接已经失效，只可以找到 Stack Overflow 上对它的[引用](https://stackoverflow.com/questions/19548848/what-does-mean-in-vb)。

这一语法同样也适用于在 Excel 等 office 软件中使用的 VB。

VB 的继任者 VB.net[沿袭](https://docs.microsoft.com/en-us/dotnet/visual-basic/programming-guide/program-structure/how-to-break-and-combine-statements-in-code)了这一语法。

## 未完待续

如果将来熟悉了更多编程语言，或许这里会补充跟多编程语言中对于续行的处理。

# 总结

可以看到的时，偏向脚本化，语法更为灵活的语言更多支持了续行语法或字符串的续行，而法比较严格的语言放弃了这一特性。

事实上，不恰当的续行操作确实会对代码阅读造成困扰。这里再次声明：**本文仅是普及续行语法，为避免阅读代码时遇到续行不知所措，并非推荐滥用续行语法**。
