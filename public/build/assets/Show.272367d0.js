import{u as A,r as B,R as a}from"./app.54eafb0f.js";import{S as H}from"./splide-core.min.1c135564.js";/* empty css                */import{u as $,B as g}from"./Block.c63f6ce4.js";import{u as f}from"./store.792ab5fb.js";import v from"./Modal.a2364779.js";import q from"./Gift.8d8790c6.js";import C from"./Ucapan.81914baa.js";import D from"./Reservation.95d5bca6.js";import{AudioButton as V}from"./AudioButton.61ed5a6d.js";import{Y as E}from"./index.26894aa4.js";import"./Countdown.3ab25a1b.js";import"./CloseButton.3f9db791.js";import"./typeof.2a08ffa3.js";import"./cst-visit.b44e8428.js";function re(){var w,S;const{invitation:l}=A().props,{template:y}=l,M=window.location.search,x=new URLSearchParams(M),{isModalGiftShow:I,setIsModalGiftShow:R}=f(e=>e),{isModalUcapanShow:T,setIsModalUcapanShow:L}=f(e=>e),{isModalRsvpShow:P,setIsModalRsvpShow:F}=f(e=>e),{isCoverShow:G,setIsCoverShow:Y}=f(e=>e),{pageIndex:m,setPageIndex:h}=f(e=>e),n=E.parse(l.custom_template.content),N=E.parse(y.template),b=E.parse(l.custom_template.template),i=e=>(n==null?void 0:n.features.hasOwnProperty(e))===!0?n==null?void 0:n.features[e]:null;let u=[];if(n!=null&&n.features)for(const e in n.features)n.features[e].is_page_enabled===!1&&u.push(e);const U=()=>{var s,t,r;let e={};if(e.nama_tamu=(s=x.get("to"))!=null?s:"Nama Tamu",n.pages)for(let o=0;o<n.pages.length;o++)e={...e,...n.pages[o]};for(const o in e){let d=document.querySelectorAll("."+o);for(let c=0;c<d.length;c++)d[c]&&(((t=d[c])==null?void 0:t.tagName)==="IMG"?d[c].src=e[o]:((r=d[c])==null||r.tagName,d[c].innerHTML=e[o]))}},_=()=>l.is_custom_template==!0?b.background:N.background,p=()=>{let s=l.is_custom_template==!0?b.pages:N.pages;for(let t=0;t<u.length;t++)u[t]==="maps"?s=s.filter(r=>r.page_title!=="Maps"):u[t]==="rsvp"?s=s.filter(r=>r.page_title!=="RSVP"):u[t]==="ucapan"?s=s.filter(r=>r.page_title!=="Ucapan"):u[t]==="gift"&&(s=s.filter(r=>r.page_title!=="Gift"));return s};return $(),B.exports.useEffect(()=>{const e=document.createElement("style");e.innerHTML=l.is_custom_template==!0?l.custom_template.css:l.template.css,document.head.appendChild(e);var s=new H("#thumb-slider",{arrows:!1,fixedWidth:"100px",height:"70px",pagination:!1,isNavigation:!0,focus:"center"});return s.mount(),s.on("click",t=>{h(t.index)}),n&&U(),document.addEventListener("swiped-up",t=>{m<p().length-1&&h(m+1)}),document.addEventListener("swiped-down",t=>{m>0&&h(m-1)}),()=>{document.removeEventListener("swiped-up",()=>{}),document.removeEventListener("swiped-down",()=>{})}},[m]),a.createElement("div",{className:"canvas-absolute"},a.createElement("div",{className:"canvas-relative"},((w=i("audio"))==null?void 0:w.is_enabled)&&a.createElement(V,{src:i("audio").data.src}),a.createElement(v,{isShow:I,onClose:()=>R(!1)},a.createElement(q,{data:i("gift")})," "),a.createElement(v,{isShow:T,onClose:()=>L(!1)},a.createElement(C,{data:i("ucapan"),messages:l.invitation_message})," "),a.createElement(v,{isShow:P,onClose:()=>F(!1)},a.createElement(D,{data:i("rsvp")})," "),a.createElement("div",{className:`cover-container ${G==!1&&"cover-container--out"}`},a.createElement("div",{className:"background-container"},_()&&_()[0].blocks.map((e,s)=>a.createElement(g,{key:s,type:e.type,className:e.className,attributes:e.attributes,container_attributes:e.container_attributes,content:e.content,blocks:e.blocks,data:i(e.type),getFeatureData:i}))),a.createElement("div",{className:"content-frame"},p()&&((S=p()[0].blocks)==null?void 0:S.map((e,s)=>a.createElement(g,{key:s,type:e.type,className:e.className,attributes:e.attributes,container_attributes:e.container_attributes,content:e.content,blocks:e.blocks,data:i(e.type),getFeatureData:i}))))),a.createElement("div",{id:"main-slider"},p()&&p().slice(1).map((e,s)=>a.createElement("div",{key:s,className:`page-${s+1}`},m===s&&a.createElement(a.Fragment,null,a.createElement("div",{className:"layer__background"},_()&&_()[e.background].blocks.map((t,r)=>a.createElement(g,{key:r,type:t.type,className:t.className,attributes:t.attributes,container_attributes:t.container_attributes,content:t.content,blocks:t.blocks,data:i(t.type),getFeatureData:i}))),a.createElement("div",{className:"layer__content"},a.createElement("div",{className:"content-frame"},e.blocks.map((t,r)=>a.createElement(g,{key:r,type:t.type,className:t.className,attributes:t.attributes,container_attributes:t.container_attributes,content:t.content,blocks:t.blocks,data:i(t.type),getFeatureData:i})))))))),a.createElement("div",{id:"thumb-slider",className:"splide","aria-label":"Thumbnail Slider"},a.createElement("div",{className:"splide__track"},a.createElement("ul",{className:"splide__list"},p().slice(1).map((e,s)=>a.createElement("li",{key:s,className:"splide__slide menu-thumb d-flex flex-column align-items-center justify-content-center"},a.createElement("i",{className:`${e.thumb_icon} menu-thumb__icon`}),a.createElement("div",{className:"menu-thumb__title mt-1"},e.page_title))))))))}export{re as default};
