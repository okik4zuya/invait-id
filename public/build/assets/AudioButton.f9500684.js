import{r as u,R as a}from"./app.64ffc73b.js";import{u as r}from"./store.ceb8e460.js";function n({src:o}){const{isAudioPlay:e,setIsAudioPlay:i}=r(t=>t);return u.exports.useEffect(()=>{var t=document.getElementById("audioFile");e?t.play():t.pause()},[e]),a.createElement("div",{className:"play-button",onClick:()=>i(!e)},a.createElement("audio",{id:"audioFile",loop:!0},a.createElement("source",{src:o,type:"audio/mpeg"})),a.createElement("i",{className:`bx ${e?"bx-pause":"bx-play"}`}))}export{n as AudioButton};