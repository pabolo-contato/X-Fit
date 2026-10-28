(() => {
  const C = window.XFIT, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const FALLBACK = "img/placeholder.svg";
  const wa = k => C.whatsapp + "?text=" + encodeURIComponent(C.messages[k] || C.messages.geral);
  const ext = a => { a.target = "_blank"; a.rel = "noopener noreferrer"; };

  $$("[data-wa]").forEach(a => { a.href = wa(a.dataset.wa); ext(a); });
  $$("[data-maps]").forEach(a => { a.href = C.maps; ext(a); });
  $$("[data-ig]").forEach(a => { a.href = C.instagram; ext(a); });

  $$("img[data-img]").forEach(i => { const d = C[i.dataset.img]; i.src = d.src; i.alt = d.alt; });
  document.addEventListener("error", e => { const t = e.target; if (t.tagName === "IMG" && !t.src.endsWith(FALLBACK)) t.src = FALLBACK; }, true);

  $("#year").textContent = new Date().getFullYear();

  const header = $(".header");
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 24);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });

  const btn = $(".menu-btn"), nav = $("#nav");
  const setMenu = o => { nav.classList.toggle("open", o); btn.setAttribute("aria-expanded", String(o)); btn.setAttribute("aria-label", o ? "Fechar menu" : "Abrir menu"); document.body.classList.toggle("lock", o); };
  btn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  $$("#nav a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); btn.focus(); } });
  matchMedia("(min-width: 900px)").addEventListener("change", e => e.matches && setMenu(false));

  const grid = $("#gallery"), dlg = $("#lightbox"), big = $("#lb-img"), cap = $("#lb-cap");
  let cur = 0, opener = null;
  const show = i => { cur = (i + C.gallery.length) % C.gallery.length; big.src = C.gallery[cur].src; big.alt = C.gallery[cur].alt; cap.textContent = (cur + 1) + " / " + C.gallery.length; };
  C.gallery.forEach((g, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "g-item"; b.setAttribute("aria-label", "Ampliar imagem " + (i + 1) + " de " + C.gallery.length);
    const im = new Image(); im.src = g.src; im.alt = g.alt; im.loading = "lazy"; im.decoding = "async";
    b.append(im); b.addEventListener("click", () => { opener = b; show(i); dlg.showModal(); });
    grid.append(b);
  });
  $("#lb-prev").addEventListener("click", () => show(cur - 1));
  $("#lb-next").addEventListener("click", () => show(cur + 1));
  $("#lb-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => opener && opener.focus());
  dlg.addEventListener("keydown", e => { if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });

  if (C.testimonials.length) {
    const s = $("#depoimentos"), l = $("#t-list"); s.hidden = false;
    C.testimonials.forEach(t => {
      const f = document.createElement("figure"); f.className = "card";
      const q = document.createElement("blockquote"); q.textContent = t.texto;
      const c = document.createElement("figcaption"); c.textContent = t.nome + (t.detalhe ? " — " + t.detalhe : "");
      f.append(q, c); l.append(f);
    });
  }

  if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
    $$(".reveal").forEach(el => io.observe(el));
  } else $$(".reveal").forEach(el => el.classList.add("in"));
})();
