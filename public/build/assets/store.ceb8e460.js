import{r as _,g as m}from"./app.64ffc73b.js";const w=e=>{let t;const n=new Set,r=(u,E)=>{const i=typeof u=="function"?u(t):u;if(!Object.is(i,t)){const S=t;t=(E!=null?E:typeof i!="object")?i:Object.assign({},t,i),n.forEach(p=>p(t,S))}},o=()=>t,l={setState:r,getState:o,subscribe:u=>(n.add(u),()=>n.delete(u)),destroy:()=>{({VITE_PUSHER_APP_KEY:"",VITE_PUSHER_HOST:"",VITE_PUSHER_PORT:"443",VITE_PUSHER_SCHEME:"https",VITE_PUSHER_APP_CLUSTER:"mt1",BASE_URL:"/build/",MODE:"production",DEV:!1,PROD:!0}&&"production")!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}};return t=e(r,o,l),l},T=e=>e?w(e):w;var x={exports:{}},R={},I={exports:{}},g={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d=_.exports;function V(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var U=typeof Object.is=="function"?Object.is:V,b=d.useState,O=d.useEffect,D=d.useLayoutEffect,H=d.useDebugValue;function M(e,t){var n=t(),r=b({inst:{value:n,getSnapshot:t}}),o=r[0].inst,s=r[1];return D(function(){o.value=n,o.getSnapshot=t,h(o)&&s({inst:o})},[e,n,t]),O(function(){return h(o)&&s({inst:o}),e(function(){h(o)&&s({inst:o})})},[e]),H(n),n}function h(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!U(e,n)}catch{return!0}}function A(e,t){return t()}var C=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?A:M;g.useSyncExternalStore=d.useSyncExternalStore!==void 0?d.useSyncExternalStore:C;(function(e){e.exports=g})(I);/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=_.exports,j=I.exports;function $(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var L=typeof Object.is=="function"?Object.is:$,B=j.useSyncExternalStore,G=v.useRef,k=v.useEffect,q=v.useMemo,K=v.useDebugValue;R.useSyncExternalStoreWithSelector=function(e,t,n,r,o){var s=G(null);if(s.current===null){var a={hasValue:!1,value:null};s.current=a}else a=s.current;s=q(function(){function u(c){if(!E){if(E=!0,i=c,c=r(c),o!==void 0&&a.hasValue){var f=a.value;if(o(f,c))return S=f}return S=c}if(f=S,L(i,c))return f;var P=r(c);return o!==void 0&&o(f,P)?f:(i=c,S=P)}var E=!1,i,S,p=n===void 0?null:n;return[function(){return u(t())},p===null?void 0:function(){return u(p())}]},[t,n,r,o]);var l=B(e,s[0],s[1]);return k(function(){a.hasValue=!0,a.value=l},[l]),K(l),l};(function(e){e.exports=R})(x);const W=m(x.exports),{useSyncExternalStoreWithSelector:Y}=W;function z(e,t=e.getState,n){const r=Y(e.subscribe,e.getState,e.getServerState||e.getState,t,n);return _.exports.useDebugValue(r),r}const y=e=>{({VITE_PUSHER_APP_KEY:"",VITE_PUSHER_HOST:"",VITE_PUSHER_PORT:"443",VITE_PUSHER_SCHEME:"https",VITE_PUSHER_APP_CLUSTER:"mt1",BASE_URL:"/build/",MODE:"production",DEV:!1,PROD:!0}&&"production")!=="production"&&typeof e!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const t=typeof e=="function"?T(e):e,n=(r,o)=>z(t,r,o);return Object.assign(n,t),n},F=e=>e?y(e):y,N=F(e=>({pageIndex:-1,setPageIndex:t=>e({pageIndex:t}),isCoverShow:!0,setIsCoverShow:t=>e({isCoverShow:t}),isModalGiftShow:!1,setIsModalGiftShow:t=>e({isModalGiftShow:t}),isModalUcapanShow:!1,setIsModalUcapanShow:t=>e({isModalUcapanShow:t}),isModalRsvpShow:!1,setIsModalRsvpShow:t=>e({isModalRsvpShow:t}),isAudioPlay:!1,setIsAudioPlay:t=>e({isAudioPlay:t})}));export{N as u};
