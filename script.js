(function () {
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
