(this["webpackJsonpomahq-fe"]=this["webpackJsonpomahq-fe"]||[]).push([[4],{151:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"})},152:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var r=n(1);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o=new Map,c=new WeakMap,a=0;function s(e){return Object.keys(e).sort().filter((function(t){return void 0!==e[t]})).map((function(t){return t+"_"+("root"===t?(n=e.root)?(c.has(n)||(a+=1,c.set(n,a.toString())),c.get(n)):"0":e[t]);var n})).toString()}function u(e,t,n){if(void 0===n&&(n={}),!e)return function(){};var r=function(e){var t=s(e),n=o.get(t);if(!n){var r,i=new Map,c=new IntersectionObserver((function(t){t.forEach((function(t){var n,o=t.isIntersecting&&r.some((function(e){return t.intersectionRatio>=e}));e.trackVisibility&&"undefined"===typeof t.isVisible&&(t.isVisible=o),null==(n=i.get(t.target))||n.forEach((function(e){e(o,t)}))}))}),e);r=c.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),n={id:t,observer:c,elements:i},o.set(t,n)}return n}(n),i=r.id,c=r.observer,a=r.elements,u=a.get(e)||[];return a.has(e)||a.set(e,u),u.push(t),c.observe(e),function(){u.splice(u.indexOf(t),1),0===u.length&&(a.delete(e),c.unobserve(e)),0===a.size&&(c.disconnect(),o.delete(i))}}function l(e){return"function"!==typeof e.children}var d=function(e){var t,n;function o(t){var n;return(n=e.call(this,t)||this).node=null,n._unobserveCb=null,n.handleNode=function(e){n.node&&(n.unobserve(),e||n.props.triggerOnce||n.props.skip||n.setState({inView:!!n.props.initialInView,entry:void 0})),n.node=e||null,n.observeNode()},n.handleChange=function(e,t){e&&n.props.triggerOnce&&n.unobserve(),l(n.props)||n.setState({inView:e,entry:t}),n.props.onChange&&n.props.onChange(e,t)},n.state={inView:!!t.initialInView,entry:void 0},n}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var c=o.prototype;return c.componentDidUpdate=function(e){e.rootMargin===this.props.rootMargin&&e.root===this.props.root&&e.threshold===this.props.threshold&&e.skip===this.props.skip&&e.trackVisibility===this.props.trackVisibility&&e.delay===this.props.delay||(this.unobserve(),this.observeNode())},c.componentWillUnmount=function(){this.unobserve(),this.node=null},c.observeNode=function(){if(this.node&&!this.props.skip){var e=this.props,t=e.threshold,n=e.root,r=e.rootMargin,i=e.trackVisibility,o=e.delay;this._unobserveCb=u(this.node,this.handleChange,{threshold:t,root:n,rootMargin:r,trackVisibility:i,delay:o})}},c.unobserve=function(){this._unobserveCb&&(this._unobserveCb(),this._unobserveCb=null)},c.render=function(){if(!l(this.props)){var e=this.state,t=e.inView,n=e.entry;return this.props.children({inView:t,entry:n,ref:this.handleNode})}var o=this.props,c=o.children,a=o.as,s=o.tag,u=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(o,["children","as","tag","triggerOnce","threshold","root","rootMargin","onChange","skip","trackVisibility","delay","initialInView"]);return Object(r.createElement)(a||s||"div",i({ref:this.handleNode},u),c)},o}(r.Component);function f(e){var t=void 0===e?{}:e,n=t.threshold,i=t.delay,o=t.trackVisibility,c=t.rootMargin,a=t.root,s=t.triggerOnce,l=t.skip,d=t.initialInView,f=Object(r.useRef)(),b=Object(r.useState)({inView:!!d}),h=b[0],j=b[1],p=Object(r.useCallback)((function(e){void 0!==f.current&&(f.current(),f.current=void 0),l||e&&(f.current=u(e,(function(e,t){j({inView:e,entry:t}),t.isIntersecting&&s&&f.current&&(f.current(),f.current=void 0)}),{root:a,rootMargin:c,threshold:n,trackVisibility:o,delay:i}))}),[Array.isArray(n)?n.toString():n,a,c,s,l,o,i]);Object(r.useEffect)((function(){f.current||!h.entry||s||l||j({inView:!!d})}));var O=[p,h.inView,h.entry];return O.ref=O[0],O.inView=O[1],O.entry=O[2],O}d.displayName="InView",d.defaultProps={threshold:0,triggerOnce:!1,initialInView:!1}},281:function(e,t,n){"use strict";n.r(t);var r=n(18),i=n.n(r),o=n(20),c=n(29),a=n(10),s=n(42),u=n(1),l=n(4),d=n(43),f=n(152),b=n(3),h=n(5),j=n(58),p=n(30),O=n(19),v=n(151),x=n(44),g=n(2),m={store:"",price:0,quantity:"",total_price:"Rp 0,00"},y=function(e){var t=e.item,n=e.shown,r=e.onClose,o=e.houseId,l=e.onSaved,f=Object(h.c)((function(e){return e.auth})),y=Object(u.useState)(Object(b.a)({},m)),w=Object(a.a)(y,2),k=w[0],C=w[1],N=Object(u.useContext)(p.b).showAlert,S=Object(u.useContext)(O.b),V=S.loadingProcess,_=S.loadingDone,I=Object(u.useRef)(),E="LOADING_ADD_FORM";Object(u.useEffect)((function(){C(m)}),[n]);var q=function(e,t){var n=Object(b.a)({},k);n[t]=e.target.value,n.price=parseInt(n.price);var r=n.price*n.quantity;n.total_price=v.a.format(r),C(n)},M=function(){var e=Object(c.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return V(E),e.next=3,d.a.post("/transaction/incoming",Object(b.a)(Object(b.a)({},k),{},{barcode:t.barcode,user_id:f.data.id,house_id:o})).then((function(e){var t=e.data;N({message:"Item has been added",title:"Success",type:"success"}),l(t),r()})).catch((function(e){var t=e.response;Object(x.a)(t,N)}));case 3:_(E);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(g.jsx)(j.a,{nodeRef:I,in:n,timeout:300,classNames:"modal-lg",unmountOnExit:!0,children:Object(g.jsxs)(s.f,{ref:I,title:Object(g.jsxs)("span",{className:"text-lg",children:["Add ",null===t||void 0===t?void 0:t.name]}),closing:function(){return r()},children:[Object(g.jsx)(s.d,{label:"Store",children:Object(g.jsx)(s.c,{placeholder:"Store",onChange:function(e){return q(e,"store")},value:k.store})}),Object(g.jsx)(s.d,{label:"Price",children:Object(g.jsx)(s.c,{placeholder:"Price",onChange:function(e){return q(e,"price")},value:k.price})}),Object(g.jsx)(s.d,{label:"Quantity",children:Object(g.jsx)(s.c,{placeholder:"Quantity",onChange:function(e){return q(e,"quantity")},value:k.quantity})}),Object(g.jsx)(s.d,{label:"Total Price",children:Object(g.jsx)(s.c,{placeholder:"Total Price",disabled:!0,value:k.total_price})}),Object(g.jsx)(s.d,{children:Object(g.jsx)("button",{onClick:M,className:"rounded text-white font-medium px-2 py-1 focus:outline-none hover:bg-green-500 bg-green-400 active:bg-green-600 transition duration-300 ease-in-out",children:"Submit"})})]})})},w=n(23),k=n(0),C=function(e){var t=e.shown,n=e.onConfirm,r=e.confirmText,i=e.onCancel,o=Object(u.useRef)();return Object(g.jsx)(j.a,{in:t,unmountOnExit:!0,classNames:"modal-lg",timeout:200,nodeRef:o,children:Object(g.jsxs)("div",{className:"fixed inset-0 z-50 flex justify-center items-center",children:[Object(g.jsx)("div",{onClick:i,className:"absolute -z-10 inset-0 backdrop-filter backdrop-blur-sm bg-gray-500 bg-opacity-40"}),Object(g.jsxs)("div",{ref:o,className:"bg-white shadow-xl w-full sm:w-96 rounded-lg flex justify-center items-center mx-4 py-2 px-2",children:[Object(g.jsx)("div",{className:"w-20 h-20 pr-4",children:Object(g.jsx)(k.b.Provider,{value:{className:"text-yellow-400 w-full h-full"},children:Object(g.jsx)(w.f,{})})}),Object(g.jsxs)("div",{className:"flex-1 flex space-y-4 flex-col",children:[Object(g.jsx)("span",{className:"text-lg font-medium w-full",children:r}),Object(g.jsxs)("div",{className:"w-full flex justify-end space-x-4",children:[Object(g.jsx)("button",{onClick:i,className:"px-2 py-1 text-gray-400 hover:text-gray-300 active:text-gray-400 focus:outline-none transition duration-300 ease-in-out font-medium",children:"No"}),Object(g.jsx)("button",{onClick:n,className:"px-2 py-1 text-lg bg-green-600 hover:bg-green-500 active:bg-green-700 focus:outline-none transition duration-300 rounded-lg text-white font-medium",children:"Sure!"})]})]})]})]})})};C.defaultProps={shown:!1,onConfirm:function(){},onCancel:function(){},confirmText:"Confirm text not provided"};var N=C,S=Object(u.lazy)((function(){return Promise.all([n.e(2),n.e(8)]).then(n.bind(null,278))})),V=Object(u.lazy)((function(){return n.e(10).then(n.bind(null,283))})),_=Object(u.lazy)((function(){return n.e(5).then(n.bind(null,279))})),I=Object(u.lazy)((function(){return Promise.all([n.e(12),n.e(9)]).then(n.bind(null,280))}));t.default=function(){var e=Object(u.useState)(!1),t=Object(a.a)(e,2),n=t[0],r=t[1],b=Object(u.useState)({}),j=Object(a.a)(b,2),v=j[0],m=j[1],w=Object(u.useState)([]),k=Object(a.a)(w,2),C=k[0],E=k[1],q=Object(u.useState)({}),M=Object(a.a)(q,2),A=M[0],P=M[1],R=Object(u.useState)(0),D=Object(a.a)(R,2),T=D[0],z=D[1],L=Object(u.useState)(!1),U=Object(a.a)(L,2),F=U[0],G=U[1],J=Object(u.useState)(!1),Q=Object(a.a)(J,2),W=Q[0],B=Q[1],H=Object(l.i)().id,K=Object(u.useState)(!1),X=Object(a.a)(K,2),Y=X[0],Z=X[1],$=Object(f.a)({threshold:0}),ee=$.ref,te=$.inView,ne=Object(u.useState)(!1),re=Object(a.a)(ne,2),ie=re[0],oe=re[1],ce=Object(u.useState)(null),ae=Object(a.a)(ce,2),se=ae[0],ue=ae[1],le=Object(u.useState)(!1),de=Object(a.a)(le,2),fe=de[0],be=de[1],he=Object(u.useState)(!1),je=Object(a.a)(he,2),pe=je[0],Oe=je[1],ve=Object(u.useState)(!1),xe=Object(a.a)(ve,2),ge=xe[0],me=xe[1],ye=Object(h.c)((function(e){return e.auth})),we=Object(u.useContext)(p.b).showAlert,ke=Object(u.useContext)(O.b),Ce=ke.loadingProcess,Ne=ke.loadingDone,Se="LOADING_ITEM";Object(u.useEffect)((function(){(function(){var e=Object(c.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return G(!0),Ce(Se),e.next=4,d.a.get("/item?house=".concat(H,"&limit=10&page=").concat(T)).then((function(e){var t=e.data;B(t.has_more),E((function(e){return[].concat(Object(o.a)(e),Object(o.a)(t.items.filter((function(t,n){return!e.find((function(e){return e.id===t.id}))&&t.id}))))})),G(!1)})).catch((function(e){return console.log(e)}));case 4:Ne(Se);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[H,T,Ce,Ne]),Object(u.useEffect)((function(){(function(){var e=Object(c.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/house/".concat(H)).then((function(e){m(e.data)})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[H]),Object(u.useEffect)((function(){n&&document.body.classList.add("overflow-hidden"),!n&&document.body.classList.remove("overflow-hidden")}),[n]);var Ve=function(e){be(!1),P(e),e&&r(!0)};Object(u.useEffect)((function(){var e=function(){var e=document.body.scrollTop||document.documentElement.scrollTop;Z(e>64)};return window.addEventListener("scroll",e),function(){window.removeEventListener("scroll",e)}}),[]);var _e=Object(u.useCallback)((function(){!F&&W&&z((function(e){return e+1}))}),[F,W]);Object(u.useEffect)((function(){te&&_e()}),[te,_e]);var Ie=function(){var e=Object(c.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(oe(!1),!t){e.next=6;break}return Ce(Se),e.next=5,d.a.get("/item/barcode/".concat(encodeURI(t.text),"/house/").concat(H)).then((function(e){Ve(e.data)})).catch((function(e){400===e.response.status&&(ue(t.text),be(!0))}));case 5:Ne(Se);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ee=function(){var e=Object(c.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Ce(Se),e.next=3,d.a.post("/transaction/usage",{house_id:H,barcode:A.barcode,user_id:ye.data.id}).then((function(e){var t=e.data;E((function(e){return e.map((function(e,n){return e.id===A.id&&(e.quantity=t.current_quantity),e})),e})),P((function(e){return e.quantity=t.current_quantity,e})),we({message:"One item taken successfully",title:"Success",type:"success"})})).catch((function(e){var t=e.response;Object(x.a)(t,we)}));case 3:Ne(Se),me(!1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(g.jsxs)("div",{className:"bg-gray-100 dark:bg-gray-700 min-h-screen",children:[Object(g.jsx)(s.g,{}),Object(g.jsxs)("div",{className:"flex flex-col",children:[Object(g.jsxs)("div",{className:"pt-6 pb-4 mb-4 px-6 w-full flex justify-between ".concat(Y?"sticky top-0 z-20 bg-white dark:bg-gray-800 shadow-xl rounded-b-lg":"bg-indigo-100 dark:bg-indigo-900 shadow"," transition duration-500"),children:[Object(g.jsx)("div",{className:"px-6 sm:px-16 text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100",children:null===v||void 0===v?void 0:v.name}),Object(g.jsx)("div",{className:"px-6 sm:px-16",children:Object(g.jsx)("button",{onClick:function(){return oe(!0)},className:"bg-green-500 hover:bg-green-600 font-semibold duration-300 ease-in-out text-center rounded-lg text-lg py-2 px-4 text-white",children:"Scan"})})]}),Object(g.jsxs)("div",{className:"flex flex-col sm:flex-row flex-wrap justify-center items-center",children:[C.map((function(e,t){return Object(g.jsx)(I,{data:e,onClick:function(){return Ve(e)}},t)})),Object(g.jsx)("div",{className:"",ref:ee})]})]}),Object(g.jsx)(_,{showModal:n,setShowModal:r,onAdd:function(){return Oe(!0)},onTake:function(){return me(!0)},item:A}),Object(g.jsx)(S,{showScanner:ie,onScanned:Ie}),Object(g.jsx)(V,{shown:fe,barcode:se,houseId:H,onClose:function(e){return Ve(e)}}),Object(g.jsx)(y,{shown:pe,item:A,onClose:function(){Oe(!1)},houseId:H,onSaved:function(e){E((function(t){return t.map((function(t,n){return t.id===e.id&&(t.quantity=e.current_quantity),t})),t})),P((function(t){return t.quantity=e.current_quantity,t}))}}),Object(g.jsx)(N,{shown:ge,confirmText:"Are you sure going to take one of ".concat(null===A||void 0===A?void 0:A.name,"?"),onConfirm:Ee,onCancel:function(){return me(!1)}})]})}}}]);
//# sourceMappingURL=4.fc1b5fbc.chunk.js.map