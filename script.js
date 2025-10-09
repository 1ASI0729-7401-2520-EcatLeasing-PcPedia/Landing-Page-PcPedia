// CLIENTES SLIDER INFINITE
document.addEventListener("DOMContentLoaded", function () {
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
