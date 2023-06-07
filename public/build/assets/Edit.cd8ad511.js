import{u as p,r as n,R as e,H as f,d as b}from"./app.64ffc73b.js";import{L as N}from"./Account.49689b20.js";import{S as h}from"./sweetalert2.all.b2606c57.js";import"./Permissions.0ca54098.js";import"./objectWithoutPropertiesLoose.a7a57350.js";function w(){const{errors:s,permissions:o,role:c}=p().props,[r,i]=n.exports.useState(c.name),[m,d]=n.exports.useState(c.permissions.map(a=>a.name)),u=a=>{let t=m;t.some(l=>l===a.target.value)?t=t.filter(l=>l!==a.target.value):t.push(a.target.value),d(t)},E=async a=>{a.preventDefault(),b.Inertia.put(`/account/roles/${c.id}`,{name:r,permissions:m},{onSuccess:()=>{h.fire({title:"Success!",text:"Data updated successfully!",icon:"success",showConfirmButton:!1,timer:1500})}})};return e.createElement(e.Fragment,null,e.createElement(f,null,e.createElement("title",null,"Edit Roles - Geek Store")),e.createElement(N,null,e.createElement("div",{className:"row mt-4"},e.createElement("div",{className:"col-12"},e.createElement("div",{className:"card border-0 rounded shadow-sm border-top-success"},e.createElement("div",{className:"card-header"},e.createElement("span",{className:"font-weight-bold"},e.createElement("i",{className:"fa fa-shield-alt"})," Edit Role")),e.createElement("div",{className:"card-body"},e.createElement("form",{onSubmit:E},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Role Name"),e.createElement("input",{type:"text",className:"form-control",value:r,onChange:a=>i(a.target.value),placeholder:"Enter Role Name"})),s.name&&e.createElement("div",{className:"alert alert-danger"},s.name),e.createElement("hr",null),e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"fw-bold"},"Permissions"),e.createElement("br",null),o.map((a,t)=>e.createElement("div",{className:"form-check form-check-inline",key:t},e.createElement("input",{className:"form-check-input",type:"checkbox",value:a.name,defaultChecked:m.some(l=>l===a.name),onChange:u,id:`check-${a.id}`}),e.createElement("label",{className:"form-check-label",htmlFor:`check-${a.id}`},a.name))),s.permissions&&e.createElement("div",{className:"alert alert-danger mt-2"},s.permissions)),e.createElement("div",null,e.createElement("button",{type:"submit",className:"btn btn-md btn-success me-2"},e.createElement("i",{className:"fa fa-save"})," Update"),e.createElement("button",{type:"reset",className:"btn btn-md btn-warning"},e.createElement("i",{className:"fa fa-redo"})," Reset")))))))))}export{w as default};
