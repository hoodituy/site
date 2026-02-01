window.addEventListener("load",()=>{document.getElementById("loader")?.classList.add("hide");setTimeout(()=>{document.getElementById("loader")?.remove()},600);document.body.classList.add("grid-show");});
// mobile menu
const burger = document.querySelector('.hamburger');
const header = document.getElementById('header');
burger?.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  const nav = header.querySelector('nav');
  if (!nav) return;
  if (open) {
    nav.style.display = 'flex';
    nav.style.position = 'absolute';
    nav.style.top = '60px';
    nav.style.right = '16px';
    nav.style.background = 'rgba(10,12,11,.95)';
    nav.style.border = '1px solid rgba(201,164,92,.2)';
    nav.style.borderRadius = '12px';
    nav.style.padding = '10px';
    nav.style.flexDirection = 'column';
    nav.style.gap = '10px';
  } else {
    nav.style.cssText = '';
  }
});
// contact form (mailto + Turnstile client check)
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  function esc(s){return encodeURIComponent(s||'');}
  form.addEventListener('submit', function(e){
    e.preventDefault();
    try{ 
      const token = (window.turnstile && window.turnstile.getResponse) ? window.turnstile.getResponse() : '';
      if(!token){ alert('Por favor completa el captcha.'); return; }
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const company = document.getElementById('company').value.trim();
      const msg = document.getElementById('msg').value.trim();
      if(!name || !email || !msg){ alert('Completá los campos requeridos.'); return; }
      const subject = esc('Contacto desde el sitio — ' + name);
      const body = esc(
        'Nombre: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Empresa: ' + company + '\n' +
        'Mensaje: ' + msg + '\n' +
        'Captcha: OK (client)'
      );
      const href = 'mailto:hoodituy@gmail.com?subject=' + subject + '&body=' + body;
      window.location.href = href;
    }catch(err){ console.error(err); alert('No se pudo abrir tu cliente de correo.'); }
  });
})();
// year
document.getElementById('y')?.appendChild(document.createTextNode(new Date().getFullYear()));

(function(){
  const hero = document.querySelector('.hero');
  const lens = document.querySelector('.grid-lens');
  if(!hero || !lens) return;
  function update(e){
    const r = hero.getBoundingClientRect();
    const cx = (e.clientX ?? (e.touches?.[0]?.clientX ?? r.left + r.width*0.72)) - r.left;
    const cy = (e.clientY ?? (e.touches?.[0]?.clientY ?? r.top + r.height*0.50)) - r.top;
    const px = Math.max(0, Math.min(1, cx / r.width));
    const py = Math.max(0, Math.min(1, cy / r.height));
    document.documentElement.style.setProperty('--lensX', (px*100).toFixed(2)+'%');
    document.documentElement.style.setProperty('--lensY', (py*100).toFixed(2)+'%');
    const dx = (px - 0.72) * 16;
    const dy = (py - 0.50) * 12;
    lens.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }
  hero.addEventListener('mousemove', update, {passive:true});
  hero.addEventListener('touchmove', update, {passive:true});
  requestAnimationFrame(()=>update({clientX: hero.getBoundingClientRect().left + hero.clientWidth*0.72, clientY: hero.getBoundingClientRect().top + hero.clientHeight*0.5}));
})();
