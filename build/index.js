(()=>{"use strict";const e=window.wp.components,t=window.wp.element,s=window.wp.data,n=window.wp.coreData,i=window.wp.htmlEntities,a=window.ReactJSXRuntime;function r(){const[i,r]=(0,t.useState)(""),[o,c]=(0,t.useState)(!1),{pages:p,hasResolved:h}=(0,s.useSelect)((e=>{const t=i?{search:i}:{};return{pages:e(n.store).getEntityRecords("postType","page",t),hasResolved:e(n.store).hasFinishedResolution("getEntityRecords",["postType","page",t])}}),[i]),g=()=>c(!1);return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"list-controls",children:[(0,a.jsx)(e.SearchControl,{onChange:r,value:i}),(0,a.jsx)(e.Button,{onClick:()=>c(!0),variant:"primary",children:"Create New Page"})]}),(0,a.jsx)(d,{hasResolved:h,pages:p}),o&&(0,a.jsx)(e.Modal,{onRequestClose:g,title:"Create New Page",children:(0,a.jsx)(l,{onCancel:g,onSaveFinished:g})})]})}function o({pageId:s}){const[n,i]=(0,t.useState)(!1),r=()=>i(!1);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.Button,{onClick:()=>i(!0),variant:"primary",children:"Edit"}),n&&(0,a.jsx)(e.Modal,{onRequestClose:r,title:"Edit Page",children:(0,a.jsx)(p,{pageId:s,onCancel:r,onSaveFinished:r})})]})}function d({hasResolved:t,pages:s}){return t?s?.length?(0,a.jsxs)("table",{className:"wp-list-table widefat fixed striped table-view-list",children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{children:"Title"}),(0,a.jsx)("th",{children:"Actions"})]})}),(0,a.jsx)("tbody",{children:s.map((e=>(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:(0,i.decodeEntities)(e.title.rendered)}),(0,a.jsx)("td",{children:(0,a.jsx)(o,{pageId:e.id})})]},e.id)))})]}):(0,a.jsx)("div",{children:"No results"}):(0,a.jsx)(e.Spinner,{})}function l({onCancel:e,onSaveFinished:i}){const[r,o]=(0,t.useState)(""),{lastError:d,isSaving:l}=(0,s.useSelect)((e=>({lastError:e(n.store).getLastEntitySaveError("postType","page"),isSaving:e(n.store).isSavingEntityRecord("postType","page")})),[]),{saveEntityRecord:p}=(0,s.useDispatch)(n.store);return(0,a.jsx)(c,{title:r,onChangeTitle:o,hasEdits:!!r,onSave:async()=>{await p("postType","page",{title:r,status:"publish"})&&i()},lastError:d,onCancel:e,isSaving:l})}function c({title:t,onChangeTitle:s,hasEdits:n,lastError:i,isSaving:r,onCancel:o,onSave:d}){return(0,a.jsxs)("div",{className:"my-gutenberg-form",children:[(0,a.jsx)(e.TextControl,{label:"Page title:",value:t,onChange:s}),i&&(0,a.jsxs)("div",{className:"form-error",children:["Error: ",i.message]}),(0,a.jsxs)("div",{className:"form-buttons",children:[(0,a.jsx)(e.Button,{onClick:d,variant:"primary",disabled:!n||r,children:r?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.Spinner,{}),"Saving"]}):"Save"}),(0,a.jsx)(e.Button,{onClick:o,variant:"tertiary",disabled:r,children:"Cancel"})]})]})}function p({pageId:i,onCancel:r,onSaveFinished:o}){const{page:d,lastError:l,isSaving:c,hasEdits:p}=(0,s.useSelect)((e=>({page:e(n.store).getEditedEntityRecord("postType","page",i),lastError:e(n.store).getLastEntitySaveError("postType","page",i),isSaving:e(n.store).isSavingEntityRecord("postType","page",i),hasEdits:e(n.store).hasEditsForEntityRecord("postType","page",i)})),[i]),{saveEditedEntityRecord:h,editEntityRecord:g}=(0,s.useDispatch)(n.store),[u,v]=(0,t.useState)(""),[x,j]=(0,t.useState)(!0);return(0,t.useEffect)((()=>{d?(v(d.title.rendered),j(!1)):j(!0)}),[d]),x?(0,a.jsx)(e.Spinner,{}):(0,a.jsxs)("div",{className:"my-gutenberg-form",children:[(0,a.jsx)(e.TextControl,{label:"Page title:",value:u,onChange:e=>{v(e),g("postType","page",i,{title:e})}}),l&&(0,a.jsxs)("div",{className:"form-error",children:["Error: ",l.message]}),(0,a.jsxs)("div",{className:"form-buttons",children:[(0,a.jsx)(e.Button,{onClick:async()=>{await h("postType","page",i)&&o()},variant:"primary",disabled:!p||c,children:c?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.Spinner,{}),"Saving"]}):"Save"}),(0,a.jsx)(e.Button,{onClick:r,variant:"tertiary",disabled:c,children:"Cancel"})]})]})}window.addEventListener("load",(function(){(0,t.render)((0,a.jsx)(r,{}),document.querySelector("#my-first-gutenberg-app"))}),!1)})();