var re=Object.defineProperty;var ne=(e,t,r)=>t in e?re(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var P=(e,t,r)=>(ne(e,typeof t!="symbol"?t+"":t,r),r);import{i as z,c as ie,a as G,p as X}from"./immer-AZmEbvJU.js";import{c as oe,w as ce}from"./reselect-BEFkisvr.js";import{t as ue,w as se}from"./redux-thunk-ClJT1hhx.js";function E(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var ae=typeof Symbol=="function"&&Symbol.observable||"@@observable",F=ae,N=()=>Math.random().toString(36).substring(7).split("").join("."),fe={INIT:`@@redux/INIT${N()}`,REPLACE:`@@redux/REPLACE${N()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${N()}`},_=fe;function L(e){if(typeof e!="object"||e===null)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function H(e,t,r){if(typeof e!="function")throw new Error(E(2));if(typeof t=="function"&&typeof r=="function"||typeof r=="function"&&typeof arguments[3]=="function")throw new Error(E(0));if(typeof t=="function"&&typeof r>"u"&&(r=t,t=void 0),typeof r<"u"){if(typeof r!="function")throw new Error(E(1));return r(H)(e,t)}let n=e,i=t,o=new Map,c=o,f=0,u=!1;function a(){c===o&&(c=new Map,o.forEach((w,S)=>{c.set(S,w)}))}function s(){if(u)throw new Error(E(3));return i}function l(w){if(typeof w!="function")throw new Error(E(4));if(u)throw new Error(E(5));let S=!0;a();const m=f++;return c.set(m,w),function(){if(S){if(u)throw new Error(E(6));S=!1,a(),c.delete(m),o=null}}}function d(w){if(!L(w))throw new Error(E(7));if(typeof w.type>"u")throw new Error(E(8));if(typeof w.type!="string")throw new Error(E(17));if(u)throw new Error(E(9));try{u=!0,i=n(i,w)}finally{u=!1}return(o=c).forEach(m=>{m()}),w}function g(w){if(typeof w!="function")throw new Error(E(10));n=w,d({type:_.REPLACE})}function C(){const w=l;return{subscribe(S){if(typeof S!="object"||S===null)throw new Error(E(11));function m(){const p=S;p.next&&p.next(s())}return m(),{unsubscribe:w(m)}},[F](){return this}}}return d({type:_.INIT}),{dispatch:d,subscribe:l,getState:s,replaceReducer:g,[F]:C}}function le(e){Object.keys(e).forEach(t=>{const r=e[t];if(typeof r(void 0,{type:_.INIT})>"u")throw new Error(E(12));if(typeof r(void 0,{type:_.PROBE_UNKNOWN_ACTION()})>"u")throw new Error(E(13))})}function de(e){const t=Object.keys(e),r={};for(let o=0;o<t.length;o++){const c=t[o];typeof e[c]=="function"&&(r[c]=e[c])}const n=Object.keys(r);let i;try{le(r)}catch(o){i=o}return function(c={},f){if(i)throw i;let u=!1;const a={};for(let s=0;s<n.length;s++){const l=n[s],d=r[l],g=c[l],C=d(g,f);if(typeof C>"u")throw f&&f.type,new Error(E(14));a[l]=C,u=u||C!==g}return u=u||n.length!==Object.keys(c).length,u?a:c}}function W(e,t){return function(...r){return t(e.apply(this,r))}}function et(e,t){if(typeof e=="function")return W(e,t);if(typeof e!="object"||e===null)throw new Error(E(16));const r={};for(const n in e){const i=e[n];typeof i=="function"&&(r[n]=W(i,t))}return r}function k(...e){return e.length===0?t=>t:e.length===1?e[0]:e.reduce((t,r)=>(...n)=>t(r(...n)))}function he(...e){return t=>(r,n)=>{const i=t(r,n);let o=()=>{throw new Error(E(15))};const c={getState:i.getState,dispatch:(u,...a)=>o(u,...a)},f=e.map(u=>u(c));return o=k(...f)(i.dispatch),{...i,dispatch:o}}}function pe(e){return L(e)&&"type"in e&&typeof e.type=="string"}var ye=(...e)=>{const t=oe(...e),r=Object.assign((...n)=>{const i=t(...n),o=(c,...f)=>i(z(c)?ie(c):c,...f);return Object.assign(o,i),o},{withTypes:()=>r});return r};ye(ce);var we=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?k:k.apply(null,arguments)},me=e=>e&&typeof e.match=="function";function j(e,t){function r(...n){if(t){let i=t(...n);if(!i)throw new Error(R(0));return{type:e,payload:i.payload,..."meta"in i&&{meta:i.meta},..."error"in i&&{error:i.error}}}return{type:e,payload:n[0]}}return r.toString=()=>`${e}`,r.type=e,r.match=n=>pe(n)&&n.type===e,r}var Q=class M extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,M.prototype)}static get[Symbol.species](){return M}concat(...t){return super.concat.apply(this,t)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new M(...t[0].concat(this)):new M(...t.concat(this))}};function V(e){return G(e)?X(e,()=>{}):e}function K(e,t,r){if(e.has(t)){let i=e.get(t);return r.update&&(i=r.update(i,t,e),e.set(t,i)),i}if(!r.insert)throw new Error(R(10));const n=r.insert(t,e);return e.set(t,n),n}function be(e){return typeof e=="boolean"}var Ee=()=>function(t){const{thunk:r=!0,immutableCheck:n=!0,serializableCheck:i=!0,actionCreatorCheck:o=!0}=t??{};let c=new Q;return r&&(be(r)?c.push(ue):c.push(se(r.extraArgument))),c},ge="RTK_autoBatch",Y=e=>t=>{setTimeout(t,e)},Ce=typeof window<"u"&&window.requestAnimationFrame?window.requestAnimationFrame:Y(10),ve=(e={type:"raf"})=>t=>(...r)=>{const n=t(...r);let i=!0,o=!1,c=!1;const f=new Set,u=e.type==="tick"?queueMicrotask:e.type==="raf"?Ce:e.type==="callback"?e.queueNotification:Y(e.timeout),a=()=>{c=!1,o&&(o=!1,f.forEach(s=>s()))};return Object.assign({},n,{subscribe(s){const l=()=>i&&s(),d=n.subscribe(l);return f.add(s),()=>{d(),f.delete(s)}},dispatch(s){var l;try{return i=!((l=s==null?void 0:s.meta)!=null&&l[ge]),o=!i,o&&(c||(c=!0,u(a))),n.dispatch(s)}finally{i=!0}}})},Se=e=>function(r){const{autoBatch:n=!0}=r??{};let i=new Q(e);return n&&i.push(ve(typeof n=="object"?n:void 0)),i},Re=!0;function tt(e){const t=Ee(),{reducer:r=void 0,middleware:n,devTools:i=!0,preloadedState:o=void 0,enhancers:c=void 0}=e||{};let f;if(typeof r=="function")f=r;else if(L(r))f=de(r);else throw new Error(R(1));let u;typeof n=="function"?u=n(t):u=t();let a=k;i&&(a=we({trace:!Re,...typeof i=="object"&&i}));const s=he(...u),l=Se(s);let d=typeof c=="function"?c(l):l();const g=a(...d);return H(f,o,g)}function J(e){const t={},r=[];let n;const i={addCase(o,c){const f=typeof o=="string"?o:o.type;if(!f)throw new Error(R(28));if(f in t)throw new Error(R(29));return t[f]=c,i},addMatcher(o,c){return r.push({matcher:o,reducer:c}),i},addDefaultCase(o){return n=o,i}};return e(i),[t,r,n]}function Oe(e){return typeof e=="function"}function je(e,t){let[r,n,i]=J(t),o;if(Oe(e))o=()=>V(e());else{const f=V(e);o=()=>f}function c(f=o(),u){let a=[r[u.type],...n.filter(({matcher:s})=>s(u)).map(({reducer:s})=>s)];return a.filter(s=>!!s).length===0&&(a=[i]),a.reduce((s,l)=>{if(l)if(z(s)){const g=l(s,u);return g===void 0?s:g}else{if(G(s))return X(s,d=>l(d,u));{const d=l(s,u);if(d===void 0){if(s===null)return s;throw new Error(R(9))}return d}}return s},f)}return c.getInitialState=o,c}var Te="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",Z=(e=21)=>{let t="",r=e;for(;r--;)t+=Te[Math.random()*64|0];return t},Ae=(e,t)=>me(e)?e.match(t):e(t);function I(...e){return t=>e.some(r=>Ae(r,t))}function B(e,t){if(!e||!e.meta)return!1;const r=typeof e.meta.requestId=="string",n=t.indexOf(e.meta.requestStatus)>-1;return r&&n}function $(e){return typeof e[0]=="function"&&"pending"in e[0]&&"fulfilled"in e[0]&&"rejected"in e[0]}function Me(...e){return e.length===0?t=>B(t,["pending"]):$(e)?I(...e.map(t=>t.pending)):Me()(e[0])}function De(...e){return e.length===0?t=>B(t,["rejected"]):$(e)?I(...e.map(t=>t.rejected)):De()(e[0])}function _e(...e){return e.length===0?t=>B(t,["fulfilled"]):$(e)?I(...e.map(t=>t.fulfilled)):_e()(e[0])}var ke=["name","message","stack","code"],x=class{constructor(e,t){P(this,"_type");this.payload=e,this.meta=t}},U=class{constructor(e,t){P(this,"_type");this.payload=e,this.meta=t}},Ie=e=>{if(typeof e=="object"&&e!==null){const t={};for(const r of ke)typeof e[r]=="string"&&(t[r]=e[r]);return t}return{message:String(e)}},rt=(()=>{function e(t,r,n){const i=j(t+"/fulfilled",(u,a,s,l)=>({payload:u,meta:{...l||{},arg:s,requestId:a,requestStatus:"fulfilled"}})),o=j(t+"/pending",(u,a,s)=>({payload:void 0,meta:{...s||{},arg:a,requestId:u,requestStatus:"pending"}})),c=j(t+"/rejected",(u,a,s,l,d)=>({payload:l,error:(n&&n.serializeError||Ie)(u||"Rejected"),meta:{...d||{},arg:s,requestId:a,rejectedWithValue:!!l,requestStatus:"rejected",aborted:(u==null?void 0:u.name)==="AbortError",condition:(u==null?void 0:u.name)==="ConditionError"}}));function f(u){return(a,s,l)=>{const d=n!=null&&n.idGenerator?n.idGenerator(u):Z(),g=new AbortController;let C,A;function w(m){A=m,g.abort()}const S=async function(){var p,v;let m;try{let b=(p=n==null?void 0:n.condition)==null?void 0:p.call(n,u,{getState:s,extra:l});if(Ne(b)&&(b=await b),b===!1||g.signal.aborted)throw{name:"ConditionError",message:"Aborted due to condition callback returning false."};const O=new Promise((y,T)=>{C=()=>{T({name:"AbortError",message:A||"Aborted"})},g.signal.addEventListener("abort",C)});a(o(d,u,(v=n==null?void 0:n.getPendingMeta)==null?void 0:v.call(n,{requestId:d,arg:u},{getState:s,extra:l}))),m=await Promise.race([O,Promise.resolve(r(u,{dispatch:a,getState:s,extra:l,requestId:d,signal:g.signal,abort:w,rejectWithValue:(y,T)=>new x(y,T),fulfillWithValue:(y,T)=>new U(y,T)})).then(y=>{if(y instanceof x)throw y;return y instanceof U?i(y.payload,d,u,y.meta):i(y,d,u)})])}catch(b){m=b instanceof x?c(null,d,u,b.payload,b.meta):c(b,d,u)}finally{C&&g.signal.removeEventListener("abort",C)}return n&&!n.dispatchConditionRejection&&c.match(m)&&m.meta.condition||a(m),m}();return Object.assign(S,{abort:w,requestId:d,arg:u,unwrap(){return S.then(Pe)}})}}return Object.assign(f,{pending:o,rejected:c,fulfilled:i,settled:I(c,i),typePrefix:t})}return e.withTypes=()=>e,e})();function Pe(e){if(e.meta&&e.meta.rejectedWithValue)throw e.payload;if(e.error)throw e.error;return e.payload}function Ne(e){return e!==null&&typeof e=="object"&&typeof e.then=="function"}var xe=Symbol.for("rtk-slice-createasyncthunk");function Le(e,t){return`${e}/${t}`}function Be({creators:e}={}){var r;const t=(r=e==null?void 0:e.asyncThunk)==null?void 0:r[xe];return function(i){const{name:o,reducerPath:c=o}=i;if(!o)throw new Error(R(11));typeof process<"u";const f=(typeof i.reducers=="function"?i.reducers(qe()):i.reducers)||{},u=Object.keys(f),a={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(h,p){const v=typeof h=="string"?h:h.type;if(!v)throw new Error(R(12));if(v in a.sliceCaseReducersByType)throw new Error(R(13));return a.sliceCaseReducersByType[v]=p,s},addMatcher(h,p){return a.sliceMatchers.push({matcher:h,reducer:p}),s},exposeAction(h,p){return a.actionCreators[h]=p,s},exposeCaseReducer(h,p){return a.sliceCaseReducersByName[h]=p,s}};u.forEach(h=>{const p=f[h],v={reducerName:h,type:Le(o,h),createNotation:typeof i.reducers=="function"};We(p)?Ke(v,p,s,t):Fe(v,p,s)});function l(){const[h={},p=[],v=void 0]=typeof i.extraReducers=="function"?J(i.extraReducers):[i.extraReducers],b={...h,...a.sliceCaseReducersByType};return je(i.initialState,O=>{for(let y in b)O.addCase(y,b[y]);for(let y of a.sliceMatchers)O.addMatcher(y.matcher,y.reducer);for(let y of p)O.addMatcher(y.matcher,y.reducer);v&&O.addDefaultCase(v)})}const d=h=>h,g=new Map;let C;function A(h,p){return C||(C=l()),C(h,p)}function w(){return C||(C=l()),C.getInitialState()}function S(h,p=!1){function v(O){let y=O[h];return typeof y>"u"&&p&&(y=w()),y}function b(O=d){const y=K(g,p,{insert:()=>new WeakMap});return K(y,O,{insert:()=>{const T={};for(const[ee,te]of Object.entries(i.selectors??{}))T[ee]=$e(te,O,w,p);return T}})}return{reducerPath:h,getSelectors:b,get selectors(){return b(v)},selectSlice:v}}const m={name:o,reducer:A,actions:a.actionCreators,caseReducers:a.sliceCaseReducersByName,getInitialState:w,...S(c),injectInto(h,{reducerPath:p,...v}={}){const b=p??c;return h.inject({reducerPath:b,reducer:A},v),{...m,...S(b,!0)}}};return m}}function $e(e,t,r,n){function i(o,...c){let f=t(o);return typeof f>"u"&&n&&(f=r()),e(f,...c)}return i.unwrapped=e,i}var nt=Be();function qe(){function e(t,r){return{_reducerDefinitionType:"asyncThunk",payloadCreator:t,...r}}return e.withTypes=()=>e,{reducer(t){return Object.assign({[t.name](...r){return t(...r)}}[t.name],{_reducerDefinitionType:"reducer"})},preparedReducer(t,r){return{_reducerDefinitionType:"reducerWithPrepare",prepare:t,reducer:r}},asyncThunk:e}}function Fe({type:e,reducerName:t,createNotation:r},n,i){let o,c;if("reducer"in n){if(r&&!Ve(n))throw new Error(R(17));o=n.reducer,c=n.prepare}else o=n;i.addCase(e,o).exposeCaseReducer(t,o).exposeAction(t,c?j(e,c):j(e))}function We(e){return e._reducerDefinitionType==="asyncThunk"}function Ve(e){return e._reducerDefinitionType==="reducerWithPrepare"}function Ke({type:e,reducerName:t},r,n,i){if(!i)throw new Error(R(18));const{payloadCreator:o,fulfilled:c,pending:f,rejected:u,settled:a,options:s}=r,l=i(e,o,s);n.exposeAction(t,l),c&&n.addCase(l.fulfilled,c),f&&n.addCase(l.pending,f),u&&n.addCase(l.rejected,u),a&&n.addMatcher(l.settled,a),n.exposeCaseReducer(t,{fulfilled:c||D,pending:f||D,rejected:u||D,settled:a||D})}function D(){}var Ue=(e,t)=>{if(typeof e!="function")throw new Error(R(32))},q="listenerMiddleware",ze=e=>{let{type:t,actionCreator:r,matcher:n,predicate:i,effect:o}=e;if(t)i=j(t).match;else if(r)t=r.type,i=r.match;else if(n)i=n;else if(!i)throw new Error(R(21));return Ue(o),{predicate:i,type:t,effect:o}},Ge=Object.assign(e=>{const{type:t,predicate:r,effect:n}=ze(e);return{id:Z(),effect:n,type:t,predicate:r,pending:new Set,unsubscribe:()=>{throw new Error(R(22))}}},{withTypes:()=>Ge}),Xe=Object.assign(j(`${q}/add`),{withTypes:()=>Xe});j(`${q}/removeAll`);var He=Object.assign(j(`${q}/remove`),{withTypes:()=>He});function R(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}export{nt as a,_e as b,rt as c,De as d,j as e,et as f,tt as g,Me as i};
