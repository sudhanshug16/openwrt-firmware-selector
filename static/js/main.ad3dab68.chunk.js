(this["webpackJsonpfirmware-wizard"]=this["webpackJsonpfirmware-wizard"]||[]).push([[0],{125:function(e,t,r){},176:function(e,t,r){"use strict";r.r(t);var a=r(4),n=r(0),i=r.n(n),s=r(12),l=r.n(s),o=(r(125),r(103)),c=r(13),d=(r(82),r(105)),u=r(233),p=r(234),m=r(213),h=r(177),b=r(32),g=r(99),j=r.n(g),f=r(210),O=r(179),v=r(235),y=r(214),x=r(106),w=r(239),k=r(237),z=r(27),S={ca:"Catal\xe0",en:"English",es:"Espa\xf1ol",de:"Deutsch",fr:"Fran\xe7ais",it:"Italiano",no:"Norsk",pl:"Polski",tr:"T\xfcrk\xe7e"},T=function(){var e=Object(z.b)(),t=e.t,r=e.i18n,s=Object(n.useRef)(null),l=i.a.useState(!1),o=Object(b.a)(l,2),c=o[0],d=o[1];return Object(a.jsx)(f.a,{position:"sticky",className:"header",children:Object(a.jsxs)(m.a,{children:[Object(a.jsx)(O.a,{variant:"h6",children:t("tr-title")}),Object(a.jsx)("span",{className:"title-mobile",children:t("tr-title")}),Object(a.jsx)("div",{style:{flexGrow:1}}),Object(a.jsxs)(v.a,{position:"relative",children:[Object(a.jsxs)(y.a,{"aria-controls":"language-menu","aria-haspopup":"true",color:"secondary",variant:"contained",onClick:function(){d(!c)},ref:s,children:[Object(a.jsxs)("span",{className:"language-toggle-text",children:[r.language?S[r.language]:"change language"," \xa0"]}),Object(a.jsx)(j.a,{})]}),Object(a.jsx)(x.a,{id:"language-menu",open:c,anchorEl:s.current,onClose:function(){return d(!1)},children:Object.keys(S).map((function(e){return Object(a.jsxs)(w.a,{value:e,onClick:function(){return function(e){r.changeLanguage(e)}(e)},children:[Object(a.jsx)(k.a,{size:"small",checked:r.language===e})," ",t(S[e])]},e)}))})]})]})})},P=r(230),D=r(231),F=r(75),C=r(55),W=r.n(C),B=r(64),L=r(240),q=r(220),I=r(236),E=r(65),_=r.n(E),V=r(57),N=r(100),R={},A=function(e){var t=e.selectedVersion,r=e.onProfileChange,i=Object(n.useState)([]),s=Object(b.a)(i,2),l=s[0],o=s[1],c=Object(n.useState)(!0),d=Object(b.a)(c,2),u=d[0],p=d[1],m=Object(z.b)().t,h=Object(n.useCallback)(Object(B.a)(W.a.mark((function e(){var r,a,n,i;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=R[t],n=[],p(!0),a){e.next=9;break}return e.next=6,_.a.get("".concat("/openwrt-firmware-selector","/data/").concat(t,"/overview.json"));case 6:i=e.sent,a=i.data,R[t]=a;case 9:return p(!1),null===(r=a.profiles)||void 0===r||r.forEach((function(e){var t;null===(t=e.titles)||void 0===t||t.forEach((function(t){n.push({value:e,search:e.id+t.title,title:t.title||"".concat(t.vendor," ").concat(t.model)})}))})),e.abrupt("return",n);case 12:case"end":return e.stop()}}),e)}))),[t]);Object(n.useEffect)((function(){h().then((function(e){Object(V.isEqual)(e,l)||o(e)}))}),[h,l,t]);return u?Object(a.jsx)(q.a,{}):Object(a.jsx)(I.a,{options:l,getOptionLabel:function(e){return e.title},renderInput:function(e){return Object(a.jsx)(L.a,Object(F.a)(Object(F.a)({},e),{},{fullWidth:!0,variant:"outlined",label:m("tr-model")}))},filterOptions:function(e,t){var r=t.inputValue;return Object(V.throttle)((function(){return Object(N.a)(e,r.replaceAll(" ",""),{keys:["search"]}).slice(0,10)}),1e3)()||[]},onChange:function(e,t){t&&r(t.value)}})},M=r(219),U=r(242),K=r(238),H={show_help:!0,versions:{"19.07.5":"data/19.07.5",SNAPSHOT:"data/SNAPSHOT"},default_version:"19.07.5",image_url:"https://downloads.openwrt.org/releases/{version}/targets/{target}",info_url:"https://openwrt.org/start?do=search&id=toh&q={title}"},G=function(e){var t=e.selectedVersion,r=e.onVersionChange,n=H.versions,i=Object(z.b)().t;return Object(a.jsxs)(M.a,{fullWidth:!0,variant:"outlined",children:[Object(a.jsx)(U.a,{id:"version-select-label",children:i("tr-version")}),Object(a.jsx)(K.a,{labelWidth:60,labelId:"version-select-label",value:t,onChange:function(e){var t=e.target.value;r(t)},children:Object.keys(n).map((function(e){return Object(a.jsx)(w.a,{value:e,children:e},e)}))})]})},Y=r(221),Z=r(222),J=r(223),Q=r(224),X=r(225),$=r(226),ee=r(228),te=r(227),re=r(229),ae=function(e){return e.title||"".concat(e.vendor," ").concat(e.model)},ne={},ie=function(e){var t,r,i=e.selectedVersion,s=e.selectedProfile,l=Object(n.useState)(),o=Object(b.a)(l,2),c=o[0],d=o[1],u=Object(n.useState)(!0),p=Object(b.a)(u,2),m=p[0],h=p[1],g=Object(z.b)().t,j=function(e){var t=e.toLowerCase();return t.includes("sysupgrade")?"sysupgrade-help":t.includes("factory")||"trx"===t||"chk"===t?"factory-help":t.includes("kernel")||t.includes("zimage")||t.includes("uimage")?"kernel-help":t.includes("root")?"rootfs-help":t.includes("sdcard")?"sdcard-help":t.includes("tftp")?"tftp-help":"other-help"},f=Object(n.useCallback)(Object(B.a)(W.a.mark((function e(){var t,r;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=ne[s.id],h(!0),t){e.next=8;break}return e.next=5,_.a.get("".concat("/openwrt-firmware-selector","/data/").concat(i,"/").concat(s.target,"/").concat(s.id,".json"));case 5:r=e.sent,t=r.data,ne[s.id]=t;case 8:return h(!1),e.abrupt("return",t);case 10:case"end":return e.stop()}}),e)}))),[i,s]);if(Object(n.useEffect)((function(){i&&s&&f().then((function(e){Object(V.isEqual)(c,e)||d(e)}))}),[i,s,f,c]),m||!c)return Object(a.jsx)(q.a,{});var x=new Date(c.build_at);return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(v.a,{paddingTop:3,paddingBottom:2,children:Object(a.jsx)(O.a,{variant:"h6",component:"h1",align:"left",children:g("tr-version-build")})}),Object(a.jsx)(Y.a,{children:Object(a.jsx)(Z.a,{children:Object(a.jsxs)(J.a,{children:[Object(a.jsxs)(Q.a,{children:[Object(a.jsx)(X.a,{children:g("tr-model")}),Object(a.jsx)(X.a,{children:null===(t=c.titles)||void 0===t?void 0:t.map((function(e){return ae(e)})).join(", ")})]}),Object(a.jsxs)(Q.a,{children:[Object(a.jsx)(X.a,{children:g("tr-target")}),Object(a.jsx)(X.a,{children:c.target})]}),Object(a.jsxs)(Q.a,{children:[Object(a.jsx)(X.a,{children:g("tr-version")}),Object(a.jsxs)(X.a,{children:[c.version_number," (",c.version_code,")"]})]}),Object(a.jsxs)(Q.a,{children:[Object(a.jsx)(X.a,{children:g("tr-date")}),Object(a.jsx)(X.a,{children:x.toLocaleString()})]}),Object(a.jsxs)(Q.a,{children:[Object(a.jsx)(X.a,{children:"Info"}),c.titles&&Object(a.jsx)(X.a,{children:c.titles.map((function(e){var t=ae(e),r=H.info_url.replace("{title}",encodeURI(t)).replace("{target}",c.target).replace("{id}",c.id).replace("{version}",c.version_number);return Object(a.jsxs)($.a,{href:r,children:[c.titles.length>1&&Object(a.jsx)(O.a,{component:"span",children:t}),Object(a.jsx)(te.a,{style:{marginLeft:10,verticalAlign:"middle"}})]})})).reduce((function(e,t){return[e,Object(a.jsx)(v.a,{display:"inline-block",marginRight:2}),t]}))})]})]})})}),Object(a.jsx)(v.a,{paddingTop:3,paddingBottom:2,children:Object(a.jsx)(O.a,{variant:"h6",component:"h1",align:"left",children:g("tr-downloads")})}),Object(a.jsx)(Y.a,{children:Object(a.jsxs)(Z.a,{children:[Object(a.jsx)(ee.a,{children:Object(a.jsxs)(Q.a,{children:[Object(a.jsx)(X.a,{children:"Download link"}),Object(a.jsx)(X.a,{children:"Help Text"})]})}),Object(a.jsx)(J.a,{children:null===(r=c.images)||void 0===r?void 0:r.map((function(e){var t="".concat(H.image_url.replace("{target}",c.target).replace("{version}",c.version_number),"/").concat(e.name);return Object(a.jsxs)(Q.a,{children:[Object(a.jsx)(X.a,{children:Object(a.jsx)($.a,{href:t,target:"_blank",children:Object(a.jsx)(y.a,{endIcon:Object(a.jsx)(re.a,{}),variant:"contained",color:"primary",children:e.type})})}),Object(a.jsx)(X.a,{children:Object(a.jsxs)(v.a,{p:1,children:[Object(a.jsx)(O.a,{children:g("tr-".concat(j(e.type)))}),Object(a.jsxs)(O.a,{variant:"caption",children:["sha256sum: ",e.sha256]})]})})]})}))})]})})]})},se=function(){var e=Object(n.useState)(Object.keys(H.versions)[0]),t=Object(b.a)(e,2),r=t[0],i=t[1],s=Object(n.useState)(),l=Object(b.a)(s,2),o=l[0],c=l[1],d=Object(z.b)().t;return Object(a.jsx)(P.a,{children:Object(a.jsx)(v.a,{paddingY:4,children:Object(a.jsx)(h.a,{children:Object(a.jsxs)(v.a,{padding:3,children:[Object(a.jsx)(v.a,{paddingBottom:2,children:Object(a.jsx)(O.a,{variant:"h4",component:"h1",align:"left",children:d("tr-load")})}),Object(a.jsx)(v.a,{paddingBottom:2,children:Object(a.jsx)(O.a,{variant:"h6",component:"h2",align:"left",children:d("tr-message")})}),Object(a.jsxs)(D.a,{container:!0,spacing:2,children:[Object(a.jsx)(D.a,{item:!0,xs:!0,children:Object(a.jsx)(A,{selectedVersion:r,onProfileChange:function(e){c(e)}})}),Object(a.jsx)(D.a,{item:!0,xs:3,children:Object(a.jsx)(G,{selectedVersion:r,onVersionChange:function(e){i(e)}})})]}),o&&Object(a.jsx)(v.a,{children:Object(a.jsx)(ie,{selectedProfile:o,selectedVersion:r})})]})})})})},le=r(232),oe=Object(le.a)((function(e){return{root:{padding:e.spacing(3,2)}}})),ce=function(){var e=oe();return Object(a.jsx)(P.a,{style:{marginTop:"50px"},children:Object(a.jsxs)(h.a,{className:e.root,elevation:3,children:[Object(a.jsx)(O.a,{variant:"h5",component:"h3",children:"404 Page Not Found"}),Object(a.jsx)(O.a,{component:"p",children:"Please head to the home."})]})})},de=Object(d.a)({palette:{primary:{main:"#3F51B5"},secondary:{main:"#009688"}}}),ue=function(){return Object(a.jsx)(u.a,{theme:de,children:Object(a.jsx)(i.a.Suspense,{fallback:Object(a.jsx)(p.a,{}),children:Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(T,{}),Object(a.jsx)(o.a,{children:Object(a.jsxs)(c.c,{children:[Object(a.jsx)(c.a,{path:"",component:se}),Object(a.jsx)(c.a,{default:!0,component:ce})]})}),Object(a.jsx)(m.a,{hidden:!0}),Object(a.jsxs)(h.a,{elevation:4,className:"report-problem-container",children:[Object(a.jsxs)("span",{children:["If you come across any issue, feel free to report"," ",Object(a.jsx)("a",{href:"https://github.com/aparcar/attendedsysupgrade-server/issues",children:"here"}),"."]}),Object(a.jsxs)("span",{className:"report-link",children:["For contributions, go to"," ",Object(a.jsx)("a",{href:"https://github.com/sudhanshu16/openwrt-firmware-selector/",children:"Github"})]})]})]})})})},pe=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,244)).then((function(t){var r=t.getCLS,a=t.getFID,n=t.getFCP,i=t.getLCP,s=t.getTTFB;r(e),a(e),n(e),i(e),s(e)}))},me=r(74),he=r(104),be=r.n(he),ge={ca:{"tr-load":"Descarregueu el microprogramari OpenWrt per al vostre dispositiu","tr-title":"Selector de microprogramari OpenWrt","tr-message":'Introdu\xefu el nom o el model del vostre dispositiu i seleccioneu la versi\xf3 estable (per defecte) o la darrera imatge compilada ("snapshot")',"tr-version-build":"Compilaci\xf3","tr-custom-build":"Compilaci\xf3 personalitzada","tr-customize":"Personalitzar","tr-request-build":"Demanar la compilaci\xf3","tr-model":"Model","tr-target":"Plataforma","tr-version":"Versi\xf3","tr-date":"Data","tr-downloads":"Desc\xe0rregues","tr-custom-downloads":"Desc\xe0rregues personalitzades","tr-factory-help":'Empreu la imatge "factory" per instal\xb7lar OpenWrt a un dispositius per primera vegada. Normalment ho podreu fer trav\xe9s de la interf\xedcie web del microprogramari original.',"tr-sysupgrade-help":'Empreu la imatge "sysupgrade" per actualitzar un dispositiu que ja tingui OpenWrt instal\xb7lat. La imatge es pot instal\xb7lar a trav\xe9s de la interf\xedcie web LuCI o del terminal.',"tr-kernel-help":"El nucli de Linux en una imatge separada.","tr-rootfs-help":"El sistema de fitxers arrel en una imatge separada.","tr-sdcard-help":"Una imatge feta per escriure-la a una targeta SD.","tr-tftp-help":"Les imatges TFTP images es fan servir per instal\xb7lar-les a un dispositiu mitjan\xe7ant el m\xe8tode TFTP del carregador d'arrencada.","tr-other-help":"Un altre tipus d'imatge.","tr-build-successful":"La compilaci\xf3 ha tingut \xe8xit","tr-build-failed":"La compilaci\xf3 ha fallat","tr-request-image":"Demanar la imatge","tr-check-again":"Proveu de nou d'aqu\xed 5 segons..."},en:{"tr-server-link":"Files","tr-notfound":"No model found!","tr-load":"Download OpenWrt Firmware for your Device","tr-title":"OpenWrt Firmware Selector","tr-message":"Type the name or model of your device, then select the recommended build or some other.","tr-version-build":"About this build","tr-custom-build":"Custom Build","tr-customize":"Customize","tr-request-build":"Request Build","tr-model":"Model","tr-target":"Platform","tr-version":"Version","tr-date":"Date","tr-downloads":"Download an image","tr-custom-downloads":"Custom Downloads","tr-factory-help":"Use a Factory image to flash a router with OpenWrt for the first time. You normally do this via the web interface of the original firmware.","tr-sysupgrade-help":"Use a Sysupgrade image to update a router that already runs OpenWrt. The image can be used with the LuCI web interface or the terminal.","tr-kernel-help":"Linux kernel as a separate image.","tr-rootfs-help":"Root file system as a separate image.","tr-sdcard-help":"Image that is meant to be flashed onto a SD-Card.","tr-tftp-help":"TFTP images are used to flash a device via the TFTP method of the bootloader.","tr-other-help":"Other image type.","tr-build-successful":"Build successful","tr-build-failed":"Build failed","tr-request-image":"Request image","tr-check-again":"Check again in 5 seconds..."},es:{"tr-notfound":"\xa1Modelo no encontrado!","tr-load":"Descargue el firmware OpenWrt para su dispositivo","tr-title":"Selector de firmware OpenWrt","tr-message":"Escriba el nombre o modelo de su dispositivo, luego seleccione la versi\xf3n recomendada o alguna otra.","tr-version-build":"Acerca de esta compilaci\xf3n","tr-custom-build":"Compilaci\xf3n personalizada","tr-customize":"Personalizar","tr-request-build":"Solicitar compilaci\xf3n","tr-model":"Modelo","tr-target":"Plataforma","tr-version":"Versi\xf3n","tr-date":"Date","tr-downloads":"Descargar una imagen","tr-custom-downloads":"Descargas personalizadas","tr-factory-help":"Utilice una imagen factory para instalar OpenWrt en un enrutador por primera vez. Normalmente se hace a trav\xe9s de la interfaz web del firmware original.","tr-sysupgrade-help":"Utilice una imagen sysupgrade para actualizar un enrutador que ya ejecuta OpenWrt. La imagen se puede utilizar con la interfaz web de LuCI o el terminal.","tr-kernel-help":"Kernel de Linux como una imagen separada.","tr-rootfs-help":"Sistema de archivos ra\xedz como una imagen separada.","tr-sdcard-help":"Imagen destinada a flashear en una tarjeta SD.","tr-tftp-help":"Las im\xe1genes TFTP se utilizan para actualizar un dispositivo mediante el m\xe9todo TFTP del gestor de arranque.","tr-other-help":"Otro tipo de imagen.","tr-build-successful":"Compilaci\xf3n exitosa","tr-build-failed":"Compilaci\xf3n fallida","tr-request-image":"Solicitar imagen","tr-check-again":"Vuelva a comprobar en 5 segundos..."},no:{"tr-load":"Last ned OpenWrt fastvare for din enhet!","tr-title":"OpenWrt fastvare utvelger","tr-message":"Bruk feltene nedenfor for \xe5 laste ned fastvare til enheten din!","tr-version-build":"Sammensetning","tr-custom-build":"Tilpasset sammensetning","tr-customize":"Tilpasse","tr-request-build":"Be om sammensetning","tr-model":"Modell","tr-target":"Platform","tr-version":"Versjon","tr-date":"Dato","tr-downloads":"Nedlastninger","tr-custom-downloads":"Tilpassede nedlastninger","tr-factory-help":"Factory avbildningen er for \xe5 laste rutere med OpenWrt f\xf8rste gang. Vanligvis via webgrensesnittet til den originale fastvaren.","tr-sysupgrade-help":"Sysupgrade avbildningen er for rutere som allerede benytter OpenWrt. Avbildningen innstaleres gjennom webgrensesnittet eller terminalen.","tr-kernel-help":"Linux kjernen som en egen avbildning.","tr-rootfs-help":"Rotfilsystem som en egen avbildning.","tr-sdcard-help":"Avbildning som er ment for et SD-kort.","tr-tftp-help":"TFTP avbildninger er for \xe5 laste enheter via TFTP metoden i oppstartsprosedyren.","tr-other-help":"Andre avbildningstyper.","tr-build-successful":"Vellykket sammensetning","tr-build-failed":"Sammensetningen feilet","tr-request-image":"Be om avbildning","tr-check-again":"Sjekk p\xe5nytt om 5 sekunder..."},de:{"tr-server-link":"Dateien","tr-notfound":"Kein Model gefunden!","tr-load":"Lade die OpenWrt Firmware f\xfcr dein Ger\xe4t!","tr-title":"OpenWrt Firmware Selector","tr-message":"Bitte benutze die Eingabe um die passende Firmware zu finden!","tr-version-build":"Release Build","tr-custom-build":"Custom Build","tr-customize":"Customize","tr-request-build":"Request Build","tr-model":"Model","tr-target":"Target","tr-version":"Version","tr-date":"Datum","tr-downloads":"Downloads","tr-custom-downloads":"Custom Downloads","tr-factory-help":"Factory Abbilder werden \xfcber die Weboberfl\xe4che der originalen Firmware eingespielt.","tr-sysupgrade-help":"Sysupgrade Abbilder werden f\xfcr Ger\xe4te verwendet, die bereits OpenWrt laufen haben. Es ist m\xf6glich, existierende Einstellungen beizubehalten.","tr-kernel-help":"Linux Kernel als separates Abbild.","tr-rootfs-help":"Das Root Dateisystem als separates Abbild.","tr-sdcard-help":"Image f\xfcr SD Speicherkarten.","tr-tftp-help":"TFTP Dateien k\xf6nnen verwendet werden, um ein Ger\xe4t \xfcber die TFTP Method des Bootloader zu flashen.","tr-other-help":"Sonstiger Imagetyp.","tr-build-successful":"Build erfolgreich","tr-build-failed":"Build fehlgeschlagen","tr-request-image":"Frage nach image","tr-check-again":"Nochmal nachfragen in 5 Sekunden..."},fr:{"tr-load":"T\xe9l\xe9charger le firmware OpenWrt de votre p\xe9riph\xe9rique !","tr-title":"S\xe9lecteur de Firmware","tr-message":"Utiliser les entr\xe9es ci-dessous pour t\xe9l\xe9charger le firmware de votre p\xe9riph\xe9rique !","tr-version-build":"Build","tr-custom-build":"Build Personnalis\xe9","tr-customize":"Personnalisation","tr-request-build":"Requ\xeate de Build","tr-model":"Mod\xe8le","tr-target":"Platform","tr-version":"Version","tr-date":"Date","tr-downloads":"T\xe9l\xe9chargements","tr-custom-downloads":"T\xe9l\xe9chargements Personnalus\xe9s","tr-factory-help":"Les images Factory sont pr\xe9vues pour flasher les routers avec OpenWrt pour la premi\xe8re fois. Habituellement \xe0 partir de l'interface web du firmware d'origine.","tr-sysupgrade-help":"Les images Sysupgrade sont pr\xe9vues pour flasher les routers fonctionnant d\xe9j\xe0 avec OpenWrt. L'image peut \xeatre install\xe9e \xe0 travers l'interface web ou par le terminal.","tr-kernel-help":"Linux kernel comme image s\xe9par\xe9e.","tr-rootfs-help":"Root file system comme image s\xe9par\xe9e.","tr-sdcard-help":"Image pr\xe9vue pour \xeatre flash\xe9e sur une carte SD.","tr-tftp-help":"TFTP images pr\xe9vues pour flasher le p\xe9riph\xe9rique via le d\xe9marrage par m\xe9thode TFTP.","tr-other-help":"Autre type d'image.","tr-build-successful":"Succ\xe8s du Build","tr-build-failed":"\xc9chec du Build","tr-request-image":"Demade d'image","tr-check-again":"Essayer \xe0 nouveau dans 5 secondes..."},it:{"tr-load":"Scarica il firmware OpenWrt per il tuo dispositivo!","tr-title":"OpenWrt Firmware Selector","tr-message":"Usa la casella sottostante per scaricare il firmware per il tuo dispositivo!","tr-version-build":"Build","tr-custom-build":"Custom Build","tr-customize":"Personalizza","tr-request-build":"Richiedi Build","tr-model":"Modell","tr-target":"Platform","tr-version":"Version","tr-date":"Data","tr-downloads":"Downloads","tr-custom-downloads":"Download Personalizzati","tr-factory-help":"Factory Image sono usate per installare OpenWrt su router per la prima volta. Di solito l'immagine pu\xf2 essere applicata via l'interfaccia web del firmware originale.","tr-sysupgrade-help":"Sysupgrade Image sono usate per flashare router in cui OpenWrt \xe8 gi\xe0 installato. L'immagine pu\xf2 essere applicata via interfaccia web o terminale.","tr-kernel-help":"Linux kernel come immagine separata.","tr-rootfs-help":"Root file system come immagine separata.","tr-sdcard-help":"Immagine da flashare su scheda SD-Card separata.","tr-tftp-help":"Immagini TFTP images sono usate per flashare un dispositivo con il metodo TFTP del bootloader.","tr-other-help":"Other image type.","tr-build-successful":"Build compilata con successo","tr-build-failed":"Build fallita","tr-request-image":"Richiedi immagine","tr-check-again":"Prova di nuovo in 5 secondi..."},pl:{"tr-server-link":"Pliki","tr-notfound":"Nie znaleziono modelu!","tr-load":"Pobieranie oprogramowania OpenWrt","tr-title":"OpenWrt Firmware Selector","tr-message":"Wprowad\u017a nazw\u0119 lub model swojego urz\u0105dzenia, a nast\u0119pnie wybierz wersj\u0119 zalecan\u0105 lub inn\u0105.","tr-version-build":"Informacje o obrazie","tr-custom-build":"Informacje o zmodyfikowanym obrazie","tr-customize":"Modyfikacja","tr-request-build":"\u017b\u0105danie budowy obrazu","tr-model":"Model","tr-target":"Platforma","tr-version":"Wersja","tr-date":"Data","tr-downloads":"Obrazy do pobrania","tr-custom-downloads":"Zmodyfikowane obrazy do pobrania","tr-factory-help":"U\u017cyj obrazu factory do pierwszej instalacji OpenWrt. Zwykle mo\u017cna go u\u017cy\u0107 wykorzystuj\u0105c interfejs graficzny oryginalnego oprogramowania.","tr-sysupgrade-help":"U\u017cyj obrazu sysuprade do aktualizacji routera z zainstalowanym ju\u017c OpenWrt. Obraz mo\u017cna u\u017cy\u0107 przez interfejs graficzny LuCI lub konsol\u0119.","tr-kernel-help":"Osobny obraz z kernelem linuksowym.","tr-rootfs-help":"Osobny obraz z systemem plik\xf3w.","tr-sdcard-help":"Obraz do wgrania na kart\u0119 SD.","tr-tftp-help":"Obraz TFTP s\u0142u\u017c\u0105cy do aktualizacji urz\u0105dzenia z wykorzystaniem metody TFTP bootloadera.","tr-other-help":"Inny typ obrazu.","tr-build-successful":"Budowanie zako\u0144czone pomy\u015blnie","tr-build-failed":"B\u0142\u0105d budowania","tr-request-image":"\u017b\u0105danie obrazu","tr-check-again":"Sprawd\u017a ponownie za 5 sekund..."},tr:{"tr-load":"Cihaz\u0131n\u0131z i\xe7in OpenWrt yaz\u0131l\u0131m\u0131n\u0131 indirin!","tr-title":"OpenWrt Yaz\u0131l\u0131m Se\xe7icisi","tr-message":'Cihaz\u0131n\u0131z\u0131n ad\u0131n\u0131/modelini girin, ard\u0131ndan Stabil s\xfcr\xfcm\xfc(varsay\u0131lan) veya nightly "snapshot" imajini se\xe7in.',"tr-version-build":"S\xfcr\xfcm","tr-custom-build":"\xd6zel S\xfcr\xfcm","tr-customize":"\xd6zelle\u015ftir","tr-request-build":"S\xfcr\xfcm Olu\u015ftur","tr-model":"Model","tr-target":"Platform","tr-version":"Versiyon","tr-date":"Tarih","tr-downloads":"\u0130ndirmeler","tr-custom-downloads":"\xd6zel \u0130ndirmeler","tr-factory-help":"Bir y\xf6nlendiriciyi OpenWrt ile ilk kez flashlamak i\xe7in bir Fabrika imaji kullan\u0131n. Bu normalde orijinal ayg\u0131t yaz\u0131l\u0131m\u0131n\u0131n web aray\xfcz\xfc arac\u0131l\u0131\u011f\u0131yla yap\u0131l\u0131r.","tr-sysupgrade-help":"Zaten OpenWrt \xe7al\u0131\u015ft\u0131ran bir y\xf6nlendiriciyi g\xfcncellemek i\xe7in bir Sysupgrade imaj\u0131 kullan\u0131n. Imaj, LuCI web aray\xfcz\xfc veya terminal ile kullan\u0131labilir.","tr-kernel-help":"Linux kernel ayr\u0131 bir imaj olarak.","tr-rootfs-help":"K\xf6k Dosya Sistemi ayr\u0131 bir imaj olarak.","tr-sdcard-help":"SD-Kart 'a kurulmas\u0131 planlanan imaj","tr-tftp-help":"TFTP imajlar\u0131, Bootloader '\u0131n TFTP y\xf6ntemi ile bir cihaza kurulmas\u0131 i\xe7in kullan\u0131l\u0131r.","tr-other-help":"Di\u011fer imaj t\xfcr\xfc.","tr-build-successful":"Olu\u015fturma ba\u015far\u0131l\u0131","tr-build-failed":"Olu\u015fturma ba\u015far\u0131s\u0131z","tr-request-image":"Imaj olu\u015ftur","tr-check-again":"5 saniye icinde tekrar dene..."}},je={ca:{translation:ge.ca},en:{translation:ge.en},es:{translation:ge.es},de:{translation:ge.de},fr:{translation:ge.fr},it:{translation:ge.it},no:{translation:ge.no},pl:{translation:ge.pl},tr:{translation:ge.tr}};me.a.use(be.a).use(z.a).init({resources:je,fallbackLng:"en",debug:"1"===(Object({NODE_ENV:"production",PUBLIC_URL:"/openwrt-firmware-selector",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_I18N_DEBUG||"0"),interpolation:{escapeValue:!1}});me.a;l.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(ue,{})}),document.getElementById("root")),pe()},82:function(e,t,r){}},[[176,1,2]]]);
//# sourceMappingURL=main.ad3dab68.chunk.js.map