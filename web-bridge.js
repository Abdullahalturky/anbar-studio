(function(){
// ---- access PIN (simple gate) ----
var H="3feee9f04ff0548a6ce499faac15d2b3fd805cb3a27e41611e7c6d8e6fb9e6e0";
function ok(){try{return localStorage.getItem("anbarGate")===H}catch(e){return false}}
if(!ok()){document.documentElement.style.visibility="hidden";
 addEventListener("DOMContentLoaded",function(){var d=document.createElement("div");d.dir="rtl";
  d.style.cssText="position:fixed;inset:0;z-index:2147483647;background:#12302A;display:flex;align-items:center;justify-content:center;visibility:visible;font-family:-apple-system,system-ui,sans-serif";
  d.innerHTML='<form style="width:min(340px,86vw);text-align:center;color:#fff"><img src="icon-192.png" style="width:96px;border-radius:22px;margin-bottom:18px"><div style="font-size:20px;font-weight:700;margin-bottom:6px">استوديو الأنبار بوست</div><div style="opacity:.75;margin-bottom:18px">اكتب رمز الدخول</div><input inputmode="numeric" autocomplete="off" style="width:100%;font-size:24px;text-align:center;letter-spacing:8px;padding:12px;border-radius:12px;border:0;box-sizing:border-box"><button style="width:100%;margin-top:12px;padding:14px;border:0;border-radius:12px;background:#FC3030;color:#fff;font-size:18px;font-weight:700">دخول</button><div data-e style="color:#ffb3bb;margin-top:10px;min-height:22px"></div></form>';
  document.body.appendChild(d);var f=d.querySelector("form"),inp=d.querySelector("input");inp.focus();
  f.onsubmit=async function(e){e.preventDefault();var buf=await crypto.subtle.digest("SHA-256",new TextEncoder().encode("anbar:"+inp.value.trim()));
   var hex=[].map.call(new Uint8Array(buf),function(x){return("0"+x.toString(16)).slice(-2)}).join("");
   if(hex===H){try{localStorage.setItem("anbarGate",H)}catch(_){}d.remove();document.documentElement.style.visibility=""}else{d.querySelector("[data-e]").textContent="الرمز غلط";inp.value=""}}})}
// iPhone-safe recorder: accept plain "video/mp4" when a codec string is refused, cap the bitrate, report errors, never hang on stop
(function(){const MR=window.MediaRecorder;if(!MR)return;
  function note(t){try{const st=document.getElementById("status");if(st)st.textContent=t}catch(e){}try{window.toast&&window.toast(t)}catch(e){}}
  function AMR(stream,o){o=Object.assign({},o||{});if(!o.videoBitsPerSecond||o.videoBitsPerSecond>6e6)o.videoBitsPerSecond=6e6;let r;
    try{r=new MR(stream,o)}catch(e){const base=(o.mimeType||"").split(";")[0];try{r=new MR(stream,base?{mimeType:base,videoBitsPerSecond:o.videoBitsPerSecond}:{videoBitsPerSecond:o.videoBitsPerSecond})}catch(e2){r=new MR(stream)}}
    let fired=false;r.addEventListener("stop",()=>{fired=true});
    r.addEventListener("error",ev=>{note("خطأ بالتسجيل: "+((ev&&ev.error&&ev.error.name)||"غير معروف"));try{if(r.state!=="inactive")r.stop()}catch(e){}});
    const st=r.stop.bind(r);r.stop=function(){try{if(r.requestData)r.requestData()}catch(e){}try{st()}catch(e){}setTimeout(()=>{if(!fired&&typeof r.onstop==="function"){fired=true;r.onstop(new Event("stop"))}},5000)};
    return r}
  AMR.isTypeSupported=t=>MR.isTypeSupported(t);AMR.prototype=MR.prototype;window.MediaRecorder=AMR})();

// ---- save sheet: the tap gives Safari the gesture it needs for the share sheet («حفظ الفيديو») ----
var mimeOf=function(n){return /\.png$/i.test(n)?"image/png":/\.jpe?g$/i.test(n)?"image/jpeg":/\.mp4$/i.test(n)?"video/mp4":/\.webm$/i.test(n)?"video/webm":"application/octet-stream"};
function sheet(name,bytes){return new Promise(function(done){
  var type=mimeOf(name),blob=new Blob([bytes],{type:type});if(!blob.size){alert("الملف طلع فارغ. جرّب مرة ثانية وخلي الشاشة مفتوحة لحد ما يخلص.");done(false);return}
  var url=URL.createObjectURL(blob),isV=type.indexOf("video")===0;
  var d=document.createElement("div");d.dir="rtl";d.style.cssText="position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.85);display:flex;align-items:flex-end;justify-content:center;font-family:-apple-system,system-ui,sans-serif";
  var B="width:100%;min-height:54px;border:0;border-radius:14px;font-weight:700;font-size:18px;margin-bottom:9px;cursor:pointer;-webkit-appearance:none;";
  d.innerHTML='<div style="width:min(520px,100%);max-height:94vh;overflow:auto;background:#121A18;color:#F3F1EC;border-radius:18px 18px 0 0;padding:16px 16px calc(18px + env(safe-area-inset-bottom));box-sizing:border-box">'+
   '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><b style="font-size:19px">'+(isV?"الفيديو جاهز":"الصورة جاهزة")+' ✅</b><button data-q style="background:none;border:0;color:#F3F1EC;font-size:30px">×</button></div>'+
   (isV?'<video src="'+url+'" controls playsinline muted style="width:100%;max-height:44vh;border-radius:10px;background:#000"></video>':'<img src="'+url+'" style="width:100%;max-height:44vh;object-fit:contain;border-radius:10px;background:#000">')+
   '<div style="font-size:12px;opacity:.6;margin:6px 0 12px" dir="ltr">'+name+' · '+(blob.size/1048576).toFixed(1)+' MB</div>'+
   '<button data-a style="'+B+'background:#FC3030;color:#fff">📷 حفظ بالاستوديو / مشاركة</button>'+
   '<a data-b href="'+url+'" download="'+name+'" style="'+B+'display:flex;align-items:center;justify-content:center;text-decoration:none;background:#1E2A27;color:#fff;border:1px solid rgba(255,255,255,.25)">⬇️ تنزيل كملف</a>'+
   '<div data-m style="font-size:14px;line-height:1.7;opacity:.9">اضغط الزر الأحمر واختار <b>«'+(isV?'حفظ الفيديو':'حفظ الصورة')+'»</b> من القائمة.</div></div>';
  document.body.appendChild(d);var saved=false;var msg=function(t){d.querySelector("[data-m]").innerHTML=t};
  var close=function(){d.remove();setTimeout(function(){URL.revokeObjectURL(url)},60000);done(saved)};
  d.querySelector("[data-q]").onclick=close;d.querySelector("[data-b]").addEventListener("click",function(){saved=true});
  d.querySelector("[data-a]").onclick=function(){var file=new File([blob],name,{type:type});
    if(!navigator.share||(navigator.canShare&&!navigator.canShare({files:[file]}))){msg("المشاركة غير متوفرة بهذا المتصفح — استخدم «تنزيل كملف».");return}
    navigator.share({files:[file]}).then(function(){saved=true;msg("تم ✅");setTimeout(close,1200)}).catch(function(e){msg(e&&e.name==="AbortError"?"ألغيت. اضغط مرة ثانية واختار «حفظ».":"ما انفتحت القائمة ("+(e&&e.name)+"). استخدم «تنزيل كملف».")})};
})}
var coarse=matchMedia("(pointer:coarse)").matches;
if(coarse)window.anbarNative={saveFile:function(name,bytes){return sheet(name,bytes)},version:function(){return Promise.resolve("web")}};
})();
