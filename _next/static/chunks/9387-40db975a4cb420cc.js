(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9387],{27909:function(n,e){"use strict";e.Z={50:"#efebe9",100:"#d7ccc8",200:"#bcaaa4",300:"#a1887f",400:"#8d6e63",500:"#795548",600:"#6d4c41",700:"#5d4037",800:"#4e342e",900:"#3e2723",A100:"#d7ccc8",A200:"#bcaaa4",A400:"#8d6e63",A700:"#5d4037"}},5704:function(n,e){"use strict";e.Z={50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",A100:"#ff80ab",A200:"#ff4081",A400:"#f50057",A700:"#c51162"}},40243:function(n,e,t){"use strict";e.Z=["gu_shi_shi_jiu_shou","bai_jia_xing"].map(n=>{let e=t(14144)(`./${n}.md`).default;return{path:n,...e}})},46728:function(n,e,t){"use strict";var l=t(27909),i=t(5704),r=t(23326);e.Z=(0,r.Z)({palette:{primary:{main:l.Z[500]},secondary:{main:i.Z[600]}}})},51549:function(n,e,t){"use strict";t.d(e,{Z:function(){return l}});var l=[{type:"openSource",title:"NEXT",image:"/static/assets/next.6439f4c6.svg",url:"https://nextjs.org/",brief:"基于 React 的前端框架"},{type:"openSource",title:"MATERIAL-UI",image:"/static/assets/material-ui.826d2df7.svg",url:"https://material-ui.com/",brief:"基于 React 与 Material Design 的 UI 库"},{type:"project",title:"ICONS8",image:"/static/assets/icons8.8913d117.svg",url:"https://icons8.com/",brief:"图标、插图、照片、音乐和设计工具"}]},21980:function(n,e,t){"use strict";var l=t(52322);t(2784);var i=t(43240),r=t(28325),o=t(95305),a=t(85801),s=t(1919);let c=n=>{let{inverse:e}=n,t=(0,i.ty)();return(0,l.jsx)(a.Z,{edge:"start",color:e?"primary":"inherit",onClick:()=>{t.backToParent().catch(n=>{s.Z.myRouter.error("跳转失败",n)})},children:t.couldBack()?(0,l.jsx)(r.Z,{}):(0,l.jsx)(o.Z,{})})};c.defaultProps={inverse:!1},e.Z=c},60156:function(n,e,t){"use strict";t.d(e,{Z:function(){return R}});var l=t(52322),i=t(2784),r=t(74098),o=t(61649),a=t(23326),s=t(56980),c=t(12524),u=t.n(c),p=t(97729),h=t.n(p),d=t(4046),m=t.n(d),_=t(51549),v=t(43240),x=t(64553),f=t(15076),g=t(74704),b=t(35146),j=t(79312),Z=t(83249),k=t(18896),C=t(85801),y=t(35744),A=t(1919),N=t(15613),z=t.n(N),w=t(23119),B=t(43537),F=t.n(B),P=n=>{let{icon:e,label:t,url:i}=n;return(0,l.jsxs)("div",{className:u()(F().ackChip,{[F().leftPadding]:!e}),children:[e&&(0,l.jsx)(Z.Z,{className:F().icon,onClick:()=>{window.open(i)},children:(0,l.jsx)("img",{className:F().image,src:e})}),(0,l.jsx)(w.Z,{href:i,variant:"caption",underline:"hover",color:"CaptionText",target:"_blank",children:t})]})},S=()=>{let n=(0,v.ty)(),e=(0,i.useMemo)(()=>{let e=x.Z.appMap[n.getAppName()].acknowledgements;return[..._.Z.map(n=>({image:n.image??"",url:n.url??"",label:n.title})),...(e??[]).filter(n=>"icon8-icon"!==n.type).map(n=>({image:n.image??"",url:n.url??"",label:n.title}))]},[n]),[t,r]=(0,i.useState)("corner"),[o,a]=(0,i.useState)(!1);return"fullVisible"===t?(0,l.jsxs)("section",{className:u()(z().footer,{[z().expand]:o}),children:[(0,l.jsxs)("div",{className:z().content,children:[(0,l.jsxs)("div",{className:z().acknowledge,children:[(0,l.jsx)(j.Z,{variant:"h6",color:"text.secondary",gutterBottom:!0,children:"版权与致谢"}),(0,l.jsx)("div",{className:z().list,children:e.map((n,e)=>(0,l.jsx)(P,{icon:n.image,label:n.label,url:n.url},e))})]}),(0,l.jsxs)("div",{className:z().about,children:[(0,l.jsx)(Z.Z,{variant:"text",color:"inherit",onClick:()=>{n.push("Acknowledgements","/").catch(n=>{A.Z.myRouter.error("跳转失败",n)})},children:"全部致谢"}),(0,l.jsx)(Z.Z,{variant:"text",color:"inherit",onClick:()=>{n.push("Launcher","/").catch(n=>{A.Z.myRouter.error("跳转失败",n)})},children:"回首页"}),(0,l.jsx)(Z.Z,{variant:"text",color:"inherit",onClick:()=>{n.push("About","/").catch(n=>{A.Z.myRouter.error("跳转失败",n)})},children:"关于"})]})]}),(0,l.jsxs)("div",{className:z().controllers,children:[(0,l.jsx)(k.Z,{title:"关闭页脚，可通过刷新页面再次找到入口",children:(0,l.jsx)(C.Z,{size:"small",color:"inherit",onClick:()=>{r("hidden")},children:(0,l.jsx)(f.Z,{fontSize:"small",color:"inherit"})})}),(0,l.jsx)(k.Z,{title:"收起页脚，可通过页面左下角再次展开",children:(0,l.jsx)(C.Z,{size:"small",color:"inherit",onClick:()=>{a(!1),setTimeout(()=>{r("corner")},400)},children:(0,l.jsx)(g.Z,{fontSize:"small",color:"inherit"})})})]})]}):(0,l.jsx)(y.Z,{className:u()(z().cornerFooter,{[z().hidden]:"hidden"===t}),elevation:3,children:(0,l.jsx)(C.Z,{size:"small",className:z().expandButton,onClick:()=>{r("fullVisible"),requestAnimationFrame(()=>{a(!0)})},children:(0,l.jsx)(b.Z,{})})})};let q=(0,a.Z)({palette:{primary:{main:r.Z[500]},secondary:{main:o.Z[500]}}}),I=({title:n,children:e,fullHeight:t,theme:i=q,hideCornerFooter:r})=>(0,l.jsxs)("main",{className:u()(m().appPage,{[m().fullHeight]:t}),children:[(0,l.jsx)(h(),{children:(0,l.jsx)("title",{children:`芹也\xb7${n}`})}),(0,l.jsxs)(s.Z,{theme:i,children:[e,!r&&(0,l.jsx)(S,{})]})]});I.defaultProps={theme:q,fullHeight:!1,hideCornerFooter:!1};var R=I},91079:function(n,e,t){"use strict";var l=t(52322),i=t(2784),r=t(12524),o=t.n(r),a=t(43240),s=t(82207),c=t(6897),u=t(25665),p=t(79312),h=t(18896),d=t(85801),m=t(88629),_=t(94380),v=t(1919),x=t(21980),f=t(26440),g=t.n(f);let b=({title:n,inverse:e,whiteBg:t,sticky:r,children:f,hideMenuIcon:b,extraIcons:j})=>{let Z=(0,a.ty)(),[k,C]=(0,i.useState)(null),y=n=>{C(n.currentTarget)},A=()=>{C(null)};return(0,l.jsx)(c.Z,{className:o()(g().simpleAppBar,{[g().whiteBg]:t}),position:r?"sticky":"static",elevation:e?0:void 0,color:e?"transparent":"primary",children:(0,l.jsxs)(u.Z,{className:g().toolbar,children:[(0,l.jsx)(x.Z,{inverse:e}),n&&(0,l.jsx)(p.Z,{component:"h1",variant:"h6",className:g().title,color:e?"primary":"inherit",children:n}),(0,l.jsx)("div",{className:g().mainContent,children:f}),(0,l.jsxs)("div",{className:g().extraIcons,children:[j?.filter(n=>"never"!==n.visible).map((n,t)=>l.jsx(h.Z,{title:n.tooltip,enterDelay:800,children:l.jsx(d.Z,{className:o()({[g().extraIconPortrait]:"portraitOnly"===n.visible}),color:e?"primary":"inherit",onClick:e=>{n.onClick&&n.onClick(e)},children:n.component})},t)),!b&&(0,l.jsx)(h.Z,{title:"菜单项",enterDelay:800,children:(0,l.jsx)(d.Z,{color:e?"primary":"inherit",onClick:n=>{y(n)},children:(0,l.jsx)(s.Z,{})})})]}),(0,l.jsxs)(m.Z,{anchorEl:k,open:!!k,onClose:()=>{A()},children:[(0,l.jsx)(_.Z,{onClick:()=>{Z.push("About","/").catch(n=>{v.Z.myRouter.error("跳转失败",n)}),A()},children:"关于本站"}),(0,l.jsx)(_.Z,{onClick:()=>{Z.push("Acknowledgements","/").catch(n=>{v.Z.myRouter.error("跳转失败",n)}),A()},children:"版权致谢"}),(0,l.jsx)(_.Z,{onClick:()=>{Z.push("Launcher","/").catch(n=>{v.Z.myRouter.error("跳转失败",n)}),A()},children:"回到首页"})]})]})})};b.defaultProps={title:"",inverse:!1,whiteBg:!1,sticky:!1,children:void 0,hideMenuIcon:!1,extraIcons:[]},e.Z=b},4046:function(n){n.exports={appPage:"AppPage_app-page__GNz5J",fullHeight:"AppPage_full-height__by7x5"}},15613:function(n){n.exports={cornerFooter:"CornerFooter_corner-footer__fsd6P",expandButton:"CornerFooter_expand-button__G_DAW",hidden:"CornerFooter_hidden__Ara1K",footer:"CornerFooter_footer__XH9eD",expand:"CornerFooter_expand__7vN0K",content:"CornerFooter_content__vopgQ",acknowledge:"CornerFooter_acknowledge__tJUPl",list:"CornerFooter_list__p_VVI",about:"CornerFooter_about__xmiqz",controllers:"CornerFooter_controllers__7tRFN"}},26440:function(n){n.exports={simpleAppBar:"SimpleAppBar_simple-app-bar__fgxHL",whiteBg:"SimpleAppBar_white-bg__ODZAB",toolbar:"SimpleAppBar_toolbar__20Cik",title:"SimpleAppBar_title__TC1lj",mainContent:"SimpleAppBar_main-content__Uspj2",extraIcons:"SimpleAppBar_extra-icons__XHc_f",extraIconPortrait:"SimpleAppBar_extra-icon-portrait__H_vwg"}},43537:function(n){n.exports={ackChip:"AckChip_ack-chip__bPJbE",leftPadding:"AckChip_left-padding__h7HjS",icon:"AckChip_icon__kNUW7",image:"AckChip_image__iLPKO"}},2755:function(n,e,t){"use strict";t.r(e),e.default={title:"百家姓",toc:{list:[{title:"百家姓",level:1}],nested:[{title:"百家姓",level:1,sub:[]}]},content:"\n# 百家姓\n\n- 《百家姓》成书于北宋，共收录姓氏 504 个，其中单姓444个、复姓60个。\n- 默认每句四个字都为单姓，如果句中存在复姓，每个姓间会以“/”分割，比如“复复/单/单”\n- 最后一句“百家姓终”仅表示结束，其中“家”、“终”二字前文已有，“百”、“姓”二字可作姓但不多见。\n- 部分姓氏加注了注音，如果注音有两个，则是其确实作姓时也有两个音。\n\n---\n\n赵钱孙李　周吴郑王　冯陈褚卫　蒋沈韩杨\n\n朱秦尤许　何吕施张　孔曹严华　金魏陶姜\n\n- 华：hu\xe0\n\n戚谢邹喻　柏水窦章　云苏潘葛　奚范彭郎\n\n鲁韦昌马　苗凤花方　俞任袁柳　酆鲍史唐\n\n- 酆：fēng\n\n费廉岑薛　雷贺倪汤　滕殷罗毕　郝邬安常\n\n乐于时傅　皮卞齐康　伍余元卜　顾孟平黄\n\n- 乐：yu\xe8\n- 元：yu\xe1n\n\n和穆萧尹　姚邵湛汪　祁毛禹狄　米贝明臧\n\n- 臧：zāng\n\n计伏成戴　谈宋茅庞　熊纪舒屈　项祝董梁\n\n- 纪：jǐ\n\n杜阮蓝闵　席季麻强　贾路娄危　江童颜郭\n\n- 闵：mǐn\n\n梅盛林刁　锺徐邱骆　高夏蔡田　樊胡凌霍\n\n- 锺：zhōng\n\n虞万支柯　昝管卢莫　经房裘缪　干解应宗\n\n- 昝：zǎn\n- 缪：mi\xe0o\n- 解：xi\xe8\n\n丁宣贲邓　郁单杭洪　包诸左石　崔吉钮龚\n\n- 贲：bēn\n\n程嵇邢滑　裴陆荣翁　荀羊於惠　甄麹家封\n\n- 麴：qū\n\n芮羿储靳　汲邴糜松　井段富巫　乌焦巴弓\n\n- 靳：j\xecn\n- 邴：bǐng\n- 糜：m\xed\n\n牧隗山谷　车侯宓蓬　全郗班仰　秋仲伊宫\n\n- 隗：Ku\xed、Wěi\n- 宓：f\xfa、m\xec\n- 郗：xī\n\n宁仇栾暴　甘钭厉戎　祖武符刘　景詹束龙\n\n- 宁：n\xecng\n- 钭：tǒu\n\n叶幸司韶　郜黎蓟薄　印宿白怀　蒲邰从鄂\n\n- 郜：g\xe0o\n- 蓟：j\xec\n- 邰：t\xe1i\n\n索咸籍赖　卓蔺屠蒙　池乔阴郁　胥能苍双\n\n- 能：n\xe0i\n- 郁：y\xf9\n\n闻莘党翟　谭贡劳逄　姬申扶堵　冉宰郦雍\n\n- 莘：shēn\n- 翟：zh\xe1i\n- 逄：p\xe1ng\n\n郤璩桑桂　濮牛寿通　边扈燕冀　郏浦尚农\n\n- 郤：x\xec\n- 璩：q\xfa\n- 濮：p\xfa\n- 郏：ji\xe1\n\n温别庄晏　柴瞿阎充　慕连茹习　宦艾鱼容\n\n- 瞿：q\xfa\n\n向古易慎　戈廖庾终　暨居衡步　都耿满弘\n\n- 廖：li\xe0o\n- 暨：j\xec\n\n匡国文寇　广禄阙东　欧殳沃利　蔚越夔隆\n\n- 阙：qu\xe8\n- 殳：shū\n\n师巩厍聂　晁勾敖融　冷訾辛阚　那简饶空\n\n- 厍：sh\xe8\n- 晁：ch\xe1o\n- 訾：zǐ、zī\n- 阚：k\xe0n\n- 那：nā\n\n曾毋沙乜　养鞠须丰　巢关蒯相　查后荆红\n\n- 毋：W\xfa\n- 乜：Ni\xe8\n- 鞠：jū\n- 蒯：kuǎi\n- 查：zhā\n\n游竺权逯　盖益桓公　万俟/司马　上官/欧阳\n\n- 逯：l\xf9\n- 盖：gě\n- 万俟：m\xf2 q\xed\n\n夏侯/诸葛　闻人/东方　赫连皇甫　尉迟/公羊\n\n- 尉迟：y\xf9 ch\xed\n\n澹台/公冶　宗政/濮阳　淳于/单于　太叔/申屠\n\n- 澹台：t\xe1n t\xe1i\n- 濮阳：p\xfa y\xe1ng\n- 单于：ch\xe1n y\xfa\n\n公孙/仲孙　轩辕/令狐　锺离/宇文　长孙/慕容\n\n- 令狐：l\xedng h\xfa\n\n鲜于/闾丘　司徒/司空　亓官/司寇　仉/督/子车\n\n- 闾丘：lǘ qiū\n- 亓官：q\xed guān\n\n颛孙/端木　巫马/公西　漆雕/乐正　壤驷/公良\n\n- 颛孙：zhuān sūn\n- 壤驷：rǎng s\xec\n\n拓跋/夹谷　宰父/穀梁　晋楚闫法　汝鄢涂钦\n\n- 穀梁：gǔ li\xe1ng\n- 鄢：yān\n\n段干/百里　东郭/南门　呼延归海　羊舌/微生\n\n岳帅缑亢　况後有琴　梁丘/左丘　东门/西门\n\n- 缑：gōu\n- 後：h\xf2u\n\n商牟佘佴　伯/赏/南宫　墨哈谯笪　年爱阳佟\n\n- 佴：n\xe0i\n- 谯：qi\xe1o\n- 笪：d\xe1\n\n第五/言福　百家姓终\n",showCatalogue:!1,lastModified:"2023-10-22"}},65109:function(n,e,t){"use strict";t.r(e),e.default={title:"古诗十九首",toc:{list:[{title:"行行重行行",level:1},{title:"青青河畔草",level:1},{title:"青青陵上柏",level:1},{title:"今日良宴会",level:1},{title:"西北有高楼",level:1},{title:"涉江采芙蓉",level:1},{title:"明月皎夜光",level:1},{title:"冉冉孤生竹",level:1},{title:"庭中有奇树",level:1},{title:"迢迢牵牛星",level:1},{title:"回车驾言迈",level:1},{title:"东城高且长",level:1},{title:"驱车上东门",level:1},{title:"去者日以疏",level:1},{title:"生年不满百",level:1},{title:"凛凛岁云暮",level:1},{title:"孟冬寒气至",level:1},{title:"客从远方来",level:1},{title:"明月何皎皎",level:1}],nested:[{title:"行行重行行",level:1,sub:[]},{title:"青青河畔草",level:1,sub:[]},{title:"青青陵上柏",level:1,sub:[]},{title:"今日良宴会",level:1,sub:[]},{title:"西北有高楼",level:1,sub:[]},{title:"涉江采芙蓉",level:1,sub:[]},{title:"明月皎夜光",level:1,sub:[]},{title:"冉冉孤生竹",level:1,sub:[]},{title:"庭中有奇树",level:1,sub:[]},{title:"迢迢牵牛星",level:1,sub:[]},{title:"回车驾言迈",level:1,sub:[]},{title:"东城高且长",level:1,sub:[]},{title:"驱车上东门",level:1,sub:[]},{title:"去者日以疏",level:1,sub:[]},{title:"生年不满百",level:1,sub:[]},{title:"凛凛岁云暮",level:1,sub:[]},{title:"孟冬寒气至",level:1,sub:[]},{title:"客从远方来",level:1,sub:[]},{title:"明月何皎皎",level:1,sub:[]}]},content:"\n# 行行重行行\n\n```plain\n行行重行行，与君生别离。\n相去万余里，各在天一涯；\n道路阻且长，会面安可知？\n胡马依北风，越鸟巢南枝。\n相去日已远，衣带日已缓；\n浮云蔽白日，游子不顾反。\n思君令人老，岁月忽已晚。\n弃捐勿复道，努力加餐饭！\n```\n\n# 青青河畔草\n\n```plain\n青青河畔草，郁郁园中柳。\n盈盈楼上女，皎皎当窗牖。\n娥娥红粉妆，纤纤出素手。\n昔为倡家女，今为荡子妇。\n荡子行不归，空床难独守。\n```\n\n- 牖（yǒu）：窗户。\n- 娥娥：形容女子姿容美好。\n- 倡家：从事音乐歌舞的乐人。\n\n# 青青陵上柏\n\n```plain\n青青陵上柏，磊磊涧中石。\n人生天地间，忽如远行客。\n斗酒相娱乐，聊厚不为薄。\n驱车策驽马，游戏宛与洛。\n洛中何郁郁，冠带自相索。\n长衢罗夹巷，王侯多第宅。\n两宫遥相望，双阙百余尺。\n极宴娱心意，戚戚何所迫。\n```\n\n- 驽马：劣马，走不快的马。～十驾，功在不舍。\n- 衢（q\xfa）：大路，四通八达的道路\n\n# 今日良宴会\n\n```plain\n今日良宴会，欢乐难具陈。\n弹筝奋逸响，新声妙入神。\n令德唱高言，识曲听其真。\n齐心同所愿，含意俱未申。\n人生寄一世，奄忽若飙尘。\n何不策高足，先据要路津。\n无为守穷贱，轗轲长苦辛。\n```\n\n- 轗（kǎn）轲（kē）：古同“坎坷”。\n- 飙（biāo）尘：被狂风卷起来的尘土。\n\n# 西北有高楼\n\n```plain\n西北有高楼，上与浮云齐。\n交疏结绮窗，阿阁三重阶。\n上有弦歌声，音响一何悲！\n谁能为此曲，无乃杞梁妻。\n清商随风发，中曲正徘徊。\n一弹再三叹，慷慨有余哀。\n不惜歌者苦，但伤知音稀。\n愿为双鸿鹄，奋翅起高飞。\n```\n\n- 杞梁妻：杞梁的妻子。杞梁，即杞梁殖，春秋时齐国大夫。征伐莒（jǔ）国时，死于莒国城下。他的妻子为此痛哭十日，投水自杀。传说死前谱有琴曲《杞梁妻叹》\n\n# 涉江采芙蓉\n\n```plain\n涉江采芙蓉，兰泽多芳草。\n采之欲遗谁，所思在远道。\n还顾望旧乡，长路漫浩浩。\n同心而离居，忧伤以终老。\n```\n\n- 遗（w\xe8i）谁：赠予谁。\n\n# 明月皎夜光\n\n```plain\n明月皎夜光，促织鸣东壁。\n玉衡指孟冬，众星何历历。\n白露沾野草，时节忽复易。\n秋蝉鸣树间，玄鸟逝安适。\n昔我同门友，高举振六翮。\n不念携手好，弃我如遗迹。\n南箕北有斗，牵牛不负轭。\n良无磐石固，虚名复何益。\n```\n\n- 玉衡：指北斗七星中的第五星。\n- 玄鸟：燕子。\n- 翮（h\xe9）：本义为羽毛中间的硬管，这里泛指鸟的翅膀。据说善飞的鸟有六根健劲的羽茎，故曰“六翮”。\n- 南箕（jī）：星名，形似簸（b\xf2）箕（ji）。\n- 北有斗：即北斗。\n- 轭：车辕前横木，牛拉车则负轭。“不负轭”是说不拉车。\n\n# 冉冉孤生竹\n\n```plain\n冉冉孤生竹，结根泰山阿。\n与君为新婚，菟丝附女萝。\n菟丝生有时，夫妇会有宜。\n千里远结婚，悠悠隔山陂。\n思君令人老，轩车来何迟！\n伤彼蕙兰花，含英扬光辉。\n过时而不采，将随秋草萎。\n君亮执高节，贱妾亦何为！\n```\n\n- 菟（t\xf9）丝：一种旋花科的蔓生植物。\n- 轩车：有屏障的车。古代大夫以上所乘。后亦泛指车。\n- 山陂（bēi）：山坡。\n\n# 庭中有奇树\n\n```plain\n庭中有奇树，绿叶发华滋。\n攀条折其荣，将以遗所思。\n馨香盈怀袖，路远莫致之。\n此物何足贵，但感别经时。\n```\n\n# 迢迢牵牛星\n\n```plain\n迢迢牵牛星，皎皎河汉女。\n纤纤擢素手，札札弄机杼。\n终日不成章，泣涕零如雨。\n河汉清且浅，相去复几许。\n盈盈一水间，脉脉不得语。\n```\n\n- 擢（zhu\xf3）：拔。\n- 札（zh\xe1）札：象声词，机织声。\n- 杼（zh\xf9）：织布机上的梭子。\n\n# 回车驾言迈\n\n```plain\n回车驾言迈，悠悠涉长道。\n四顾何茫茫，东风摇百草。\n所遇无故物，焉得不速老。\n盛衰各有时，立身苦不早。\n人生非金石，岂能长寿考。\n奄忽随物化，荣名以为宝。\n```\n\n- 回车驾言迈：言：语助词。\n\n# 东城高且长\n\n```plain\n东城高且长，逶迤自相属。\n回风动地起，秋草萋已绿。\n四时更变化，岁暮一何速！\n晨风怀苦心，蟋蟀伤局促。\n荡涤放情志，何为自结束！\n燕赵多佳人，美者颜如玉。\n被服罗裳衣，当户理清曲。\n音响一何悲！弦急知柱促。\n驰情整巾带，沉吟聊踯躅。\n思为双飞燕，衔泥巢君屋。\n```\n\n- 踯（zh\xed）躅（zh\xfa）：徘徊不前。\n\n# 驱车上东门\n\n```plain\n驱车上东门，遥望郭北墓。\n白杨何萧萧，松柏夹广路。\n下有陈死人，杳杳即长暮。\n潜寐黄泉下，千载永不寤。\n浩浩阴阳移，年命如朝露。\n人生忽如寄，寿无金石固。\n万岁更相送，贤圣莫能度。\n服食求神仙，多为药所误。\n不如饮美酒，被服纨与素。\n```\n\n# 去者日以疏\n\n```plain\n去者日以疏，生者日已亲。\n出郭门直视，但见丘与坟。\n古墓犁为田，松柏摧为薪。\n白杨多悲风，萧萧愁杀人。\n思还故里闾，欲归道无因。\n```\n\n- 里闾（lǘ）：里巷；乡里。\n\n# 生年不满百\n\n```plain\n生年不满百，常怀千岁忧。\n昼短苦夜长，何不秉烛游！\n为乐当及时，何能待来兹。\n愚者爱惜费，但为后世嗤。\n仙人王子乔，难可与等期。\n```\n\n- 王子乔：古代传说中的仙人。\n\n# 凛凛岁云暮\n\n```plain\n凛凛岁云暮，蝼蛄夕鸣悲。\n凉风率已厉，游子寒无衣。\n锦衾遗洛浦，同袍与我违。\n独宿累长夜，梦想见容辉。\n良人惟古欢，枉驾惠前绥。\n愿得常巧笑，携手同车归。\n既来不须臾，又不处重闱。\n亮无晨风翼，焉能凌风飞。\n眄睐以适意，引领遥相希。\n徙倚怀感伤，垂涕沾双扉。\n```\n\n- 蝼（l\xf3u）蛄（gū）：害虫，夜喜就灯光飞鸣。\n- 眄（miǎn）睐（l\xe0i）：眄，斜视。睐，旁视。眄睐指环顾。\n\n# 孟冬寒气至\n\n```plain\n孟冬寒气至，北风何惨栗。\n愁多知夜长，仰观众星列。\n三五明月满，四五蟾兔缺。\n客从远方来，遗我一书札。\n上言长相思，下言久离别。\n置书怀袖中，三岁字不灭。\n一心抱区区，惧君不识察。\n```\n\n# 客从远方来\n\n```plain\n客从远方来，遗我一端绮。\n相去万余里，故人心尚尔。\n文彩双鸳鸯，裁为合欢被。\n著以长相思，缘以结不解。\n以胶投漆中，谁能别离此。\n```\n\n# 明月何皎皎\n\n```plain\n明月何皎皎，照我罗床纬。\n忧愁不能寐，揽衣起徘徊。\n客行虽云乐，不如早旋归。\n出户独彷徨，愁思当告谁！\n引领还入房，泪下沾裳衣。\n```\n\n- 旋归：回归。\n",showCatalogue:!0,lastModified:"2022-03-01"}},14144:function(n,e,t){var l={"./bai_jia_xing.md":2755,"./gu_shi_shi_jiu_shou.md":65109};function i(n){return t(r(n))}function r(n){if(!t.o(l,n)){var e=Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}return l[n]}i.keys=function(){return Object.keys(l)},i.resolve=r,n.exports=i,i.id=14144}}]);