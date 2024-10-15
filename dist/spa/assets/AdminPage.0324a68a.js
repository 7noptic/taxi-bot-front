import{a as ue,b as le,j as te}from"./QCard.440d414a.js";import{$ as E,Q as V}from"./QInput.76567d60.js";import{j as N,r as o,a as h,v as ne,ay as oe,af as se,y as O,m as c,A as x,n as b,ag as ie,ae as B,p as g,ac as w,u as $,t as j,z as P,s as q,q as r,Q as K,F as I,B as de,ab as R,aJ as z,ad as re,aN as G,aO as H}from"./index.327b4700.js";import{Q as ce,m as T,a as ve,b as me,T as ge}from"./TableSkeleton.772c2dc2.js";import{e as J}from"./helpers.5a00600a.js";import{M as C}from"./mode.table.8dd12f40.js";import{_ as Q}from"./plugin-vue_export-helper.21dcd24c.js";import"./use-dark.5b66a423.js";import"./QItem.cb161c91.js";import"./axios.4e4c9ce2.js";import"./QList.421edf4a.js";const pe={class:"container"},_e=N({__name:"TableAdmin",props:{list:{default:()=>[]},hiddenFields:{default:()=>[]},pagination:{default:()=>({currentPage:1,perPageCount:10,total:0})},mode:{default:C.Page},loading:{type:Boolean,default:!1}},emits:["selectPage","update"],setup(v,{emit:A}){const p=A,a=v,s=o([]),l=o(""),t=h(()=>Math.ceil(a.pagination.total/a.pagination.perPageCount)),e=o(!1),_=h(()=>e.value||a.loading),n=o(a.mode),m=ne(),{userData:y}=oe(m),k=o(!1),W=h(()=>a.hiddenFields.length?T.filter(i=>!a.hiddenFields.includes(i.field)):T),S=h(()=>n.value==C.Page?{rowsPerPage:a.pagination.perPageCount,page:a.pagination.currentPage,rowsNumber:Number(a.pagination.total)}:{rowsPerPage:a.pagination.perPageCount}),X=i=>{var d;return(d=i.cols.find(({name:u})=>u==="_id"))==null?void 0:d.value},Y=se(async i=>{l.value=i,e.value=!0;const d=()=>{s.value=[],n.value=a.mode,e.value=!1};if(!l.value){d();return}await E.findAdminByName(l.value,u=>{n.value=C.All,s.value=u,e.value=!1},d())},700),Z=async()=>{k.value=!0,n.value===C.All?(await J(T,D.value),k.value=!1):n.value===C.Page&&E.getAllAdmins(async i=>{await J(T,i.data),k.value=!1},i=>{k.value=!1,console.log(i)})},ee=async i=>{E.deleteAdminById(i,async d=>{console.log(d),p("update"),R.create({message:"\u263A\uFE0F \u0410\u0434\u043C\u0438\u043D \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D",color:"positive",timeout:1500})},d=>{k.value=!1,console.log(d)})},F=i=>{p("selectPage",i)},D=h(()=>l.value?s.value:a.list),ae=o(!1);return O(()=>{setTimeout(()=>ae.value=!0,1500)}),(i,d)=>(c(),x("div",pe,[(c(),b(ce,{key:S.value,columns:W.value,loading:_.value,pagination:S.value,rows:D.value,"rows-per-page-options":n.value==B(C).Page?[10]:[5,7,10,15,20,25,50,0],class:"table-city","row-key":"name",title:"\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u044B"},ie({"top-left":g(()=>[r(V,{"model-value":l.value,debounce:"300",dense:"",outlined:"",placeholder:"\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0438\u043C\u0435\u043D\u0438",standout:"","onUpdate:modelValue":B(Y)},{append:g(()=>[r(K,{name:"search"})]),_:1},8,["model-value","onUpdate:modelValue"])]),body:g(u=>[r(me,{props:u,class:"table-city__row"},{default:g(()=>[(c(!0),x(I,null,de(u.cols,f=>(c(),b(ve,{key:f.name,props:u},{default:g(()=>{var L,M;return[f.name==="_id"?(c(),x(I,{key:0},[],64)):f.name==="delete"?(c(),b(P,{key:1,disable:((L=u.cols.find(({name:U})=>U==="email"))==null?void 0:L.value)==((M=B(y))==null?void 0:M.email)||D.value.length<=1,class:"cursor-pointer",color:"red",dense:"",onClick:U=>ee(X(u))},{default:g(()=>[r(K,{name:"delete",size:"xs"})]),_:2},1032,["disable","onClick"])):(c(),x(I,{key:2},[j($(f.value),1)],64))]}),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),"top-right":g(()=>[r(P,{disable:!D.value.length,loading:k.value,color:"primary","icon-right":"archive",label:"\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0432 csv","no-caps":"",onClick:Z},null,8,["disable","loading"])]),_:2},[n.value==B(C).Page?{name:"pagination",fn:g(u=>[w("b",null,$(u.pagination.page),1),j(" \xA0 \u0438\u0437\xA0 "),w("b",null,$(u.pagesNumber),1),u.pagesNumber>2?(c(),b(P,{key:0,disable:u.isFirstPage,color:"grey-8",dense:"",flat:"",icon:"first_page",round:"",onClick:d[0]||(d[0]=f=>F(1))},null,8,["disable"])):q("",!0),r(P,{disable:u.isFirstPage,color:"grey-8",dense:"",flat:"",icon:"chevron_left",round:"",onClick:f=>F(u.pagination.page<=1?1:u.pagination.page-1)},null,8,["disable","onClick"]),r(P,{disable:u.isLastPage,color:"grey-8",dense:"",flat:"",icon:"chevron_right",round:"",onClick:f=>u.pagination.page>=t.value?t.value:F(u.pagination.page+1)},null,8,["disable","onClick"]),u.pagesNumber>2?(c(),b(P,{key:1,disable:u.isLastPage,color:"grey-8",dense:"",flat:"",icon:"last_page",round:"",onClick:d[1]||(d[1]=f=>F(t.value))},null,8,["disable"])):q("",!0)]),key:"0"}:void 0]),1032,["columns","loading","pagination","rows","rows-per-page-options"]))]))}});var fe=Q(_e,[["__scopeId","data-v-6d1cb1bf"]]);const be=v=>(G("data-v-2744b738"),v=v(),H(),v),ye={class:"add"},Ce=be(()=>w("p",{class:"add__text"},"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430",-1)),Pe=["textContent"],Ae=N({__name:"AddAdmin",emits:["add-admin"],setup(v,{emit:A}){const p=A,a=o(""),s=o(""),l=o(""),t=o(!1),e=o(""),_=()=>{e.value="",!(!a.value||!s.value||t.value||!l.value)&&(t.value=!0,E.addAdmin({name:a.value,email:s.value,password:l.value},n=>{t.value=!1,p("add-admin"),console.log(n),a.value="",s.value="",l.value="",R.create({message:"\u263A\uFE0F \u0410\u0434\u043C\u0438\u043D \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D",color:"positive",timeout:1500})},n=>{var m;t.value=!1,console.log(n),e.value=(m=n==null?void 0:n.message[0])!=null?m:"\u0427\u0442\u043E \u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u0432\u0435\u0434\u0435\u043D\u043D\u044B\u0435 \u0432\u0430\u043C\u0438 \u0434\u0430\u043D\u043D\u044B\u0435"}))};return(n,m)=>(c(),x("div",ye,[Ce,r(V,{modelValue:a.value,"onUpdate:modelValue":m[0]||(m[0]=y=>a.value=y),modelModifiers:{trim:!0},disable:t.value,error:!!e.value,class:"add__input",dense:"",label:"\u0418\u043C\u044F",outlined:""},null,8,["modelValue","disable","error"]),r(V,{modelValue:s.value,"onUpdate:modelValue":m[1]||(m[1]=y=>s.value=y),modelModifiers:{trim:!0},disable:t.value,error:!!e.value,class:"add__input",dense:"",label:"Email",outlined:"",onKeyup:z(_,["enter"])},null,8,["modelValue","disable","error"]),r(V,{modelValue:l.value,"onUpdate:modelValue":m[2]||(m[2]=y=>l.value=y),modelModifiers:{trim:!0},disable:t.value,error:!!e.value,class:"add__input",dense:"",label:"\u041F\u0430\u0440\u043E\u043B\u044C",outlined:"",type:"password"},null,8,["modelValue","disable","error"]),r(P,{disable:t.value||!a.value||!s.value||!l.value,class:"add__button full-width q-mt-sm",color:"primary",label:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",standout:"",unelevated:"",onClick:re(_,["stop"]),onKeyup:z(_,["enter"])},null,8,["disable"]),w("p",{class:"text-negative",textContent:$(e.value)},null,8,Pe)]))}});var ke=Q(Ae,[["__scopeId","data-v-2744b738"]]);const we=v=>(G("data-v-0db3b3b7"),v=v(),H(),v),he=we(()=>w("h2",{class:"card__title",textContent:"\u0410\u0434\u043C\u0438\u043D\u044B"},null,-1)),xe={class:"admins"},Ee=N({__name:"AdminPage",setup(v){const A=o([]),p=o({currentPage:1,perPageCount:10,total:10}),a=o(!1),s=o(!1),l=async t=>{a.value=!0,await E.getAdmins({currentPage:t},e=>{A.value=e.data,p.value={currentPage:e.currentPage,perPageCount:e.perPageCount,total:e.total},s.value=!1,a.value=!1},e=>{a.value=!1,console.log(e)})};return O(async()=>{s.value=!0,await l(1)}),(t,e)=>(c(),b(ue,{class:"row justify-evenly items-start q-pa-lg"},{default:g(()=>[r(te,{class:"card"},{default:g(()=>[r(le,null,{default:g(()=>[he,w("div",xe,[s.value?(c(),b(ge,{key:0,title:"\u0430\u0434\u043C\u0438\u043D\u044B"})):(c(),b(fe,{key:p.value,list:A.value,loading:a.value,pagination:p.value,onUpdate:e[0]||(e[0]=_=>l(p.value.currentPage)),onSelectPage:e[1]||(e[1]=_=>l(_))},null,8,["list","loading","pagination"])),r(ke,{onAddAdmin:e[2]||(e[2]=_=>l(p.value.currentPage))})])]),_:1})]),_:1})]),_:1}))}});var Me=Q(Ee,[["__scopeId","data-v-0db3b3b7"]]);export{Me as default};
