(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9572],{86315:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});var o=r(2784);function n(e){return o.Children.toArray(e).filter(e=>o.isValidElement(e))}},2185:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/pure-search",function(){return r(58721)}])},51549:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var o=[{type:"openSource",title:"NEXT",image:"/static/assets/next.6439f4c6.svg",url:"https://nextjs.org/",brief:"基于 React 的前端框架"},{type:"openSource",title:"MATERIAL-UI",image:"/static/assets/material-ui.826d2df7.svg",url:"https://material-ui.com/",brief:"基于 React 与 Material Design 的 UI 库"},{type:"project",title:"ICONS8",image:"/static/assets/icons8.8913d117.svg",url:"https://icons8.com/",brief:"图标、插图、照片、音乐和设计工具"}]},58721:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return q},default:function(){return D}});var o,n=r(52322),i=r(2784),a=r(60156),l=r(91079),s=r(15076),d=r(79312),c=r(77612),u=r(40489),p=r(69075),h=r(7342),m=r(94675),f=r(60433),g=r(43269),x=r(38541),v=r(35354),_=r(69222),b=r(15672);function Z(e){return(0,b.ZP)("MuiInputAdornment",e)}let j=(0,_.Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),B=e=>{let{classes:t,disablePointerEvents:r,hiddenLabel:o,position:n,size:i,variant:a}=e,l={root:["root",r&&"disablePointerEvents",n&&`position${(0,h.Z)(n)}`,a,o&&"hiddenLabel",i&&`size${(0,h.Z)(i)}`]};return(0,p.Z)(l,Z,t)},y=(0,g.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`position${(0,h.Z)(r.position)}`],!0===r.disablePointerEvents&&t.disablePointerEvents,t[r.variant]]}})((0,x.Z)(({theme:e})=>({display:"flex",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(e.vars||e).palette.action.active,variants:[{props:{variant:"filled"},style:{[`&.${j.positionStart}&:not(.${j.hiddenLabel})`]:{marginTop:16}}},{props:{position:"start"},style:{marginRight:8}},{props:{position:"end"},style:{marginLeft:8}},{props:{disablePointerEvents:!0},style:{pointerEvents:"none"}}]}))),$=i.forwardRef(function(e,t){let r=(0,v.i)({props:e,name:"MuiInputAdornment"}),{children:a,className:l,component:s="div",disablePointerEvents:c=!1,disableTypography:p=!1,position:h,variant:g,...x}=r,_=(0,f.Z)()||{},b=g;g&&_.variant,_&&!b&&(b=_.variant);let Z={...r,hiddenLabel:_.hiddenLabel,size:_.size,disablePointerEvents:c,position:h,variant:b},j=B(Z);return(0,n.jsx)(m.Z.Provider,{value:null,children:(0,n.jsx)(y,{as:s,ownerState:Z,className:(0,u.Z)(j.root,l),ref:t,...x,children:"string"!=typeof a||p?(0,n.jsxs)(i.Fragment,{children:["start"===h?o||(o=(0,n.jsx)("span",{className:"notranslate",children:"​"})):null,a]}):(0,n.jsx)(d.Z,{color:"textSecondary",children:a})})})});var C=r(85801),k=r(63163),S=r(86315),w=r(6082);function P(e){return(0,b.ZP)("MuiButtonGroup",e)}let N=(0,_.Z)("MuiButtonGroup",["root","contained","outlined","text","disableElevation","disabled","firstButton","fullWidth","horizontal","vertical","colorPrimary","colorSecondary","grouped","groupedHorizontal","groupedVertical","groupedText","groupedTextHorizontal","groupedTextVertical","groupedTextPrimary","groupedTextSecondary","groupedOutlined","groupedOutlinedHorizontal","groupedOutlinedVertical","groupedOutlinedPrimary","groupedOutlinedSecondary","groupedContained","groupedContainedHorizontal","groupedContainedVertical","groupedContainedPrimary","groupedContainedSecondary","lastButton","middleButton"]);var R=r(49146),A=r(87897);let E=e=>{let{classes:t,color:r,disabled:o,disableElevation:n,fullWidth:i,orientation:a,variant:l}=e,s={root:["root",l,a,i&&"fullWidth",n&&"disableElevation",`color${(0,h.Z)(r)}`],grouped:["grouped",`grouped${(0,h.Z)(a)}`,`grouped${(0,h.Z)(l)}`,`grouped${(0,h.Z)(l)}${(0,h.Z)(a)}`,`grouped${(0,h.Z)(l)}${(0,h.Z)(r)}`,o&&"disabled"],firstButton:["firstButton"],lastButton:["lastButton"],middleButton:["middleButton"]};return(0,p.Z)(s,P,t)},z=(0,g.ZP)("div",{name:"MuiButtonGroup",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[{[`& .${N.grouped}`]:t.grouped},{[`& .${N.grouped}`]:t[`grouped${(0,h.Z)(r.orientation)}`]},{[`& .${N.grouped}`]:t[`grouped${(0,h.Z)(r.variant)}`]},{[`& .${N.grouped}`]:t[`grouped${(0,h.Z)(r.variant)}${(0,h.Z)(r.orientation)}`]},{[`& .${N.grouped}`]:t[`grouped${(0,h.Z)(r.variant)}${(0,h.Z)(r.color)}`]},{[`& .${N.firstButton}`]:t.firstButton},{[`& .${N.lastButton}`]:t.lastButton},{[`& .${N.middleButton}`]:t.middleButton},t.root,t[r.variant],!0===r.disableElevation&&t.disableElevation,r.fullWidth&&t.fullWidth,"vertical"===r.orientation&&t.vertical]}})((0,x.Z)(({theme:e})=>({display:"inline-flex",borderRadius:(e.vars||e).shape.borderRadius,variants:[{props:{variant:"contained"},style:{boxShadow:(e.vars||e).shadows[2]}},{props:{disableElevation:!0},style:{boxShadow:"none"}},{props:{fullWidth:!0},style:{width:"100%"}},{props:{orientation:"vertical"},style:{flexDirection:"column",[`& .${N.lastButton},& .${N.middleButton}`]:{borderTopRightRadius:0,borderTopLeftRadius:0},[`& .${N.firstButton},& .${N.middleButton}`]:{borderBottomRightRadius:0,borderBottomLeftRadius:0}}},{props:{orientation:"horizontal"},style:{[`& .${N.firstButton},& .${N.middleButton}`]:{borderTopRightRadius:0,borderBottomRightRadius:0},[`& .${N.lastButton},& .${N.middleButton}`]:{borderTopLeftRadius:0,borderBottomLeftRadius:0}}},{props:{variant:"text",orientation:"horizontal"},style:{[`& .${N.firstButton},& .${N.middleButton}`]:{borderRight:e.vars?`1px solid rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${"light"===e.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${N.disabled}`]:{borderRight:`1px solid ${(e.vars||e).palette.action.disabled}`}}}},{props:{variant:"text",orientation:"vertical"},style:{[`& .${N.firstButton},& .${N.middleButton}`]:{borderBottom:e.vars?`1px solid rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${"light"===e.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${N.disabled}`]:{borderBottom:`1px solid ${(e.vars||e).palette.action.disabled}`}}}},...Object.entries(e.palette).filter((0,w.Z)()).flatMap(([t])=>[{props:{variant:"text",color:t},style:{[`& .${N.firstButton},& .${N.middleButton}`]:{borderColor:e.vars?`rgba(${e.vars.palette[t].mainChannel} / 0.5)`:(0,k.Fq)(e.palette[t].main,.5)}}}]),{props:{variant:"outlined",orientation:"horizontal"},style:{[`& .${N.firstButton},& .${N.middleButton}`]:{borderRightColor:"transparent","&:hover":{borderRightColor:"currentColor"}},[`& .${N.lastButton},& .${N.middleButton}`]:{marginLeft:-1}}},{props:{variant:"outlined",orientation:"vertical"},style:{[`& .${N.firstButton},& .${N.middleButton}`]:{borderBottomColor:"transparent","&:hover":{borderBottomColor:"currentColor"}},[`& .${N.lastButton},& .${N.middleButton}`]:{marginTop:-1}}},{props:{variant:"contained",orientation:"horizontal"},style:{[`& .${N.firstButton},& .${N.middleButton}`]:{borderRight:`1px solid ${(e.vars||e).palette.grey[400]}`,[`&.${N.disabled}`]:{borderRight:`1px solid ${(e.vars||e).palette.action.disabled}`}}}},{props:{variant:"contained",orientation:"vertical"},style:{[`& .${N.firstButton},& .${N.middleButton}`]:{borderBottom:`1px solid ${(e.vars||e).palette.grey[400]}`,[`&.${N.disabled}`]:{borderBottom:`1px solid ${(e.vars||e).palette.action.disabled}`}}}},...Object.entries(e.palette).filter((0,w.Z)(["dark"])).map(([t])=>({props:{variant:"contained",color:t},style:{[`& .${N.firstButton},& .${N.middleButton}`]:{borderColor:(e.vars||e).palette[t].dark}}}))],[`& .${N.grouped}`]:{minWidth:40,boxShadow:"none",props:{variant:"contained"},style:{"&:hover":{boxShadow:"none"}}}}))),T=i.forwardRef(function(e,t){let r=(0,v.i)({props:e,name:"MuiButtonGroup"}),{children:o,className:a,color:l="primary",component:s="div",disabled:d=!1,disableElevation:c=!1,disableFocusRipple:p=!1,disableRipple:h=!1,fullWidth:m=!1,orientation:f="horizontal",size:g="medium",variant:x="outlined",..._}=r,b={...r,color:l,component:s,disabled:d,disableElevation:c,disableFocusRipple:p,disableRipple:h,fullWidth:m,orientation:f,size:g,variant:x},Z=E(b),j=i.useMemo(()=>({className:Z.grouped,color:l,disabled:d,disableElevation:c,disableFocusRipple:p,disableRipple:h,fullWidth:m,size:g,variant:x}),[l,d,c,p,h,m,g,x,Z.grouped]),B=(0,S.Z)(o),y=B.length,$=e=>{let t=0===e,r=e===y-1;return t&&r?"":t?Z.firstButton:r?Z.lastButton:Z.middleButton};return(0,n.jsx)(z,{as:s,role:"group",className:(0,u.Z)(Z.root,a),ref:t,ownerState:b,..._,children:(0,n.jsx)(R.Z.Provider,{value:j,children:B.map((e,t)=>(0,n.jsx)(A.Z.Provider,{value:$(t),children:e},t))})})});var L=r(83249),F=r(52616),I=r(61035),M=r(68584),H=r(24487),O=r.n(H),V=r(11181),G=(0,r(23326).Z)({palette:{primary:{main:V.Z[500]},secondary:{main:{50:"#fff8e1",100:"#ffecb3",200:"#ffe082",300:"#ffd54f",400:"#ffca28",500:"#ffc107",600:"#ffb300",700:"#ffa000",800:"#ff8f00",900:"#ff6f00",A100:"#ffe57f",A200:"#ffd740",A400:"#ffc400",A700:"#ffab00"}[600]}}});let U=[{name:"必应",url:"https://cn.bing.com/search?q="},{name:"搜狗",url:"https://www.sogou.com/web?query="},{name:"Google",url:"https://www.google.com/search?q="},{name:"百度",url:"https://www.baidu.com/s?wd="}];var q=!0,D=()=>{let[e,t]=(0,i.useState)(""),[r,o]=(0,i.useState)(!0),u=(0,i.useRef)(null),p=(0,i.useCallback)(t=>{let o=`${t.url}${encodeURIComponent(e)}`;r?window.open(o,"_blank"):document.location.href=o},[e,r]),h=e=>{p(e)},m=(0,i.useCallback)(()=>{p(U[0])},[p]);return(0,i.useEffect)(()=>{let e=u.current?.querySelector("input[type=search]");return e?.addEventListener("search",m),()=>{e?.removeEventListener("search",m)}},[m]),(0,n.jsx)(a.Z,{title:"纯粹搜索",theme:G,fullHeight:!0,children:(0,n.jsxs)("section",{className:O().pureSearch,children:[(0,n.jsx)(l.Z,{title:"纯粹搜索",inverse:!0,sticky:!0}),(0,n.jsx)("div",{className:O().content,children:(0,n.jsxs)("div",{className:O().center,children:[(0,n.jsxs)("div",{className:O().titleBar,children:[(0,n.jsx)("img",{src:M.Z,className:O().logo}),(0,n.jsxs)("div",{className:O().right,children:[(0,n.jsx)(d.Z,{variant:"h4",color:"secondary",children:"Pure Search"}),(0,n.jsx)(d.Z,{color:"text.secondary",variant:"caption",sx:{marginTop:"4px"},children:"只是跳一下对应的搜索引擎"})]})]}),(0,n.jsx)("div",{className:O().input,children:(0,n.jsx)(c.Z,{ref:u,placeholder:"",type:"search",value:e,onChange:e=>{t(e.target.value)},endAdornment:e.length?(0,n.jsx)($,{position:"end",children:(0,n.jsx)(C.Z,{onClick:()=>{t("");let e=u.current?.querySelector("input[type=search]");e?.focus()},edge:"end",children:(0,n.jsx)(s.Z,{})})}):void 0,onKeyDown:e=>{"Enter"===e.code&&m()}})}),(0,n.jsx)("div",{className:O().buttons,children:(0,n.jsx)(T,{variant:"contained",children:U.map(e=>(0,n.jsx)(L.Z,{onClick:()=>{h(e)},children:e.name},e.name))})}),(0,n.jsx)(F.Z,{label:(0,n.jsx)(d.Z,{color:"text.secondary",variant:"body2",children:"在新标签页中打开"}),control:(0,n.jsx)(I.Z,{size:"small"}),checked:r,onChange:(e,t)=>{o(t)}})]})})]})})}},21980:function(e,t,r){"use strict";var o=r(52322);r(2784);var n=r(43240),i=r(28325),a=r(95305),l=r(85801),s=r(1919);let d=e=>{let{inverse:t}=e,r=(0,n.ty)();return(0,o.jsx)(l.Z,{edge:"start",color:t?"primary":"inherit",onClick:()=>{r.backToParent().catch(e=>{s.Z.myRouter.error("跳转失败",e)})},children:r.couldBack()?(0,o.jsx)(i.Z,{}):(0,o.jsx)(a.Z,{})})};d.defaultProps={inverse:!1},t.Z=d},60156:function(e,t,r){"use strict";r.d(t,{Z:function(){return T}});var o=r(52322),n=r(2784),i=r(74098),a=r(61649),l=r(23326),s=r(56980),d=r(12524),c=r.n(d),u=r(97729),p=r.n(u),h=r(4046),m=r.n(h),f=r(51549),g=r(43240),x=r(64553),v=r(15076),_=r(74704),b=r(35146),Z=r(79312),j=r(83249),B=r(18896),y=r(85801),$=r(35744),C=r(1919),k=r(15613),S=r.n(k),w=r(23119),P=r(43537),N=r.n(P),R=e=>{let{icon:t,label:r,url:n}=e;return(0,o.jsxs)("div",{className:c()(N().ackChip,{[N().leftPadding]:!t}),children:[t&&(0,o.jsx)(j.Z,{className:N().icon,onClick:()=>{window.open(n)},children:(0,o.jsx)("img",{className:N().image,src:t})}),(0,o.jsx)(w.Z,{href:n,variant:"caption",underline:"hover",color:"CaptionText",target:"_blank",children:r})]})},A=()=>{let e=(0,g.ty)(),t=(0,n.useMemo)(()=>{let t=x.Z.appMap[e.getAppName()].acknowledgements;return[...f.Z.map(e=>({image:e.image??"",url:e.url??"",label:e.title})),...(t??[]).filter(e=>"icon8-icon"!==e.type).map(e=>({image:e.image??"",url:e.url??"",label:e.title}))]},[e]),[r,i]=(0,n.useState)("corner"),[a,l]=(0,n.useState)(!1);return"fullVisible"===r?(0,o.jsxs)("section",{className:c()(S().footer,{[S().expand]:a}),children:[(0,o.jsxs)("div",{className:S().content,children:[(0,o.jsxs)("div",{className:S().acknowledge,children:[(0,o.jsx)(Z.Z,{variant:"h6",color:"text.secondary",gutterBottom:!0,children:"版权与致谢"}),(0,o.jsx)("div",{className:S().list,children:t.map((e,t)=>(0,o.jsx)(R,{icon:e.image,label:e.label,url:e.url},t))})]}),(0,o.jsxs)("div",{className:S().about,children:[(0,o.jsx)(j.Z,{variant:"text",color:"inherit",onClick:()=>{e.push("Acknowledgements","/").catch(e=>{C.Z.myRouter.error("跳转失败",e)})},children:"全部致谢"}),(0,o.jsx)(j.Z,{variant:"text",color:"inherit",onClick:()=>{e.push("Launcher","/").catch(e=>{C.Z.myRouter.error("跳转失败",e)})},children:"回首页"}),(0,o.jsx)(j.Z,{variant:"text",color:"inherit",onClick:()=>{e.push("About","/").catch(e=>{C.Z.myRouter.error("跳转失败",e)})},children:"关于"})]})]}),(0,o.jsxs)("div",{className:S().controllers,children:[(0,o.jsx)(B.Z,{title:"关闭页脚，可通过刷新页面再次找到入口",children:(0,o.jsx)(y.Z,{size:"small",color:"inherit",onClick:()=>{i("hidden")},children:(0,o.jsx)(v.Z,{fontSize:"small",color:"inherit"})})}),(0,o.jsx)(B.Z,{title:"收起页脚，可通过页面左下角再次展开",children:(0,o.jsx)(y.Z,{size:"small",color:"inherit",onClick:()=>{l(!1),setTimeout(()=>{i("corner")},400)},children:(0,o.jsx)(_.Z,{fontSize:"small",color:"inherit"})})})]})]}):(0,o.jsx)($.Z,{className:c()(S().cornerFooter,{[S().hidden]:"hidden"===r}),elevation:3,children:(0,o.jsx)(y.Z,{size:"small",className:S().expandButton,onClick:()=>{i("fullVisible"),requestAnimationFrame(()=>{l(!0)})},children:(0,o.jsx)(b.Z,{})})})};let E=(0,l.Z)({palette:{primary:{main:i.Z[500]},secondary:{main:a.Z[500]}}}),z=({title:e,children:t,fullHeight:r,theme:n=E,hideCornerFooter:i})=>(0,o.jsxs)("main",{className:c()(m().appPage,{[m().fullHeight]:r}),children:[(0,o.jsx)(p(),{children:(0,o.jsx)("title",{children:`芹也\xb7${e}`})}),(0,o.jsxs)(s.Z,{theme:n,children:[t,!i&&(0,o.jsx)(A,{})]})]});z.defaultProps={theme:E,fullHeight:!1,hideCornerFooter:!1};var T=z},91079:function(e,t,r){"use strict";var o=r(52322),n=r(2784),i=r(12524),a=r.n(i),l=r(43240),s=r(82207),d=r(6897),c=r(25665),u=r(79312),p=r(18896),h=r(85801),m=r(88629),f=r(94380),g=r(1919),x=r(21980),v=r(26440),_=r.n(v);let b=({title:e,inverse:t,whiteBg:r,sticky:i,children:v,hideMenuIcon:b,extraIcons:Z})=>{let j=(0,l.ty)(),[B,y]=(0,n.useState)(null),$=e=>{y(e.currentTarget)},C=()=>{y(null)};return(0,o.jsx)(d.Z,{className:a()(_().simpleAppBar,{[_().whiteBg]:r}),position:i?"sticky":"static",elevation:t?0:void 0,color:t?"transparent":"primary",children:(0,o.jsxs)(c.Z,{className:_().toolbar,children:[(0,o.jsx)(x.Z,{inverse:t}),e&&(0,o.jsx)(u.Z,{component:"h1",variant:"h6",className:_().title,color:t?"primary":"inherit",children:e}),(0,o.jsx)("div",{className:_().mainContent,children:v}),(0,o.jsxs)("div",{className:_().extraIcons,children:[Z?.filter(e=>"never"!==e.visible).map((e,r)=>o.jsx(p.Z,{title:e.tooltip,enterDelay:800,children:o.jsx(h.Z,{className:a()({[_().extraIconPortrait]:"portraitOnly"===e.visible}),color:t?"primary":"inherit",onClick:t=>{e.onClick&&e.onClick(t)},children:e.component})},r)),!b&&(0,o.jsx)(p.Z,{title:"菜单项",enterDelay:800,children:(0,o.jsx)(h.Z,{color:t?"primary":"inherit",onClick:e=>{$(e)},children:(0,o.jsx)(s.Z,{})})})]}),(0,o.jsxs)(m.Z,{anchorEl:B,open:!!B,onClose:()=>{C()},children:[(0,o.jsx)(f.Z,{onClick:()=>{j.push("About","/").catch(e=>{g.Z.myRouter.error("跳转失败",e)}),C()},children:"关于本站"}),(0,o.jsx)(f.Z,{onClick:()=>{j.push("Acknowledgements","/").catch(e=>{g.Z.myRouter.error("跳转失败",e)}),C()},children:"版权致谢"}),(0,o.jsx)(f.Z,{onClick:()=>{j.push("Launcher","/").catch(e=>{g.Z.myRouter.error("跳转失败",e)}),C()},children:"回到首页"})]})]})})};b.defaultProps={title:"",inverse:!1,whiteBg:!1,sticky:!1,children:void 0,hideMenuIcon:!1,extraIcons:[]},t.Z=b},24487:function(e){e.exports={pureSearch:"PureSearch_pure-search__Uplge",content:"PureSearch_content__84Fnd",center:"PureSearch_center__LJGV1",titleBar:"PureSearch_title-bar__t6IuA",logo:"PureSearch_logo__4dOlc",right:"PureSearch_right__8BUwk",input:"PureSearch_input__0kUKQ",buttons:"PureSearch_buttons__LX2hP"}},4046:function(e){e.exports={appPage:"AppPage_app-page__GNz5J",fullHeight:"AppPage_full-height__by7x5"}},15613:function(e){e.exports={cornerFooter:"CornerFooter_corner-footer__fsd6P",expandButton:"CornerFooter_expand-button__G_DAW",hidden:"CornerFooter_hidden__Ara1K",footer:"CornerFooter_footer__XH9eD",expand:"CornerFooter_expand__7vN0K",content:"CornerFooter_content__vopgQ",acknowledge:"CornerFooter_acknowledge__tJUPl",list:"CornerFooter_list__p_VVI",about:"CornerFooter_about__xmiqz",controllers:"CornerFooter_controllers__7tRFN"}},26440:function(e){e.exports={simpleAppBar:"SimpleAppBar_simple-app-bar__fgxHL",whiteBg:"SimpleAppBar_white-bg__ODZAB",toolbar:"SimpleAppBar_toolbar__20Cik",title:"SimpleAppBar_title__TC1lj",mainContent:"SimpleAppBar_main-content__Uspj2",extraIcons:"SimpleAppBar_extra-icons__XHc_f",extraIconPortrait:"SimpleAppBar_extra-icon-portrait__H_vwg"}},43537:function(e){e.exports={ackChip:"AckChip_ack-chip__bPJbE",leftPadding:"AckChip_left-padding__h7HjS",icon:"AckChip_icon__kNUW7",image:"AckChip_image__iLPKO"}}},function(e){e.O(0,[7403,2939,5865,8629,8197,7612,9175,2888,9774,179],function(){return e(e.s=2185)}),_N_E=e.O()}]);