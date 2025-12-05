// CLIENTES SLIDER INFINITE
document.addEventListener("DOMContentLoaded", function () {
  // ===== i18n (ES/EN) =====
  const htmlTag = document.documentElement;
  const switchEl = document.querySelector('.lang-switch');
  const langBtns = document.querySelectorAll('.lang-option');
  const DEFAULT_LANG = 'es';
  const I18N_PATH = 'assets/lang';

  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('primary-nav');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('open', !expanded);
    });
    // Close on link or language option click
    navList.addEventListener('click', (e) => {
      const t = e.target;
      if (t.closest('a') || t.closest('.lang-option')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
      }
    });
  }

  function detectInitialLang() {
    const saved = localStorage.getItem('lang');
    if (saved) return saved;
    const nav = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
    return nav.startsWith('en') ? 'en' : 'es';
  }

  async function loadTranslations(lang) {
    // 1) Prefer project files in assets/lang/
    try {
      const res = await fetch(`${I18N_PATH}/${lang}.json`, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`No se pudo cargar ${I18N_PATH}/${lang}.json`);
      return await res.json();
    } catch (e) {
      console.warn('Fallo al cargar desde assets/lang, intentando inline...', e);
    }
    // 2) Fallback: inline JSON (works over file://)
    try {
      const inline = document.getElementById(`i18n-${lang}`);
      if (inline && inline.textContent && inline.textContent.trim()) {
        return JSON.parse(inline.textContent);
      }
    } catch (e) {
      console.warn('No inline translations o error parseando', lang, e);
    }
    console.error('No se encontraron traducciones para', lang);
    return {};
  }

  function applyTranslations(map) {
    if (!map || typeof map !== 'object') {
      console.warn('Mapa de traducciones inválido para aplicar:', map);
      return;
    }
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = key.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), map);
      if (typeof value === 'string') {
        if (value.includes('<br')) {
          el.innerHTML = value;
        } else {
          el.textContent = value;
        }
      }
    });
  }

  async function setLanguage(lang) {
    const map = await loadTranslations(lang);
    applyTranslations(map);
    htmlTag.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
    // UI: highlight active button
    if (langBtns && langBtns.length) {
      langBtns.forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });
    }
  }

  const initialLang = detectInitialLang() || DEFAULT_LANG;
  setLanguage(initialLang);

  if (langBtns && langBtns.length) {
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetLang = btn.dataset.lang;
        if (targetLang) setLanguage(targetLang);
      });
    });
  }
  // ===== end i18n =====

  // CLIENTES INFINITE SLIDER
  const clientesSlider = document.getElementById("clientes-slider");
  const clientesPrevBtn = document.getElementById("clientes-prev");
  const clientesNextBtn = document.getElementById("clientes-next");
  let clientesLogos = clientesSlider.querySelectorAll(".clientes-logo");

  function cloneLogos() {
    clientesSlider
      .querySelectorAll(".clientes-logo.clone")
      .forEach((e) => e.remove());
    let n = Math.min(3, clientesLogos.length);
    for (let i = 0; i < n; i++) {
      const cloneFirst = clientesLogos[i].cloneNode(true);
      cloneFirst.classList.add("clone");
      clientesSlider.appendChild(cloneFirst);

      const cloneLast =
        clientesLogos[clientesLogos.length - 1 - i].cloneNode(true);
      cloneLast.classList.add("clone");
      clientesSlider.insertBefore(cloneLast, clientesSlider.firstChild);
    }
  }
  cloneLogos();
  clientesLogos = clientesSlider.querySelectorAll(".clientes-logo");

  function getLogoWidth() {
    const oneLogo = clientesSlider.querySelector(".clientes-logo");
    if (!oneLogo) return 200;
    const style = window.getComputedStyle(oneLogo);
    return oneLogo.offsetWidth + parseInt(style.marginRight);
  }
  const logoWidth = getLogoWidth();
  let clientesScrollPosition = logoWidth * Math.min(3, clientesLogos.length);

  function setClientesScroll(pos) {
    clientesSlider.scrollLeft = pos;
    clientesScrollPosition = pos;
  }
  setClientesScroll(clientesScrollPosition);

  function clientesSlideNext() {
    clientesScrollPosition += logoWidth;
    clientesSlider.scrollTo({
      left: clientesScrollPosition,
      behavior: "smooth",
    });
    setTimeout(() => {
      if (
        clientesScrollPosition >=
        clientesSlider.scrollWidth -
          logoWidth * Math.min(3, clientesLogos.length)
      ) {
        setClientesScroll(logoWidth * Math.min(3, clientesLogos.length));
      }
    }, 350);
  }
  function clientesSlidePrev() {
    clientesScrollPosition -= logoWidth;
    clientesSlider.scrollTo({
      left: clientesScrollPosition,
      behavior: "smooth",
    });
    setTimeout(() => {
      if (clientesScrollPosition <= 0) {
        setClientesScroll(
          clientesSlider.scrollWidth -
            logoWidth * Math.min(6, clientesLogos.length)
        );
      }
    }, 350);
  }
  clientesNextBtn.addEventListener("click", clientesSlideNext);
  clientesPrevBtn.addEventListener("click", clientesSlidePrev);
  clientesSlider.style.overflowX = "hidden";

  // VIDEOS INFINITE SLIDER
  const videosSlider = document.getElementById("videos-slider");
  const videosPrevBtn = document.getElementById("videos-prev");
  const videosNextBtn = document.getElementById("videos-next");
  let videosCards = videosSlider.querySelectorAll(".video-card");

  function cloneVideos() {
    videosSlider
      .querySelectorAll(".video-card.clone")
      .forEach((e) => e.remove());
    let n = Math.min(2, videosCards.length);
    for (let i = 0; i < n; i++) {
      const cloneFirst = videosCards[i].cloneNode(true);
      cloneFirst.classList.add("clone");
      videosSlider.appendChild(cloneFirst);

      const cloneLast = videosCards[videosCards.length - 1 - i].cloneNode(true);
      cloneLast.classList.add("clone");
      videosSlider.insertBefore(cloneLast, videosSlider.firstChild);
    }
  }
  cloneVideos();
  videosCards = videosSlider.querySelectorAll(".video-card");

  function getVideoWidth() {
    const oneVideo = videosSlider.querySelector(".video-card");
    if (!oneVideo) return 320;
    const style = window.getComputedStyle(oneVideo);
    return oneVideo.offsetWidth + parseInt(style.marginRight);
  }
  const videoWidth = getVideoWidth();
  let videosScrollPosition = videoWidth * Math.min(2, videosCards.length);

  function setVideosScroll(pos) {
    videosSlider.scrollLeft = pos;
    videosScrollPosition = pos;
  }
  setVideosScroll(videosScrollPosition);

  function videosSlideNext() {
    videosScrollPosition += videoWidth;
    videosSlider.scrollTo({ left: videosScrollPosition, behavior: "smooth" });
    setTimeout(() => {
      if (
        videosScrollPosition >=
        videosSlider.scrollWidth - videoWidth * Math.min(2, videosCards.length)
      ) {
        setVideosScroll(videoWidth * Math.min(2, videosCards.length));
      }
    }, 350);
  }
  function videosSlidePrev() {
    videosScrollPosition -= videoWidth;
    videosSlider.scrollTo({ left: videosScrollPosition, behavior: "smooth" });
    setTimeout(() => {
      if (videosScrollPosition <= 0) {
        setVideosScroll(
          videosSlider.scrollWidth -
            videoWidth * Math.min(4, videosCards.length)
        );
      }
    }, 350);
  }
  videosNextBtn.addEventListener("click", videosSlideNext);
  videosPrevBtn.addEventListener("click", videosSlidePrev);
  videosSlider.style.overflowX = "hidden";
});
