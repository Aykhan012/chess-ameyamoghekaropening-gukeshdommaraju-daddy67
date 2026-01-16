(() => {
  const cardsWrap = document.querySelector(".cards");
  const cards = Array.from(document.querySelectorAll(".card"));
  let openCard = null;

  const setAccent = (card) => {
    const accent = card.getAttribute("data-accent") || "120,120,255";
    card.style.setProperty("--accent", accent);
  };

  const parts = (card) => ({
    bar: card.querySelector(".infoBar"),
    inner: card.querySelector(".infoInner"),
  });

  const open = (card) => {
    const { bar, inner } = parts(card);
    if (!bar || !inner) return;

    cardsWrap.classList.add("focus");
    cards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");

    bar.style.height = inner.scrollHeight + "px";
    openCard = card;
  };

  const closeAll = () => {
    cardsWrap.classList.remove("focus");
    cards.forEach((c) => c.classList.remove("active"));
    cards.forEach((c) => {
      const { bar } = parts(c);
      if (bar) bar.style.height = "0px";
    });
    openCard = null;
  };

  cards.forEach((card) => {
    setAccent(card);
    card.addEventListener("mouseenter", () => open(card));
  });

  cardsWrap.addEventListener("mouseleave", closeAll);

  window.addEventListener("resize", () => {
    if (!openCard) return;
    const { bar, inner } = parts(openCard);
    if (!bar || !inner) return;
    bar.style.height = inner.scrollHeight + "px";
  });
})();
