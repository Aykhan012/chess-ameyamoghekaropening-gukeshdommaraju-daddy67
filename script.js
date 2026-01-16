(() => {
  const wrap = document.getElementById("cardsWrap");
  const cards = Array.from(document.querySelectorAll(".card"));
  let active = null;

  const setAccent = (card) => {
    const accent = card.getAttribute("data-accent") || "120,120,255";
    card.style.setProperty("--accent", accent);
  };

  const openBar = (card) => {
    const bar = card.querySelector(".infoBar");
    const inner = card.querySelector(".infoInner");
    if (!bar || !inner) return;
    bar.style.height = inner.scrollHeight + "px";
  };

  const closeBar = (card) => {
    const bar = card.querySelector(".infoBar");
    if (!bar) return;
    bar.style.height = "0px";
  };

  const focusCard = (card) => {
    if (!wrap) return;

    wrap.classList.add("focus");
    cards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");

    if (active && active !== card) closeBar(active);
    openBar(card);
    active = card;
  };

  const clearFocus = () => {
    if (!wrap) return;

    wrap.classList.remove("focus");
    cards.forEach((c) => c.classList.remove("active"));
    cards.forEach((c) => closeBar(c));
    active = null;
  };

  cards.forEach((card) => {
    setAccent(card);

    card.addEventListener("mouseenter", () => focusCard(card));
    card.addEventListener("focusin", () => focusCard(card));
  });

  if (wrap) {
    wrap.addEventListener("mouseleave", clearFocus);
  }

  window.addEventListener("resize", () => {
    if (!active) return;
    openBar(active);
  });
})();
