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

    if (openCard && openCard !== card) close(openCard);

    cardsWrap.classList.add("focus");
    cards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");

    bar.style.height = inner.scrollHeight + "px";
    openCard = card;
  };

  const close = (card) => {
    const { bar } = parts(card);
    if (bar) bar.style.height = "0px";

    card.classList.remove("active");
    cardsWrap.classList.remove("focus");
    openCard = null;
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
    const { bar, inner } = parts(openCard);
    if (!bar || !inner) return;
    bar.style.height = inner.scrollHeight + "px";
  });
})();
