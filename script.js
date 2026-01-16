(() => {
  const cards = Array.from(document.querySelectorAll(".card"));
  let openCard = null;

  const setAccent = (card) => {
    const accent = card.getAttribute("data-accent") || "120,120,255";
    card.style.setProperty("--accent", accent);
  };

  const getParts = (card) => {
    const bar = card.querySelector(".infoBar");
    const inner = card.querySelector(".infoInner");
    return { bar, inner };
  };

  const open = (card) => {
    const { bar, inner } = getParts(card);
    if (!bar || !inner) return;

    if (openCard && openCard !== card) close(openCard);

    bar.style.height = inner.scrollHeight + "px";
    openCard = card;

    document.body.classList.add("greenHover");
  };

  const close = (card) => {
    const { bar } = getParts(card);
    if (!bar) return;

    bar.style.height = "0px";
    if (openCard === card) openCard = null;

    document.body.classList.remove("greenHover");
  };

  cards.forEach((card) => {
    setAccent(card);

    card.addEventListener("mouseenter", () => open(card));
    card.addEventListener("mouseleave", () => close(card));

    card.addEventListener("focusin", () => open(card));
    card.addEventListener("focusout", () => close(card));
  });

  window.addEventListener("resize", () => {
    if (!openCard) return;
    const { bar, inner } = getParts(openCard);
    if (!bar || !inner) return;
    bar.style.height = inner.scrollHeight + "px";
  });
})();
