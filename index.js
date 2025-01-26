import{a as f,S as L,i as p}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const m=o=>`
      <li class="gallery-card">
        <a href="${o.largeImageURL}" class="gallery-link">
          <img class="gallery-img" src="${o.webformatURL}" alt="${o.tags}"/>
        </a>
        <ul class="info-card-list">
            <li class="info-card-item">Likes <p> ${o.likes} </p></li>
            <li class="info-card-item">Views <p>${o.views}</p></li>
            <li class="info-card-item">Comments <p>${o.comments}</p></li>
            <li class="info-card-item">Downloads <p>${o.downloads}</p></li>
        </ul>
      </li>

    `,h=(o,r)=>{const s={params:{key:"48308646-4d458c48d5d2f9bc699dc7008",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}};return f.get("https://pixabay.com/api/",s)},y=document.querySelector(".js-search-form"),n=document.querySelector(".js-gallery"),u=document.querySelector(".gallery-load"),c=document.querySelector(".js-btn-load-more");let a=1,d="";const b=async o=>{try{o.preventDefault(),d=o.currentTarget.elements.user_gallery.value.trim(),n.innerHTML="",y.reset(),(()=>{u.classList.remove("hidden")})(),a=1,c.classList.add("is-hidden");const s=await h(d,a);(()=>{u.classList.add("hidden")})();const e=s.data.hits.map(l=>m(l)).join("");n.innerHTML=e,s.data.hits.length===0&&p.show({message:"❌ Sorry, there are no images matching your search query. Please, try again!",color:"red",position:"topRight"}),w.refresh();const t=a*15;s.data.totalHits>t&&(c.classList.remove("is-hidden"),c.addEventListener("click",g))}catch(r){console.log(r)}};y.addEventListener("submit",b);const g=async o=>{try{a++;const r=await h(d,a),s=r.data.hits.map(t=>m(t)).join("");n.insertAdjacentHTML("beforeend",s);const{height:i}=n.firstElementChild.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"}),a*15>=r.data.totalHits&&(c.classList.add("is-hidden"),c.removeEventListener("click",g),p.show({message:"We're sorry, but you've reached the end of search results.",color:"blue",position:"topRight"}))}catch(r){console.log(r)}};let w=new L(".gallery-link",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=index.js.map
