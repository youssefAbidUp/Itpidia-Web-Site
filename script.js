/* ITPidia: page behaviour. No inline scripts and no innerHTML, so the page runs under a strict CSP. */
(()=>{
"use strict";
const $=s=>document.querySelector(s);
const el=(tag,cls,...kids)=>{const n=document.createElement(tag);if(cls)n.className=cls;kids.forEach(k=>n.append(k));return n};
const icon=name=>el("span","ms",name);

const SVC=[["deployed_code","SaaS platforms","Online products with user accounts, subscriptions and admin dashboards."],["language","Web applications","Fast, secure web apps that work on every screen."],["smartphone","Mobile apps","iOS and Android apps for your customers or your team."],["palette","UI / UX design","Clear, simple interfaces designed around the people who use them."],["cloud","Cloud & hosting","Reliable hosting, backups and room to grow."],["support_agent","Support & updates","We keep your software running and improving after launch."]];
const WHY=[["groups","One team, start to finish","Design, development and hosting under one roof. No hand-offs between agencies."],["visibility","Progress you can see","A working version every week, so you always know where the project stands."],["trending_up","Built to grow","Clean, scalable code that handles more users and features as your business grows."],["handshake","We stay after launch","Updates, fixes and new features for as long as you need them."]];
const STEPS=[["forum","Discover","We listen to your goals and learn how your business works."],["draw","Design","You review clickable screens before any code is written."],["code","Build","We develop in short cycles and share progress every week."],["rocket_launch","Launch & grow","We go live, train your team and keep improving."]];
const ROT=[["deployed_code","SaaS platforms"],["language","web apps"],["smartphone","mobile apps"],["dashboard","business dashboards"],["sync_alt","integrations"]];
const O1=["cloud","smartphone","database","language","lock","monitoring"],O2=["code","palette","hub"];

$("#svc").replaceChildren(...SVC.map((x,i)=>el("div",`svc rv d${i%3+1}`,icon(x[0]),el("h3","",x[1]),el("p","",x[2]))));
$("#whyg").replaceChildren(...WHY.map((x,i)=>el("article",`wy rv d${i+1}`,el("div","wy-ic",icon(x[0])),el("h3","",x[1]),el("p","",x[2]))));
$("#steps").replaceChildren(el("div","steps-line",el("i")),...STEPS.map((x,i)=>el("div",`step rv d${i+1}`,el("div","step-n",icon(x[0])),el("small","",`STEP 0${i+1}`),el("h3","",x[1]),el("p","",x[2]))));
const place=(box,icons,g)=>box.replaceChildren(...icons.map((ic,i)=>{const a=i/icons.length*2*Math.PI-Math.PI/2,n=el("div",i===g?"node g":"node",icon(ic));n.style.left=`${50+50*Math.cos(a)}%`;n.style.top=`${50+50*Math.sin(a)}%`;return n}));
place($("#o1"),O1,0);place($("#o2"),O2,-1);

const rot=$("#rot");rot.replaceChildren(...ROT.map((r,i)=>el("span",i===0?"on":"",icon(r[0]),r[1])));
let ri=0;setInterval(()=>{const s=rot.children;s[ri].className="off";const p=ri;setTimeout(()=>s[p].className="",600);ri=(ri+1)%s.length;s[ri].className="on"},2400);

// Theme: only "dark" or "light" is accepted from storage; storage may be unavailable (private mode).
const store={get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}}};
let theme=store.get("itp-theme")==="light"?"light":"dark";
function setTheme(t){theme=t;document.documentElement.dataset.theme=t;$("#theme .ms").textContent=t==="dark"?"light_mode":"dark_mode";store.set("itp-theme",t)}
setTheme(theme);
$("#theme").addEventListener("click",()=>{const b=$("#theme");b.style.transform="rotate(180deg)";setTimeout(()=>b.style.transform="",400);setTheme(theme==="dark"?"light":"dark")});

const mm=$("#mm"),menu=$("#menu");
const setMenu=on=>{mm.classList.toggle("on",on);menu.setAttribute("aria-expanded",String(on));$("#menu .ms").textContent=on?"close":"menu"};
menu.addEventListener("click",()=>setMenu(!mm.classList.contains("on")));
mm.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
addEventListener("scroll",()=>$("#hdr").classList.toggle("scrolled",scrollY>20),{passive:true});

function reveal(all){document.querySelectorAll(".rv:not(.in),.steps:not(.in)").forEach(n=>{const r=n.getBoundingClientRect();if(all||r.top<innerHeight-40&&r.bottom>0)n.classList.add("in")})}
if("IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15,rootMargin:"0px 0px -40px 0px"});document.querySelectorAll(".rv,.steps").forEach(n=>io.observe(n))}
addEventListener("scroll",()=>reveal(),{passive:true});

// Contact form: nothing is sent to our server. It opens the visitor's mail app via mailto,
// so the VPS has no endpoint to spam or exploit. Values are trimmed, length-capped and URI-encoded.
const TYPES=["SaaS platform","Web application","Mobile app","UI / UX design","Other"];
const clean=(v,max)=>String(v||"").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,"").trim().slice(0,max);
$("#form").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);
const name=clean(f.get("name"),100).replace(/[\r\n]+/g," "),email=clean(f.get("email"),254).replace(/[\r\n]+/g,""),msg=clean(f.get("msg"),1500);
const type=TYPES.includes(f.get("type"))?f.get("type"):"Other";
if(!name||!msg||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){e.target.reportValidity();return}
location.href=`mailto:contact@itpidia.com?subject=${encodeURIComponent("New project · "+type+" · "+name)}&body=${encodeURIComponent(msg+"\n\n"+name+" · "+email)}`;
$("#sent").classList.add("on")});
$("#yr").textContent=new Date().getFullYear();

let fin=false;
function finish(){if(fin)return;fin=true;$("#loader").classList.add("out");document.body.classList.remove("loading");document.querySelectorAll(".hero .rv").forEach(n=>n.classList.add("in"));setTimeout(()=>reveal(),300)}
const t0=Date.now();
const done=()=>setTimeout(finish,Math.max(0,1900-(Date.now()-t0)));
document.readyState==="complete"?done():addEventListener("load",done);
setTimeout(finish,4000);
})();
