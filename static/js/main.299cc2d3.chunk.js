(this["webpackJsonpfirmware-wizard"]=this["webpackJsonpfirmware-wizard"]||[]).push([[0],{135:function(e,t,a){},187:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(12),s=a.n(i),l=(a(135),a(111)),o=a(13),c=(a(88),a(113)),d=a(244),u=a(245),p=a(16),m=a(107),b=a.n(m),j=a(219),h=a(222),g=a(118),f=a(246),O=a(223),v=a(114),x=a(250),y=a(248),k=a(28),w=a(115),z=a.p+"static/media/logo-white.71a9cf92.svg",S={ca:"Catal\xe0",en:"English",es:"Espa\xf1ol",de:"Deutsch",fr:"Fran\xe7ais",it:"Italiano",no:"Norsk",pl:"Polski",tr:"T\xfcrk\xe7e"},T=a(2),D=function(){var e=Object(k.b)(),t=e.t,a=e.i18n,i=Object(r.useRef)(null),s=n.a.useState(!1),l=Object(p.a)(s,2),o=l[0],c=l[1];return Object(T.jsx)(j.a,{position:"sticky",className:"header",children:Object(T.jsxs)(h.a,{children:[Object(T.jsx)(w.a,{src:z,className:"logo"}),Object(T.jsx)(g.a,{variant:"h5",component:"div",children:t("tr-title")}),Object(T.jsx)("div",{style:{flexGrow:1}}),Object(T.jsxs)(f.a,{position:"relative",children:[Object(T.jsxs)(O.a,{"data-testid":"language-menu-toggle","aria-controls":"language-menu","aria-haspopup":"true",color:"secondary",variant:"contained",onClick:function(){c(!o)},ref:i,children:[Object(T.jsxs)("span",{className:"language-toggle-text",children:[a.language?S[a.language]:"change language"," \xa0"]}),Object(T.jsx)(b.a,{})]}),Object(T.jsx)(v.a,{id:"language-menu","data-testid":"language-menu",open:o,anchorEl:i.current,onClose:function(){return c(!1)},children:Object.keys(S).map((function(e){return Object(T.jsxs)(x.a,{value:e,onClick:function(){return function(e){a.changeLanguage(e)}(e)},"data-testid":"locale-".concat(e),children:[Object(T.jsx)(y.a,{size:"small",checked:a.language===e})," ",t(S[e])]},e)}))})]})]})})},P=a(243),F=a(188),C=a(242),_=a(81),B=a(33),W=a.n(B),q=a(46),E=a(251),I=a(229),L=a(247),A=a(47),M=a.n(A),N=a(58),V=a(108),R=function(e){return e.title||"".concat(e.vendor," ").concat(e.model)},U={},H=function(e){var t=e.selectedVersion,a=e.onProfileChange,n=Object(r.useState)([]),i=Object(p.a)(n,2),s=i[0],l=i[1],o=Object(r.useState)(!0),c=Object(p.a)(o,2),d=c[0],u=c[1],m=Object(k.b)().t,b=Object(r.useCallback)(Object(q.a)(W.a.mark((function e(){var a,r,n,i;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=U[t],r=[],u(!0),a){e.next=10;break}return n="".concat("/openwrt-firmware-selector","/data/").concat(t,"/overview.json"),e.next=7,M.a.get(n);case 7:i=e.sent,a=i.data,U[t]=a;case 10:return u(!1),a.profiles.forEach((function(e){e.titles.forEach((function(t){var a=R(t);r.push({value:e,search:e.id+a,title:a})}))})),e.abrupt("return",r);case 13:case"end":return e.stop()}}),e)}))),[t]);Object(r.useEffect)((function(){b().then((function(e){Object(N.isEqual)(e,s)||l(e)}))}),[b,s,t]);return d?Object(T.jsx)(I.a,{}):Object(T.jsx)(L.a,{"data-testid":"search-autocomplete",options:s,getOptionLabel:function(e){return e.title},renderInput:function(e){return Object(T.jsx)(E.a,Object(_.a)(Object(_.a)({},e),{},{fullWidth:!0,variant:"outlined",label:m("tr-model")}))},filterOptions:function(e,t){var a=t.inputValue;return Object(N.throttle)((function(){var t;return Object(V.a)(e,(null===(t=a.replaceAll)||void 0===t?void 0:t.call(a," ",""))||a,{keys:["search"]}).slice(0,10)}),1e3)()||[]},onChange:function(e,t){t&&a(t.value)}})},K=a(228),G=a(253),Z=a(249),Y={show_help:!0,versions:{"19.07.7":"data/19.07.7",SNAPSHOT:"data/SNAPSHOT"},default_version:"19.07.7",image_url:"https://downloads.openwrt.org/releases/{version}/targets/{target}",info_url:"https://openwrt.org/start?do=search&id=toh&q={title}",asu_url:"https://chef.libremesh.org"},J=function(e){var t=e.selectedVersion,a=e.onVersionChange,r=Y.versions,n=Object(k.b)().t;return Object(T.jsxs)(K.a,{fullWidth:!0,variant:"outlined",children:[Object(T.jsx)(G.a,{id:"version-select-label",children:n("tr-version")}),Object(T.jsx)(Z.a,{labelWidth:60,labelId:"version-select-label",value:t,onChange:function(e){var t=e.target.value;a(t)},"data-testid":"version-select",children:Object.keys(r).map((function(e){return Object(T.jsx)(x.a,{value:e,children:e},e)}))})]})},Q=a(80),X=a(230),$=a(231),ee=a(232),te=a(233),ae=a(234),re=a(235),ne=a(236),ie=a(238),se=a(254),le=a(226),oe=a(240),ce=a(225),de=a(237),ue=a(239),pe=a(241),me=a(61),be={buildNew:function(e,t,a){return M.a.post("".concat(Y.asu_url,"/api/build"),{version:a,profile:t,packages:e,diff_packages:!0})},checkBuild:function(e){return M.a.get("".concat(Y.asu_url,"/api/build/").concat(e))}};function je(e){return new Promise((function(t){return setTimeout(t,e)}))}var he={build:function(){var e=Object(q.a)(W.a.mark((function e(t,a,r,n){var i,s;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,be.buildNew(t,a,r);case 2:202===(i=e.sent).status&&n("#".concat(i," in queue"));case 4:return e.next=7,be.checkBuild(i.data.request_hash);case 7:if(200!==(s=e.sent).status){e.next=12;break}return e.abrupt("return",s.data);case 12:202===s.status&&("queued"===s.data.status?n("#".concat(i," in queue")):"started"===s.data.status&&n("Building the image"));case 13:return e.next=15,je(5e3);case 15:e.next=4;break;case 17:case"end":return e.stop()}}),e)})));return function(t,a,r,n){return e.apply(this,arguments)}}()},ge=Object(X.a)((function(){return{chip:{"&:focus":{border:"2px solid #000"}}}})),fe={},Oe=function(e){var t,a,n,i,s,l=e.selectedVersion,o=e.selectedProfile,c=ge(),d=Object(r.useState)(),u=Object(p.a)(d,2),m=u[0],b=u[1],j=Object(r.useState)(!1),h=Object(p.a)(j,2),v=h[0],x=h[1],y=Object(r.useState)(new Set),w=Object(p.a)(y,2),z=w[0],S=w[1],D=Object(r.useState)(""),P=Object(p.a)(D,2),F=P[0],_=P[1],B=Object(r.useState)(!1),E=Object(p.a)(B,2),L=E[0],A=E[1],V=Object(r.useState)(),U=Object(p.a)(V,2),H=U[0],Z=U[1],J=Object(r.useState)(),X=Object(p.a)(J,2),be=X[0],je=X[1],Oe=Object(r.useState)(),ve=Object(p.a)(Oe,2),xe=ve[0],ye=ve[1],ke=Object(k.b)().t,we=function(e){var t=e.toLowerCase();return t.includes("sysupgrade")?"sysupgrade-help":t.includes("factory")||"trx"===t||"chk"===t?"factory-help":t.includes("kernel")||t.includes("zimage")||t.includes("uimage")?"kernel-help":t.includes("root")?"rootfs-help":t.includes("sdcard")?"sdcard-help":t.includes("tftp")?"tftp-help":"other-help"},ze=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m;return Array.from(new Set([].concat(Object(Q.a)((null===e||void 0===e?void 0:e.default_packages)||[]),Object(Q.a)((null===e||void 0===e?void 0:e.device_packages)||[]))))},Se=Object(r.useCallback)(Object(q.a)(W.a.mark((function e(){var t,a;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=fe[o.id]){e.next=7;break}return e.next=4,M.a.get("".concat("/openwrt-firmware-selector","/data/").concat(l)+"/".concat(o.target,"/").concat(o.id,".json"));case 4:a=e.sent,t=a.data,fe[o.id]=t;case 7:return e.abrupt("return",t);case 8:case"end":return e.stop()}}),e)}))),[l,o]);Object(r.useEffect)((function(){var e=!0;return Se().then((function(t){e&&!Object(N.isEqual)(m,t)&&(b(t),S(new Set(ze(t))))})),function(){e=!1}}),[l,o,Se,m]);var Te=function(e){(e&&"Enter"===e.key||!e)&&F&&(S((function(e){var t,a;return A(!1),(null===m||void 0===m||null===(t=m.device_packages)||void 0===t?void 0:t.includes(F))||(null===m||void 0===m||null===(a=m.default_packages)||void 0===a?void 0:a.includes(F))?(A(!0),e):new Set(e.add(F))})),_(""))},De=function(e){Z(e)};if(!m)return Object(T.jsx)(I.a,{});var Pe=function(){var e=Object(q.a)(W.a.mark((function e(){var t;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Z("Please wait..."),e.prev=1,e.next=4,he.build(Array.from(z.values()),m.id,m.version_number,De);case 4:t=e.sent,je(t),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0),ye(e.t0.response.data.message);case 12:Z(void 0);case 13:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}(),Fe=me.DateTime.fromFormat(m.build_at,"yyyy-MM-dd TT").toLocaleString(me.DateTime.DATETIME_MED),Ce=Object.keys(Y).includes("asu_url"),_e=!Object(N.isEqual)(Array.from(z.values()),ze());return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(f.a,{paddingTop:3,paddingBottom:2,children:Object(T.jsx)(g.a,{variant:"h5",component:"h3",align:"left",children:ke("tr-version-build")})}),Object(T.jsx)($.a,{children:Object(T.jsx)(ee.a,{children:Object(T.jsxs)(te.a,{children:[Object(T.jsxs)(ae.a,{children:[Object(T.jsx)(re.a,{children:ke("tr-model")}),Object(T.jsx)(re.a,{id:"title",children:null===(t=m.titles)||void 0===t?void 0:t.map((function(e){return R(e)})).join(", ")})]}),Object(T.jsxs)(ae.a,{children:[Object(T.jsx)(re.a,{children:ke("tr-target")}),Object(T.jsx)(re.a,{id:"target",children:m.target})]}),Object(T.jsxs)(ae.a,{children:[Object(T.jsx)(re.a,{children:ke("tr-version")}),Object(T.jsxs)(re.a,{children:[m.version_number," (",m.version_code,")"]})]}),Object(T.jsxs)(ae.a,{children:[Object(T.jsx)(re.a,{children:ke("tr-date")}),Object(T.jsx)(re.a,{children:Fe.toLocaleString()})]}),Object(T.jsxs)(ae.a,{children:[Object(T.jsx)(re.a,{children:"Info"}),Object(T.jsx)(re.a,{children:null===(a=m.titles)||void 0===a?void 0:a.map((function(e){var t=R(e),a=Y.info_url.replace("{title}",encodeURI(t));return Object(T.jsxs)(ne.a,{href:a,children:[m.titles.length>1&&Object(T.jsx)(g.a,{component:"span",children:t}),Object(T.jsx)(de.a,{style:{marginLeft:10,verticalAlign:"middle"}})]},t)})).reduce((function(e,t,a){return[e,Object(T.jsx)(f.a,{display:"inline-block",marginRight:2},a),t]}))})]})]})})}),Object(T.jsx)(f.a,{paddingTop:3,paddingBottom:2,children:Object(T.jsx)(g.a,{variant:"h5",component:"h3",align:"left",children:ke("tr-downloads")})}),Object(T.jsx)($.a,{children:Object(T.jsxs)(ee.a,{children:[Object(T.jsx)(ie.a,{children:Object(T.jsxs)(ae.a,{children:[Object(T.jsx)(re.a,{children:"Download link"}),Object(T.jsx)(re.a,{children:"Help Text"})]})}),Object(T.jsx)(te.a,{children:null===(n=m.images)||void 0===n?void 0:n.map((function(e){var t="".concat(Y.image_url.replace("{target}",m.target).replace("{version}",m.version_number),"/").concat(e.name);return Object(T.jsxs)(ae.a,{children:[Object(T.jsx)(re.a,{children:Object(T.jsx)(ne.a,{href:t,target:"_blank","data-testid":"download_link",children:Object(T.jsx)(O.a,{endIcon:Object(T.jsx)(ue.a,{}),variant:"contained",color:"primary",children:e.type})})}),Object(T.jsx)(re.a,{children:Object(T.jsxs)(f.a,{p:1,children:[Object(T.jsx)(g.a,{children:ke("tr-".concat(we(e.type)))}),Object(T.jsxs)(g.a,{variant:"caption",children:["sha256sum: ",e.sha256]})]})})]},t+e.type)}))})]})}),Object(T.jsx)(f.a,{paddingTop:3,paddingBottom:2,children:Object(T.jsx)(g.a,{variant:"h5",component:"h3",align:"left",children:ke("Packages")})}),m.default_packages&&m.default_packages.length>0&&Object(T.jsxs)(f.a,{mb:2,children:[Object(T.jsx)(g.a,{variant:"h6",align:"left",children:ke("Default Packages")}),null===(i=m.default_packages)||void 0===i?void 0:i.join(", ")]}),m.device_packages&&m.device_packages.length>0&&Object(T.jsxs)(f.a,{mb:2,children:[Object(T.jsx)(g.a,{variant:"h6",align:"left",children:ke("Device Packages")}),m.device_packages.join(", ")]}),Ce&&Object(T.jsxs)(f.a,{children:[!v&&Object(T.jsx)(O.a,{variant:"outlined",size:"small",onClick:function(){m&&(x(!v),S(new Set(ze())))},children:"customize packages"}),v&&Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)(g.a,{variant:"h6",align:"left",children:[ke("Customize Packages"),Object(T.jsx)(f.a,{display:"inline-block",ml:2,children:Object(T.jsx)(ne.a,{href:"https://openwrt.org/packages/table/start",target:"_blank",children:Object(T.jsx)(g.a,{variant:"caption",children:"find packages index on this page"})})})]}),Object(T.jsx)("br",{}),Array.from(z.values()).map((function(e){var t,a=null===(t=m.default_packages)||void 0===t?void 0:t.includes(e);return Object(T.jsx)(f.a,{pr:1,pb:1,display:"inline-block",children:Object(T.jsx)(se.a,{size:"small",label:e,color:a?"default":"primary",className:c.chip,onDelete:a?void 0:function(){return S((function(t){var a=new Set(Array.from(t.values()));return a.delete(e),a}))}})},e)})),Object(T.jsx)("br",{}),Object(T.jsxs)(K.a,{size:"small",children:[Object(T.jsx)(G.a,{style:{fontSize:"0.9em"},children:"Custom Package Name"}),Object(T.jsx)(le.a,{value:F,onChange:function(e){return e&&_(e.currentTarget.value)},onKeyUp:Te,endAdornment:Object(T.jsx)(oe.a,{position:"end",children:Object(T.jsx)(ce.a,{size:"small",onClick:function(){return Te()},children:Object(T.jsx)(pe.a,{})})})})]}),L&&Object(T.jsx)(f.a,{pt:2,children:Object(T.jsx)(g.a,{color:"error",variant:"caption",component:"div",children:"This profile already includes this package. Please try a diffrent one"})}),Object(T.jsxs)(f.a,{mt:3,children:[!H&&Object(T.jsx)(O.a,{variant:"contained",color:"primary",disabled:!_e,onClick:Pe,children:"build customized image"}),H&&Object(T.jsx)(T.Fragment,{children:Object(T.jsxs)(C.a,{container:!0,alignContent:"center",direction:"row",alignItems:"center",spacing:2,children:["string"===typeof H&&Object(T.jsx)(C.a,{item:!0,children:Object(T.jsx)(I.a,{})}),Object(T.jsx)(C.a,{item:!0,children:H})]})})]})]}),xe&&Object(T.jsx)(g.a,{color:"error",children:xe}),be&&Object(T.jsxs)(f.a,{mt:3,children:[Object(T.jsx)(g.a,{variant:"h5",children:"Built Image:"}),Object(T.jsx)(ee.a,{children:Object(T.jsx)(te.a,{children:Object(T.jsxs)(ae.a,{children:[Object(T.jsx)(re.a,{children:"Build At"}),Object(T.jsx)(re.a,{id:"title",children:me.DateTime.fromFormat(be.build_at.substr(0,25),"ccc, dd MMM yyyy TT",{zone:be.build_at.substr(26),setZone:!0}).toLocaleString(me.DateTime.DATETIME_MED)})]})})}),Object(T.jsx)("br",{}),Object(T.jsx)("br",{}),Object(T.jsxs)(ee.a,{children:[Object(T.jsx)(ie.a,{children:Object(T.jsxs)(ae.a,{children:[Object(T.jsx)(re.a,{children:"Download link"}),Object(T.jsx)(re.a,{children:"Help Text"})]})}),Object(T.jsx)(te.a,{children:null===(s=be.images)||void 0===s?void 0:s.map((function(e){var t="".concat(Y.image_url.replace("{target}",m.target).replace("{version}",m.version_number),"/").concat(e.name);return Object(T.jsxs)(ae.a,{children:[Object(T.jsx)(re.a,{children:Object(T.jsx)(ne.a,{href:t,target:"_blank","data-testid":"download_link",children:Object(T.jsx)(O.a,{endIcon:Object(T.jsx)(ue.a,{}),variant:"contained",color:"primary",children:e.type})})}),Object(T.jsx)(re.a,{children:Object(T.jsxs)(f.a,{p:1,children:[Object(T.jsx)(g.a,{children:ke("tr-".concat(we(e.type)))}),Object(T.jsxs)(g.a,{variant:"caption",children:["sha256sum: ",e.sha256]})]})})]},t+e.type)}))})]})]})]})]})},ve=function(){var e=Object(r.useState)(Object.keys(Y.versions)[0]),t=Object(p.a)(e,2),a=t[0],n=t[1],i=Object(r.useState)(),s=Object(p.a)(i,2),l=s[0],o=s[1],c=Object(k.b)().t;return Object(T.jsx)(P.a,{children:Object(T.jsx)(f.a,{paddingY:4,children:Object(T.jsx)(F.a,{children:Object(T.jsxs)(f.a,{padding:3,children:[Object(T.jsx)(f.a,{paddingBottom:2,children:Object(T.jsx)(g.a,{variant:"h4",component:"h1",align:"left",children:c("tr-load")})}),Object(T.jsx)(f.a,{paddingBottom:2,children:Object(T.jsx)(g.a,{variant:"h6",component:"h2",align:"left",children:c("tr-message")})}),Object(T.jsxs)(C.a,{container:!0,spacing:2,children:[Object(T.jsx)(C.a,{item:!0,xs:!0,children:Object(T.jsx)(H,{selectedVersion:a,onProfileChange:o,"data-testid":"profile-search"})}),Object(T.jsx)(C.a,{item:!0,xs:3,children:Object(T.jsx)(J,{"data-testid":"version-selector",selectedVersion:a,onVersionChange:n})})]}),l&&Object(T.jsx)(f.a,{children:Object(T.jsx)(Oe,{selectedProfile:l,selectedVersion:a})})]})})})})},xe=function(){return Object(T.jsx)(P.a,{style:{marginTop:"50px"},children:Object(T.jsx)(F.a,{elevation:3,children:Object(T.jsxs)(f.a,{padding:3,children:[Object(T.jsx)(g.a,{variant:"h5",component:"h3",children:"404 Page Not Found"}),Object(T.jsxs)(g.a,{component:"p",children:["Please head to the ",Object(T.jsx)(ne.a,{href:"/openwrt-firmware-selector",children:"home"}),"."]})]})})})},ye=function(){return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(h.a,{hidden:!0}),Object(T.jsxs)(F.a,{elevation:4,className:"report-problem-container",children:[Object(T.jsxs)("span",{children:["If you come across any issue, feel free to report"," ",Object(T.jsx)("a",{href:"https://github.com/aparcar/attendedsysupgrade-server/issues",children:"here"}),"."]}),Object(T.jsxs)("span",{className:"report-link",children:["For contributions, go to"," ",Object(T.jsx)("a",{href:"https://github.com/sudhanshu16/openwrt-firmware-selector/",children:"Github"})]})]})]})},ke=Object(c.a)({palette:{primary:{main:"#00B5E2",contrastText:"#ffffff"},secondary:{main:"#212322"}},typography:{h1:{fontWeight:600},h2:{fontWeight:600},h3:{fontWeight:600},h4:{fontWeight:600},h5:{fontWeight:600},h6:{fontWeight:600},fontFamily:["Open Sans","-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",,].join(",")}}),we=function(){return Object(T.jsx)(d.a,{theme:ke,children:Object(T.jsx)(n.a.Suspense,{fallback:Object(T.jsx)(u.a,{}),children:Object(T.jsxs)("div",{className:"App",children:[Object(T.jsx)(D,{}),Object(T.jsx)(l.a,{children:Object(T.jsxs)(o.c,{children:[Object(T.jsx)(o.a,{path:"",exact:!0,component:ve}),Object(T.jsx)(o.a,{component:xe})]})}),Object(T.jsx)(ye,{})]})})})},ze=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,256)).then((function(t){var a=t.getCLS,r=t.getFID,n=t.getFCP,i=t.getLCP,s=t.getTTFB;a(e),r(e),n(e),i(e),s(e)}))},Se=a(79),Te=a(112),De=a.n(Te),Pe={ca:{"tr-load":"Descarregueu el microprogramari OpenWrt per al vostre dispositiu","tr-title":"Selector de microprogramari","tr-message":'Introdu\xefu el nom o el model del vostre dispositiu i seleccioneu la versi\xf3 estable (per defecte) o la darrera imatge compilada ("snapshot")',"tr-version-build":"Compilaci\xf3","tr-custom-build":"Compilaci\xf3 personalitzada","tr-customize":"Personalitzar","tr-request-build":"Demanar la compilaci\xf3","tr-model":"Model","tr-target":"Plataforma","tr-version":"Versi\xf3","tr-date":"Data","tr-downloads":"Desc\xe0rregues","tr-custom-downloads":"Desc\xe0rregues personalitzades","tr-factory-help":'Empreu la imatge "factory" per instal\xb7lar OpenWrt a un dispositius per primera vegada. Normalment ho podreu fer trav\xe9s de la interf\xedcie web del microprogramari original.',"tr-sysupgrade-help":'Empreu la imatge "sysupgrade" per actualitzar un dispositiu que ja tingui OpenWrt instal\xb7lat. La imatge es pot instal\xb7lar a trav\xe9s de la interf\xedcie web LuCI o del terminal.',"tr-kernel-help":"El nucli de Linux en una imatge separada.","tr-rootfs-help":"El sistema de fitxers arrel en una imatge separada.","tr-sdcard-help":"Una imatge feta per escriure-la a una targeta SD.","tr-tftp-help":"Les imatges TFTP images es fan servir per instal\xb7lar-les a un dispositiu mitjan\xe7ant el m\xe8tode TFTP del carregador d'arrencada.","tr-other-help":"Un altre tipus d'imatge.","tr-build-successful":"La compilaci\xf3 ha tingut \xe8xit","tr-build-failed":"La compilaci\xf3 ha fallat","tr-request-image":"Demanar la imatge","tr-check-again":"Proveu de nou d'aqu\xed 5 segons..."},en:{"tr-server-link":"Files","tr-notfound":"No model found!","tr-load":"Download OpenWrt Firmware for your Device","tr-title":"Firmware Selector","tr-message":"Type the name or model of your device, then select the recommended build or some other.","tr-version-build":"About this build","tr-custom-build":"Custom Build","tr-customize":"Customize","tr-request-build":"Request Build","tr-model":"Model","tr-target":"Platform","tr-version":"Version","tr-date":"Date","tr-downloads":"Download an image","tr-custom-downloads":"Custom Downloads","tr-factory-help":"Use a Factory image to flash a router with OpenWrt for the first time. You normally do this via the web interface of the original firmware.","tr-sysupgrade-help":"Use a Sysupgrade image to update a router that already runs OpenWrt. The image can be used with the LuCI web interface or the terminal.","tr-kernel-help":"Linux kernel as a separate image.","tr-rootfs-help":"Root file system as a separate image.","tr-sdcard-help":"Image that is meant to be flashed onto a SD-Card.","tr-tftp-help":"TFTP images are used to flash a device via the TFTP method of the bootloader.","tr-other-help":"Other image type.","tr-build-successful":"Build successful","tr-build-failed":"Build failed","tr-request-image":"Request image","tr-check-again":"Check again in 5 seconds..."},es:{"tr-notfound":"\xa1Modelo no encontrado!","tr-load":"Descargue el firmware OpenWrt para su dispositivo","tr-title":"Selector de firmware","tr-message":"Escriba el nombre o modelo de su dispositivo, luego seleccione la versi\xf3n recomendada o alguna otra.","tr-version-build":"Acerca de esta compilaci\xf3n","tr-custom-build":"Compilaci\xf3n personalizada","tr-customize":"Personalizar","tr-request-build":"Solicitar compilaci\xf3n","tr-model":"Modelo","tr-target":"Plataforma","tr-version":"Versi\xf3n","tr-date":"Date","tr-downloads":"Descargar una imagen","tr-custom-downloads":"Descargas personalizadas","tr-factory-help":"Utilice una imagen factory para instalar OpenWrt en un enrutador por primera vez. Normalmente se hace a trav\xe9s de la interfaz web del firmware original.","tr-sysupgrade-help":"Utilice una imagen sysupgrade para actualizar un enrutador que ya ejecuta OpenWrt. La imagen se puede utilizar con la interfaz web de LuCI o el terminal.","tr-kernel-help":"Kernel de Linux como una imagen separada.","tr-rootfs-help":"Sistema de archivos ra\xedz como una imagen separada.","tr-sdcard-help":"Imagen destinada a flashear en una tarjeta SD.","tr-tftp-help":"Las im\xe1genes TFTP se utilizan para actualizar un dispositivo mediante el m\xe9todo TFTP del gestor de arranque.","tr-other-help":"Otro tipo de imagen.","tr-build-successful":"Compilaci\xf3n exitosa","tr-build-failed":"Compilaci\xf3n fallida","tr-request-image":"Solicitar imagen","tr-check-again":"Vuelva a comprobar en 5 segundos..."},no:{"tr-load":"Last ned OpenWrt fastvare for din enhet!","tr-title":"fastvare utvelger","tr-message":"Bruk feltene nedenfor for \xe5 laste ned fastvare til enheten din!","tr-version-build":"Sammensetning","tr-custom-build":"Tilpasset sammensetning","tr-customize":"Tilpasse","tr-request-build":"Be om sammensetning","tr-model":"Modell","tr-target":"Platform","tr-version":"Versjon","tr-date":"Dato","tr-downloads":"Nedlastninger","tr-custom-downloads":"Tilpassede nedlastninger","tr-factory-help":"Factory avbildningen er for \xe5 laste rutere med OpenWrt f\xf8rste gang. Vanligvis via webgrensesnittet til den originale fastvaren.","tr-sysupgrade-help":"Sysupgrade avbildningen er for rutere som allerede benytter OpenWrt. Avbildningen innstaleres gjennom webgrensesnittet eller terminalen.","tr-kernel-help":"Linux kjernen som en egen avbildning.","tr-rootfs-help":"Rotfilsystem som en egen avbildning.","tr-sdcard-help":"Avbildning som er ment for et SD-kort.","tr-tftp-help":"TFTP avbildninger er for \xe5 laste enheter via TFTP metoden i oppstartsprosedyren.","tr-other-help":"Andre avbildningstyper.","tr-build-successful":"Vellykket sammensetning","tr-build-failed":"Sammensetningen feilet","tr-request-image":"Be om avbildning","tr-check-again":"Sjekk p\xe5nytt om 5 sekunder..."},de:{"tr-server-link":"Dateien","tr-notfound":"Kein Model gefunden!","tr-load":"Lade die OpenWrt Firmware f\xfcr dein Ger\xe4t!","tr-title":"Firmware Selector","tr-message":"Bitte benutze die Eingabe um die passende Firmware zu finden!","tr-version-build":"Release Build","tr-custom-build":"Custom Build","tr-customize":"Customize","tr-request-build":"Request Build","tr-model":"Model","tr-target":"Target","tr-version":"Version","tr-date":"Datum","tr-downloads":"Downloads","tr-custom-downloads":"Custom Downloads","tr-factory-help":"Factory Abbilder werden \xfcber die Weboberfl\xe4che der originalen Firmware eingespielt.","tr-sysupgrade-help":"Sysupgrade Abbilder werden f\xfcr Ger\xe4te verwendet, die bereits OpenWrt laufen haben. Es ist m\xf6glich, existierende Einstellungen beizubehalten.","tr-kernel-help":"Linux Kernel als separates Abbild.","tr-rootfs-help":"Das Root Dateisystem als separates Abbild.","tr-sdcard-help":"Image f\xfcr SD Speicherkarten.","tr-tftp-help":"TFTP Dateien k\xf6nnen verwendet werden, um ein Ger\xe4t \xfcber die TFTP Method des Bootloader zu flashen.","tr-other-help":"Sonstiger Imagetyp.","tr-build-successful":"Build erfolgreich","tr-build-failed":"Build fehlgeschlagen","tr-request-image":"Frage nach image","tr-check-again":"Nochmal nachfragen in 5 Sekunden..."},fr:{"tr-load":"T\xe9l\xe9charger le firmware OpenWrt de votre p\xe9riph\xe9rique !","tr-title":"S\xe9lecteur de Firmware","tr-message":"Utiliser les entr\xe9es ci-dessous pour t\xe9l\xe9charger le firmware de votre p\xe9riph\xe9rique !","tr-version-build":"Build","tr-custom-build":"Build Personnalis\xe9","tr-customize":"Personnalisation","tr-request-build":"Requ\xeate de Build","tr-model":"Mod\xe8le","tr-target":"Platform","tr-version":"Version","tr-date":"Date","tr-downloads":"T\xe9l\xe9chargements","tr-custom-downloads":"T\xe9l\xe9chargements Personnalus\xe9s","tr-factory-help":"Les images Factory sont pr\xe9vues pour flasher les routers avec OpenWrt pour la premi\xe8re fois. Habituellement \xe0 partir de l'interface web du firmware d'origine.","tr-sysupgrade-help":"Les images Sysupgrade sont pr\xe9vues pour flasher les routers fonctionnant d\xe9j\xe0 avec OpenWrt. L'image peut \xeatre install\xe9e \xe0 travers l'interface web ou par le terminal.","tr-kernel-help":"Linux kernel comme image s\xe9par\xe9e.","tr-rootfs-help":"Root file system comme image s\xe9par\xe9e.","tr-sdcard-help":"Image pr\xe9vue pour \xeatre flash\xe9e sur une carte SD.","tr-tftp-help":"TFTP images pr\xe9vues pour flasher le p\xe9riph\xe9rique via le d\xe9marrage par m\xe9thode TFTP.","tr-other-help":"Autre type d'image.","tr-build-successful":"Succ\xe8s du Build","tr-build-failed":"\xc9chec du Build","tr-request-image":"Demade d'image","tr-check-again":"Essayer \xe0 nouveau dans 5 secondes..."},it:{"tr-load":"Scarica il firmware OpenWrt per il tuo dispositivo!","tr-title":"Firmware Selector","tr-message":"Usa la casella sottostante per scaricare il firmware per il tuo dispositivo!","tr-version-build":"Build","tr-custom-build":"Custom Build","tr-customize":"Personalizza","tr-request-build":"Richiedi Build","tr-model":"Modell","tr-target":"Platform","tr-version":"Version","tr-date":"Data","tr-downloads":"Downloads","tr-custom-downloads":"Download Personalizzati","tr-factory-help":"Factory Image sono usate per installare OpenWrt su router per la prima volta. Di solito l'immagine pu\xf2 essere applicata via l'interfaccia web del firmware originale.","tr-sysupgrade-help":"Sysupgrade Image sono usate per flashare router in cui OpenWrt \xe8 gi\xe0 installato. L'immagine pu\xf2 essere applicata via interfaccia web o terminale.","tr-kernel-help":"Linux kernel come immagine separata.","tr-rootfs-help":"Root file system come immagine separata.","tr-sdcard-help":"Immagine da flashare su scheda SD-Card separata.","tr-tftp-help":"Immagini TFTP images sono usate per flashare un dispositivo con il metodo TFTP del bootloader.","tr-other-help":"Other image type.","tr-build-successful":"Build compilata con successo","tr-build-failed":"Build fallita","tr-request-image":"Richiedi immagine","tr-check-again":"Prova di nuovo in 5 secondi..."},pl:{"tr-server-link":"Pliki","tr-notfound":"Nie znaleziono modelu!","tr-load":"Pobieranie oprogramowania OpenWrt","tr-title":"Firmware Selector","tr-message":"Wprowad\u017a nazw\u0119 lub model swojego urz\u0105dzenia, a nast\u0119pnie wybierz wersj\u0119 zalecan\u0105 lub inn\u0105.","tr-version-build":"Informacje o obrazie","tr-custom-build":"Informacje o zmodyfikowanym obrazie","tr-customize":"Modyfikacja","tr-request-build":"\u017b\u0105danie budowy obrazu","tr-model":"Model","tr-target":"Platforma","tr-version":"Wersja","tr-date":"Data","tr-downloads":"Obrazy do pobrania","tr-custom-downloads":"Zmodyfikowane obrazy do pobrania","tr-factory-help":"U\u017cyj obrazu factory do pierwszej instalacji OpenWrt. Zwykle mo\u017cna go u\u017cy\u0107 wykorzystuj\u0105c interfejs graficzny oryginalnego oprogramowania.","tr-sysupgrade-help":"U\u017cyj obrazu sysuprade do aktualizacji routera z zainstalowanym ju\u017c OpenWrt. Obraz mo\u017cna u\u017cy\u0107 przez interfejs graficzny LuCI lub konsol\u0119.","tr-kernel-help":"Osobny obraz z kernelem linuksowym.","tr-rootfs-help":"Osobny obraz z systemem plik\xf3w.","tr-sdcard-help":"Obraz do wgrania na kart\u0119 SD.","tr-tftp-help":"Obraz TFTP s\u0142u\u017c\u0105cy do aktualizacji urz\u0105dzenia z wykorzystaniem metody TFTP bootloadera.","tr-other-help":"Inny typ obrazu.","tr-build-successful":"Budowanie zako\u0144czone pomy\u015blnie","tr-build-failed":"B\u0142\u0105d budowania","tr-request-image":"\u017b\u0105danie obrazu","tr-check-again":"Sprawd\u017a ponownie za 5 sekund..."},tr:{"tr-load":"Cihaz\u0131n\u0131z i\xe7in OpenWrt yaz\u0131l\u0131m\u0131n\u0131 indirin!","tr-title":"Yaz\u0131l\u0131m Se\xe7icisi","tr-message":'Cihaz\u0131n\u0131z\u0131n ad\u0131n\u0131/modelini girin, ard\u0131ndan Stabil s\xfcr\xfcm\xfc(varsay\u0131lan) veya nightly "snapshot" imajini se\xe7in.',"tr-version-build":"S\xfcr\xfcm","tr-custom-build":"\xd6zel S\xfcr\xfcm","tr-customize":"\xd6zelle\u015ftir","tr-request-build":"S\xfcr\xfcm Olu\u015ftur","tr-model":"Model","tr-target":"Platform","tr-version":"Versiyon","tr-date":"Tarih","tr-downloads":"\u0130ndirmeler","tr-custom-downloads":"\xd6zel \u0130ndirmeler","tr-factory-help":"Bir y\xf6nlendiriciyi OpenWrt ile ilk kez flashlamak i\xe7in bir Fabrika imaji kullan\u0131n. Bu normalde orijinal ayg\u0131t yaz\u0131l\u0131m\u0131n\u0131n web aray\xfcz\xfc arac\u0131l\u0131\u011f\u0131yla yap\u0131l\u0131r.","tr-sysupgrade-help":"Zaten OpenWrt \xe7al\u0131\u015ft\u0131ran bir y\xf6nlendiriciyi g\xfcncellemek i\xe7in bir Sysupgrade imaj\u0131 kullan\u0131n. Imaj, LuCI web aray\xfcz\xfc veya terminal ile kullan\u0131labilir.","tr-kernel-help":"Linux kernel ayr\u0131 bir imaj olarak.","tr-rootfs-help":"K\xf6k Dosya Sistemi ayr\u0131 bir imaj olarak.","tr-sdcard-help":"SD-Kart 'a kurulmas\u0131 planlanan imaj","tr-tftp-help":"TFTP imajlar\u0131, Bootloader '\u0131n TFTP y\xf6ntemi ile bir cihaza kurulmas\u0131 i\xe7in kullan\u0131l\u0131r.","tr-other-help":"Di\u011fer imaj t\xfcr\xfc.","tr-build-successful":"Olu\u015fturma ba\u015far\u0131l\u0131","tr-build-failed":"Olu\u015fturma ba\u015far\u0131s\u0131z","tr-request-image":"Imaj olu\u015ftur","tr-check-again":"5 saniye icinde tekrar dene..."}},Fe={ca:{translation:Pe.ca},en:{translation:Pe.en},es:{translation:Pe.es},de:{translation:Pe.de},fr:{translation:Pe.fr},it:{translation:Pe.it},no:{translation:Pe.no},pl:{translation:Pe.pl},tr:{translation:Pe.tr}};Se.a.use(De.a).use(k.a).init({resources:Fe,fallbackLng:"en",debug:!!Object({NODE_ENV:"production",PUBLIC_URL:"/openwrt-firmware-selector",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_I18N_DEBUG,interpolation:{escapeValue:!1}});Se.a;s.a.render(Object(T.jsx)(n.a.StrictMode,{children:Object(T.jsx)(we,{})}),document.getElementById("root")),ze()},88:function(e,t,a){}},[[187,1,2]]]);
//# sourceMappingURL=main.299cc2d3.chunk.js.map