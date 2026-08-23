(function () {
  var siteHeader = document.querySelector(".site-header");

  function updateHeaderHeight() {
    if (!siteHeader) {
      return;
    }

    document.documentElement.style.setProperty("--header-height", siteHeader.offsetHeight + "px");
  }

  updateHeaderHeight();
  window.addEventListener("resize", updateHeaderHeight);
  window.addEventListener("orientationchange", updateHeaderHeight);

  var videoFrame = document.querySelector("[data-video-embed]");
  var videoIframe = videoFrame ? videoFrame.querySelector("iframe") : null;

  if (videoFrame && videoIframe && window.location.protocol !== "file:") {
    videoIframe.src = videoIframe.dataset.src;
    videoFrame.classList.add("is-embed-ready");
  }

  var revealItems = document.querySelectorAll(".section-reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
})();
