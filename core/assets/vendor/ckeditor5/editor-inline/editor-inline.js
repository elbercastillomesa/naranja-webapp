/*!
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */(()=>{var t={693:(t,e,o)=>{"use strict";o.d(e,{A:()=>a});var r=o(758),n=o.n(r),i=o(935),s=o.n(i)()(n());s.push([t.id,".ck.ck-menu-bar{border:none;border-bottom:1px solid var(--ck-color-toolbar-border)}",""]);const a=s},935:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var o="",r=void 0!==e[5];return e[4]&&(o+="@supports (".concat(e[4],") {")),e[2]&&(o+="@media ".concat(e[2]," {")),r&&(o+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),o+=t(e),r&&(o+="}"),e[2]&&(o+="}"),e[4]&&(o+="}"),o})).join("")},e.i=function(t,o,r,n,i){"string"==typeof t&&(t=[[null,t,void 0]]);var s={};if(r)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(s[l]=!0)}for(var c=0;c<t.length;c++){var u=[].concat(t[c]);r&&s[u[0]]||(void 0!==i&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=i),o&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=o):u[2]=o),n&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=n):u[4]="".concat(n)),e.push(u))}},e}},758:t=>{"use strict";t.exports=function(t){return t[1]}},591:t=>{"use strict";var e=[];function o(t){for(var o=-1,r=0;r<e.length;r++)if(e[r].identifier===t){o=r;break}return o}function r(t,r){for(var i={},s=[],a=0;a<t.length;a++){var l=t[a],c=r.base?l[0]+r.base:l[0],u=i[c]||0,d="".concat(c," ").concat(u);i[c]=u+1;var h=o(d),p={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==h)e[h].references++,e[h].updater(p);else{var f=n(p,r);r.byIndex=a,e.splice(a,0,{identifier:d,updater:f,references:1})}s.push(d)}return s}function n(t,e){var o=e.domAPI(e);o.update(t);return function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;o.update(t=e)}else o.remove()}}t.exports=function(t,n){var i=r(t=t||[],n=n||{});return function(t){t=t||[];for(var s=0;s<i.length;s++){var a=o(i[s]);e[a].references--}for(var l=r(t,n),c=0;c<i.length;c++){var u=o(i[c]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}i=l}}},128:t=>{"use strict";var e={};t.exports=function(t,o){var r=function(t){if(void 0===e[t]){var o=document.querySelector(t);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(t){o=null}e[t]=o}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(o)}},51:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},21:t=>{"use strict";t.exports=function(t,e){Object.keys(e).forEach((function(o){t.setAttribute(o,e[o])}))}},639:t=>{"use strict";var e,o=(e=[],function(t,o){return e[t]=o,e.filter(Boolean).join("\n")});function r(t,e,r,n){var i;if(r)i="";else{i="",n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}")}if(t.styleSheet)t.styleSheet.cssText=o(e,i);else{var a=document.createTextNode(i),l=t.childNodes;l[e]&&t.removeChild(l[e]),l.length?t.insertBefore(a,l[e]):t.appendChild(a)}}var n={singleton:null,singletonCounter:0};t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.singletonCounter++,o=n.singleton||(n.singleton=t.insertStyleElement(t));return{update:function(t){r(o,e,!1,t)},remove:function(t){r(o,e,!0,t)}}}},782:(t,e,o)=>{t.exports=o(237)("./src/core.js")},783:(t,e,o)=>{t.exports=o(237)("./src/engine.js")},311:(t,e,o)=>{t.exports=o(237)("./src/ui.js")},584:(t,e,o)=>{t.exports=o(237)("./src/utils.js")},237:t=>{"use strict";t.exports=CKEditor5.dll}},e={};function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={id:r,exports:{}};return t[r](i,i.exports,o),i.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var r in e)o.o(e,r)&&!o.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};(()=>{"use strict";o.r(r),o.d(r,{InlineEditor:()=>G});var t=o(782),e=o(584),n=o(311),i=o(783);class s extends n.EditorUI{constructor(t,e){super(t),this.view=e,this._toolbarConfig=(0,n.normalizeToolbarConfig)(t.config.get("toolbar"))}get element(){return this.view.editable.element}init(){const t=this.editor,e=this.view,o=t.editing.view,r=e.editable,n=o.document.getRoot();r.name=n.rootName,e.render();const i=r.element;this.setEditableElement(r.name,i),r.bind("isFocused").to(this.focusTracker),o.attachDomRoot(i),this._initPlaceholder(),this._initToolbar(),e.menuBarView&&this._initMenuBar(e.menuBarView),this.fire("ready")}destroy(){super.destroy();const t=this.view;this.editor.editing.view.detachDomRoot(t.editable.name),t.destroy()}_initToolbar(){const t=this.editor,e=this.view,o=e.editable.element,r=e.toolbar;e.panel.bind("isVisible").to(this.focusTracker,"isFocused"),e.bind("viewportTopOffset").to(this,"viewportOffset",(({top:t})=>t||0)),e.listenTo(t.ui,"update",(()=>{e.panel.isVisible&&e.panel.pin({target:o,positions:e.panelPositions})})),r.fillFromConfig(this._toolbarConfig,this.componentFactory),this.addToolbar(r)}_initPlaceholder(){const t=this.editor,e=t.editing.view,o=e.document.getRoot(),r=t.config.get("placeholder");if(r){const t="string"==typeof r?r:r[o.rootName];t&&(o.placeholder=t)}(0,i.enablePlaceholder)({view:e,element:o,isDirectHost:!1,keepOnFocus:!0})}}var a=o(591),l=o.n(a),c=o(639),u=o.n(c),d=o(128),h=o.n(d),p=o(21),f=o.n(p),b=o(51),v=o.n(b),g=o(693),m={attributes:{"data-cke":!0}};m.setAttributes=f(),m.insert=h().bind(null,"head"),m.domAPI=u(),m.insertStyleElement=v();l()(g.A,m);g.A&&g.A.locals&&g.A.locals;const w=(0,e.toUnit)("px");class y extends n.EditorUIView{constructor(t,e,o,r={}){super(t),this.toolbar=new n.ToolbarView(t,{shouldGroupWhenFull:r.shouldToolbarGroupWhenFull,isFloating:!0}),r.useMenuBar&&(this.menuBarView=new n.MenuBarView(t)),this.set("viewportTopOffset",0),this.panel=new n.BalloonPanelView(t),this.panelPositions=this._getPanelPositions(),this.panel.extendTemplate({attributes:{class:"ck-toolbar-container"}}),this.editable=new n.InlineEditableUIView(t,e,o,{label:r.label}),this._resizeObserver=null}render(){super.render(),this.body.add(this.panel),this.registerChild(this.editable),this.menuBarView?this.panel.content.addMany([this.menuBarView,this.toolbar]):this.panel.content.add(this.toolbar);if(this.toolbar.options.shouldGroupWhenFull){const t=this.editable.element;this._resizeObserver=new e.ResizeObserver(t,(()=>{this.toolbar.maxWidth=w(new e.Rect(t).width)}))}}destroy(){super.destroy(),this._resizeObserver&&this._resizeObserver.destroy()}_getPanelPositionTop(t,e){let o;return o=t.top>e.height+this.viewportTopOffset?t.top-e.height:t.bottom>e.height+this.viewportTopOffset+50?this.viewportTopOffset:t.bottom,o}_getPanelPositions(){const t=[(t,e)=>({top:this._getPanelPositionTop(t,e),left:t.left,name:"toolbar_west",config:{withArrow:!1}}),(t,e)=>({top:this._getPanelPositionTop(t,e),left:t.left+t.width-e.width,name:"toolbar_east",config:{withArrow:!1}})];return"ltr"===this.locale.uiLanguageDirection?t:t.reverse()}}const O=function(t){return null!=t&&"object"==typeof t};const T="object"==typeof global&&global&&global.Object===Object&&global;var E="object"==typeof self&&self&&self.Object===Object&&self;const j=(T||E||Function("return this")()).Symbol;var x=Object.prototype,P=x.hasOwnProperty,_=x.toString,S=j?j.toStringTag:void 0;const F=function(t){var e=P.call(t,S),o=t[S];try{t[S]=void 0;var r=!0}catch(t){}var n=_.call(t);return r&&(e?t[S]=o:delete t[S]),n};var C=Object.prototype.toString;const A=function(t){return C.call(t)};var B=j?j.toStringTag:void 0;const M=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":B&&B in Object(t)?F(t):A(t)};const V=function(t,e){return function(o){return t(e(o))}}(Object.getPrototypeOf,Object);var I=Function.prototype,D=Object.prototype,k=I.toString,N=D.hasOwnProperty,R=k.call(Object);const z=function(t){if(!O(t)||"[object Object]"!=M(t))return!1;var e=V(t);if(null===e)return!0;var o=N.call(e,"constructor")&&e.constructor;return"function"==typeof o&&o instanceof o&&k.call(o)==R};const W=function(t){return O(t)&&1===t.nodeType&&!z(t)};class G extends((0,t.ElementApiMixin)(t.Editor)){static get editorName(){return"InlineEditor"}constructor(o,r={}){if(!K(o)&&void 0!==r.initialData)throw new e.CKEditorError("editor-create-initial-data",null);super(r),this.config.define("menuBar.isVisible",!1),void 0===this.config.get("initialData")&&this.config.set("initialData",function(t){return K(t)?(0,e.getDataFromElement)(t):t}(o)),this.model.document.createRoot(),K(o)&&(this.sourceElement=o,(0,t.secureSourceElement)(this,o));const n=!this.config.get("toolbar.shouldNotGroupWhenFull"),i=this.config.get("menuBar"),a=new y(this.locale,this.editing.view,this.sourceElement,{shouldToolbarGroupWhenFull:n,useMenuBar:i.isVisible,label:this.config.get("label")});this.ui=new s(this,a),(0,t.attachToForm)(this)}destroy(){const t=this.getData();return this.ui.destroy(),super.destroy().then((()=>{this.sourceElement&&this.updateSourceElement(t)}))}static create(t,o={}){return new Promise((r=>{if(K(t)&&"TEXTAREA"===t.tagName)throw new e.CKEditorError("editor-wrong-element",null);const n=new this(t,o);r(n.initPlugins().then((()=>n.ui.init())).then((()=>n.data.init(n.config.get("initialData")))).then((()=>n.fire("ready"))).then((()=>n)))}))}}function K(t){return W(t)}})(),(window.CKEditor5=window.CKEditor5||{}).editorInline=r})();