(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5044],{52616:function(e,t,r){"use strict";r.d(t,{Z:function(){return g}});var a=r(2784),l=r(40489),n=r(69075),i=r(60433),o=r(43269),s=r(38541),c=r(35354),d=r(79312),u=r(7342),F=r(69222),m=r(15672);function h(e){return(0,m.ZP)("MuiFormControlLabel",e)}let p=(0,F.Z)("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]);var f=r(28734),b=r(45133),C=r(52322);let E=e=>{let{classes:t,disabled:r,labelPlacement:a,error:l,required:i}=e,o={root:["root",r&&"disabled",`labelPlacement${(0,u.Z)(a)}`,l&&"error",i&&"required"],label:["label",r&&"disabled"],asterisk:["asterisk",l&&"error"]};return(0,n.Z)(o,h,t)},v=(0,o.ZP)("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[{[`& .${p.label}`]:t.label},t.root,t[`labelPlacement${(0,u.Z)(r.labelPlacement)}`]]}})((0,s.Z)(({theme:e})=>({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${p.disabled}`]:{cursor:"default"},[`& .${p.label}`]:{[`&.${p.disabled}`]:{color:(e.vars||e).palette.text.disabled}},variants:[{props:{labelPlacement:"start"},style:{flexDirection:"row-reverse",marginRight:-11}},{props:{labelPlacement:"top"},style:{flexDirection:"column-reverse"}},{props:{labelPlacement:"bottom"},style:{flexDirection:"column"}},{props:({labelPlacement:e})=>"start"===e||"top"===e||"bottom"===e,style:{marginLeft:16}}]}))),B=(0,o.ZP)("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,t)=>t.asterisk})((0,s.Z)(({theme:e})=>({[`&.${p.error}`]:{color:(e.vars||e).palette.error.main}})));var g=a.forwardRef(function(e,t){let r=(0,c.i)({props:e,name:"MuiFormControlLabel"}),{checked:n,className:o,componentsProps:s={},control:u,disabled:F,disableTypography:m,inputRef:h,label:p,labelPlacement:g="end",name:A,onChange:D,required:y,slots:Z={},slotProps:x={},value:_,...P}=r,k=(0,i.Z)(),w=F??u.props.disabled??k?.disabled,R=y??u.props.required,S={disabled:w,required:R};["checked","name","onChange","value","inputRef"].forEach(e=>{void 0===u.props[e]&&void 0!==r[e]&&(S[e]=r[e])});let j=(0,f.Z)({props:r,muiFormControl:k,states:["error"]}),L={...r,disabled:w,labelPlacement:g,required:R,error:j.error},N=E(L),M={slots:Z,slotProps:{...s,...x}},[z,$]=(0,b.Z)("typography",{elementType:d.Z,externalForwardedProps:M,ownerState:L}),I=p;return null==I||I.type===d.Z||m||(I=(0,C.jsx)(z,{component:"span",...$,className:(0,l.Z)(N.label,$?.className),children:I})),(0,C.jsxs)(v,{className:(0,l.Z)(N.root,o),ownerState:L,ref:t,...P,children:[a.cloneElement(u,S),R?(0,C.jsxs)("div",{children:[I,(0,C.jsxs)(B,{ownerState:L,"aria-hidden":!0,className:N.asterisk,children:[" ","*"]})]}):I]})})},27909:function(e,t){"use strict";t.Z={50:"#efebe9",100:"#d7ccc8",200:"#bcaaa4",300:"#a1887f",400:"#8d6e63",500:"#795548",600:"#6d4c41",700:"#5d4037",800:"#4e342e",900:"#3e2723",A100:"#d7ccc8",A200:"#bcaaa4",A400:"#8d6e63",A700:"#5d4037"}},5704:function(e,t){"use strict";t.Z={50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",A100:"#ff80ab",A200:"#ff4081",A400:"#f50057",A700:"#c51162"}},28098:function(e,t,r){"use strict";r.d(t,{Z:function(){return E}});var a=r(2784),l=r(40489),n=r(69075),i=r(7342),o=r(87742),s=r(43269),c=r(19570),d=r(60433),u=r(31325),F=r(69222),m=r(15672);function h(e){return(0,m.ZP)("PrivateSwitchBase",e)}(0,F.Z)("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);var p=r(52322);let f=e=>{let{classes:t,checked:r,disabled:a,edge:l}=e,o={root:["root",r&&"checked",a&&"disabled",l&&`edge${(0,i.Z)(l)}`],input:["input"]};return(0,n.Z)(o,h,t)},b=(0,s.ZP)(u.Z)({padding:9,borderRadius:"50%",variants:[{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:({edge:e,ownerState:t})=>"start"===e&&"small"!==t.size,style:{marginLeft:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}},{props:({edge:e,ownerState:t})=>"end"===e&&"small"!==t.size,style:{marginRight:-12}}]}),C=(0,s.ZP)("input",{shouldForwardProp:o.Z})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1});var E=a.forwardRef(function(e,t){let{autoFocus:r,checked:a,checkedIcon:n,className:i,defaultChecked:o,disabled:s,disableFocusRipple:u=!1,edge:F=!1,icon:m,id:h,inputProps:E,inputRef:v,name:B,onBlur:g,onChange:A,onFocus:D,readOnly:y,required:Z=!1,tabIndex:x,type:_,value:P,...k}=e,[w,R]=(0,c.Z)({controlled:a,default:!!o,name:"SwitchBase",state:"checked"}),S=(0,d.Z)(),j=s;S&&void 0===j&&(j=S.disabled);let L="checkbox"===_||"radio"===_,N={...e,checked:w,disabled:j,disableFocusRipple:u,edge:F},M=f(N);return(0,p.jsxs)(b,{component:"span",className:(0,l.Z)(M.root,i),centerRipple:!0,focusRipple:!u,disabled:j,tabIndex:null,role:void 0,onFocus:e=>{D&&D(e),S&&S.onFocus&&S.onFocus(e)},onBlur:e=>{g&&g(e),S&&S.onBlur&&S.onBlur(e)},ownerState:N,ref:t,...k,children:[(0,p.jsx)(C,{autoFocus:r,checked:a,defaultChecked:o,className:M.input,disabled:j,id:L?h:void 0,name:B,onChange:e=>{if(e.nativeEvent.defaultPrevented)return;let t=e.target.checked;R(t),A&&A(e,t)},readOnly:y,ref:v,required:Z,ownerState:N,tabIndex:x,type:_,..."checkbox"===_&&void 0===P?{}:{value:P},...E}),w?n:m]})})},31305:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/bullet-chat",function(){return r(47750)}])},47750:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return x},default:function(){return _}});var a=r(52322),l=r(2784),n=r(60156),i=(0,r(29798).Z)((0,a.jsx)("path",{d:"m3.4 20.4 17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91"}),"SendRounded"),o=r(35744),s=r(52616),c=r(38738),d=r(68403),u=r(83249);let F=(e,t)=>{let r=0,a=0,l=0,n=0,i=l=>{0===r&&(r=l),l-r-n>=t?(e(),r=0,n=0):a=requestAnimationFrame(i)},o=()=>{"hidden"===document.visibilityState?l=performance.now():"visible"===document.visibilityState&&(n+=performance.now()-l)};return document.addEventListener("visibilitychange",o),a=requestAnimationFrame(i),()=>{document.removeEventListener("visibilitychange",o),cancelAnimationFrame(a)}},m=(e,t)=>{let r;let a=()=>{e(),r=F(a,t)};return r=F(a,t),()=>{r()}};var h=r(85002),p=r.n(h),f=["春江潮水连海平","海上明月共潮生","滟滟随波千万里","何处春江无月明","江流宛转绕芳甸","月照花林皆似霰","空里流霜不觉飞","汀上白沙看不见","江天一色无纤尘","皎皎空中孤月轮","江畔何人初见月","江月何年初照人","人生代代无穷已","江月年年望相似","不知江月待何人","但见长江送流水","白云一片去悠悠","青枫浦上不胜愁","谁家今夜扁舟子","何处相思明月楼","可怜楼上月徘徊","应照离人妆镜台","此时相望不相闻","愿逐月华流照君","鸿雁长飞光不度","鱼龙潜跃水成文","昨夜闲潭梦落花","可怜春半不还家","江水流春去欲尽","江潭落月复西斜","斜月沉沉藏海雾","碣石潇湘无限路","不知乘月几人归","落月摇情满江树"],b=r(27929),C=r(97757),E=r(73599),v=r.n(E);let B=Math.floor(8),g=[["#FDEB71","#F8D800"],["#ABDCFF","#0396FF"],["#FEB692","#EA5455"],["#CE9FFC","#7367F0"],["#90F7EC","#32CCBC"],["#FFF6B7","#F6416C"],["#81FBB8","#28C76F"],["#E2B0FF","#9F44D3"],["#F97794","#623AA2"],["#FCCF31","#F55555"],["#F761A1","#8C1BAB"],["#43CBFF","#9708CC"],["#5EFCE8","#736EFE"],["#FAD7A1","#E96D71"],["#FFD26F","#3677FF"],["#A0FE65","#FA016D"],["#FFDB01","#0E197D"],["#FEC163","#DE4313"],["#92FFC0","#002661"],["#EEAD92","#6018DC"],["#F6CEEC","#D939CD"],["#52E5E7","#130CB7"],["#F1CA74","#A64DB6"],["#E8D07A","#5312D6"],["#EECE13","#B210FF"],["#79F1A4","#0E5CAD"],["#FDD819","#E80505"],["#FFF3B0","#CA26FF"],["#FFF5C3","#9452A5"],["#F05F57","#360940"],["#2AFADF","#4C83FF"],["#FFF886","#F072B6"],["#97ABFF","#123597"],["#F5CBFF","#C346C2"],["#FFF720","#3CD500"],["#FF6FD8","#3813C2"],["#EE9AE5","#5961F9"],["#FFD3A5","#FD6585"],["#C2FFD8","#465EFB"],["#FD6585","#0D25B9"],["#FD6E6A","#FFC600"],["#65FDF0","#1D6FA3"],["#6B73FF","#000DFF"],["#FF7AF5","#513162"],["#F0FF00","#58CFFB"],["#FFE985","#FA742B"],["#FFA6B7","#1E2AD2"],["#FFAA85","#B3315F"],["#72EDF2","#5151E5"],["#FF9D6C","#BB4E75"],["#F6D242","#FF52E5"],["#69FF97","#00E4FF"],["#3B2667","#BC78EC"],["#70F570","#49C628"],["#3C8CE7","#00EAFF"],["#FAB2FF","#1904E5"],["#81FFEF","#F067B4"],["#FFA8A8","#FCFF00"],["#FFCF71","#2376DD"],["#FF96F9","#C32BAC"]].map(e=>`linear-gradient(135deg, ${e[0]} 10%, ${e[1]} 100%)`);class A extends l.Component{constructor(e){super(e),this.totalCount=0,this.timers=[],this.state={tracks:[],bulletDuration:6},this.playerRef=l.createRef(),this.resizeHandler=()=>{this.playerRef.current&&this.setState({bulletDuration:Math.round(this.playerRef.current.clientWidth/80)})}}componentDidMount(){this.resizeHandler(),window.addEventListener("resize",this.resizeHandler)}componentWillUnmount(){this.timers.forEach(e=>{e()}),window.removeEventListener("resize",this.resizeHandler)}addBullet(e){this.addBullets([e])}addBullets(e){let{tracks:t,bulletDuration:r}=this.state;this.setState({tracks:[...t,...e.map(e=>(this.totalCount+=1,{key:this.totalCount,content:e,top:25+(this.totalCount+1)%(B-1)*50+Math.floor(10*Math.random())*(Math.random()>.5?1:-1),left:Math.ceil(120*Math.random()),backgroundImage:(0,b.DQ)(g),avatar:(0,b.DQ)(C.Z)}))]}),this.timers.push(F(()=>{let{tracks:t}=this.state;this.setState({tracks:t.slice(e.length)})},1e3*r))}render(){let{tracks:e,bulletDuration:t}=this.state;return(0,a.jsx)("section",{className:v().bulletPlayer,ref:this.playerRef,children:e.map(e=>(0,a.jsx)("div",{className:v().line,style:{top:e.top,paddingLeft:e.left,animationDuration:`${t}s`},children:(0,a.jsxs)("div",{className:v().bullet,children:[(0,a.jsx)("img",{className:v().avatar,src:e.avatar}),(0,a.jsx)("span",{className:v().text,style:{backgroundImage:e.backgroundImage},children:e.content})]})},e.key))})}}var D=r(27909),y=r(5704),Z=(0,r(23326).Z)({palette:{primary:{main:D.Z[500]},secondary:{main:y.Z[600]}}}),x=!0,_=()=>{let e=(0,l.useRef)(0),t=(0,l.useRef)(null),[r,F]=(0,l.useState)(""),[h,b]=(0,l.useState)(!0);(0,l.useEffect)(()=>h?m(()=>{t.current?.addBullet(f[e.current++%f.length])},1e3):()=>{},[h]);let C=()=>{t.current?.addBullet(r),F("")};return(0,a.jsx)(n.Z,{title:"弹幕 demo",theme:Z,fullHeight:!0,children:(0,a.jsxs)("section",{className:p().bulletChat,children:[(0,a.jsx)(A,{ref:t}),(0,a.jsxs)(o.Z,{className:p().bottomBar,elevation:3,children:[(0,a.jsx)(s.Z,{value:h,control:(0,a.jsx)(c.Z,{defaultChecked:!0}),label:"预设弹幕",onChange:e=>{b(e.target.checked)}}),(0,a.jsx)(d.Z,{size:"small",value:r,placeholder:"输入要发送的弹幕…",onChange:e=>{F(e.target.value)},onKeyDown:e=>{"Enter"===e.code&&C()}}),(0,a.jsx)(u.Z,{sx:{marginLeft:"20px"},variant:"contained",endIcon:(0,a.jsx)(i,{}),onClick:C,children:"Send"})]})]})})}},27929:function(e,t,r){"use strict";r.d(t,{DQ:function(){return c},LS:function(){return n},O5:function(){return s},OP:function(){return o},Wl:function(){return i},_v:function(){return a}});let a=e=>new Promise(t=>{setTimeout(t,e)}),l=e=>new Promise((t,r)=>{let a=new Image;a.src=e,a.onload=()=>{t()},a.onerror=e=>{r(e)}}),n=(e,t=1e3)=>Promise.any([(async()=>{await Promise.all(e.map(e=>l(e)))})(),a(t)]),i=()=>document.location.hash.slice(1),o=(e,t)=>{let r=document.createElement("a");r.href=t,r.download=e,r.click()},s=(e,t,r)=>Math.max(e,Math.min(t,r)),c=e=>e[Math.floor(e.length*Math.random())]},85002:function(e){e.exports={bulletChat:"BulletChat_bullet-chat__mvccA",bottomBar:"BulletChat_bottom-bar__6bQ62"}},73599:function(e){e.exports={bulletPlayer:"BulletPlayer_bullet-player__7xR3t",line:"BulletPlayer_line__pX579",fly:"BulletPlayer_fly__wm0di",bullet:"BulletPlayer_bullet__wvVq0",avatar:"BulletPlayer_avatar__tTJ_t",text:"BulletPlayer_text__AkRS1"}}},function(e){e.O(0,[7403,2939,5865,8629,7612,8403,2181,2888,9774,179],function(){return e(e.s=31305)}),_N_E=e.O()}]);