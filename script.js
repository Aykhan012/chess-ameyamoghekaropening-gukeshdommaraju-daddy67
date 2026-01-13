(function () {
  const cards = document.querySelectorAll(".card");

  function setAccent(card) {
    const accent = card.getAttribute("data-accent") || "120,120,255";
    card.style.setProperty("--accent", accent);
  }

  function openBar(card) {
    const bar = card.querySelector(".infoBar");
    const inner = card.querySelector(".infoInner");
    if (!bar || !inner) return;

    const target = inner.scrollHeight;
    bar.style.height = target + "px";
  }

  function closeBar(card) {
    const bar = card.querySelector(".infoBar");
    if (!bar) return;

    bar.style.height = "0px";
  }

  cards.forEach((card) => {
    setAccent(card);

    card.addEventListener("mouseenter", () => openBar(card));
    card.addEventListener("mouseleave", () => closeBar(card));

    card.addEventListener("focus", () => openBar(card));
    card.addEventListener("blur", () => closeBar(card));
  });

  window.addEventListener("resize", () => {
    cards.forEach((card) => {
      const bar = card.querySelector(".infoBar");
      if (!bar) return;

      const current = parseInt(bar.style.height || "0", 10);
      if (current > 0) openBar(card);
    });
  });
})();
