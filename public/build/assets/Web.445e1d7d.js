import{r as t,R as e,d as n,L as a}from"./app.64ffc73b.js";function o(r){const[c,s]=t.exports.useState(!1),[l,m]=t.exports.useState(!1);return t.exports.useEffect(()=>{window.onscroll=function(){window.pageYOffset>120?m(!0):m(!1)}},[]),e.createElement("div",{className:"home-container"},e.createElement("div",{className:"home__background"}),e.createElement("div",{className:"home__top-content"},e.createElement("div",{className:"logo-top",onClick:()=>n.Inertia.visit("/")},e.createElement("img",{alt:"home-logo",src:"/assets/images/logo.png"}),e.createElement("div",{className:"invait"},"invait")),e.createElement("ul",{className:`home__navbar ${l&&"home__navbar--fixed"}`},e.createElement("li",{className:"navbar__item"},e.createElement(a,{href:"/"}," Home ")),e.createElement("div",{className:"dot-spacer"}),e.createElement("li",{className:"navbar__item"},e.createElement(a,{href:"/tema"}," Tema "))),e.createElement("ul",{className:`home__navbar home__navbar--mobile ${l&&"home__navbar--fixed"}`},e.createElement("img",{className:"logo-invait",src:"/assets/images/logo.png",onClick:()=>n.Inertia.visit("/")}),e.createElement("div",{className:"navbar__item--menu",onClick:()=>s(!0)},"Menu"),c===!0&&e.createElement(e.Fragment,null,e.createElement("li",{className:"navbar__item"},e.createElement(a,{href:"/"}," Home ")),e.createElement("li",{className:"navbar__item"},e.createElement(a,{href:"/tema"}," Tema ")),e.createElement("li",{className:"navbar__item"},e.createElement(a,{href:"/tema"},"Cara Order")),e.createElement("i",{className:"x bx bx-x",onClick:()=>s(!1)}))),e.createElement("div",{className:"w-100"},r.children),e.createElement("div",{className:"footer-section"},e.createElement("div",{className:"left"},e.createElement("img",{className:"logo-with-text",alt:"logo-with-text",src:"/assets/images/logo.png"})),e.createElement("div",{className:"right"},e.createElement("div",{className:"footer-link"},"Blog"),e.createElement("div",{className:"footer-link"},"Tentang"),e.createElement("div",{className:"footer-link"},"Kontak"),e.createElement("div",{className:"footer-link"},"Kebijakan Privasi"))),e.createElement("div",{className:"copyright-section"},"Copyright @2023 Invait.id")))}export{o as W};
