import{R as e}from"./app.a421fc55.js";import{u as m}from"./store.ae36c411.js";import r from"./CloseButton.83b50297.js";function u(s){const{data:t,attributes:i}=s,{setIsModalGiftShow:l}=m(a=>a);return e.createElement("div",{className:"modal-gift_container animate__animated animate__fadeInUp",style:{backgroundColor:"white",overflow:"auto"}},e.createElement(r,{onClose:()=>l(!1)}),e.createElement("div",{className:"modal-gift_title"},t.data.title),e.createElement("div",{className:"modal-gift_narasi"},t.data.narration),e.createElement("div",{className:"gift-list_wrapper"},t.data.accounts.map((a,n)=>e.createElement("div",{className:"u-mb-4 rounded u-pt-4 u-pb-4 u-pl-4 u-pr-4 d-flex flex-column align-items-center",style:{background:"#e5e5e5"}},e.createElement("div",{className:"u-fw-700 u-fs-22 u-font-base"},a.title),e.createElement("img",{className:"u-w-40",src:a.logo,alt:a.logo}),e.createElement("div",{className:"u-fw-700 u-fs-16 u-font-base"},a.name),a.account&&e.createElement("div",{className:"u-fs-16 u-font-base"},a.account),a.address&&e.createElement("div",{className:"u-fs-16 u-font-base"},a.address)))))}export{u as default};