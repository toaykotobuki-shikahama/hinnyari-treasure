(function () {
  "use strict";

  const config = window.TREASURE_CONFIG;
  const dateControl = window.TREASURE_DATE_CONTROL;

  function todayInCampaignTimezone() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: config.timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date());

    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return `${values.year}-${values.month}-${values.day}`;
  }

  function currentDate() {
    if (dateControl.mode === "test") return dateControl.testDate;
    return todayInCampaignTimezone();
  }

  function findDay(date) {
    return config.days.find((day) => day.date === date);
  }

  function setScreen(name) {
    document.querySelectorAll("[data-screen]").forEach((screen) => {
      screen.hidden = screen.dataset.screen !== name;
    });
  }

  function showStatus(date) {
    if (date < config.startDate) {
      setScreen("before");
      return;
    }
    if (date > config.endDate) {
      setScreen("after");
      return;
    }
    setScreen("unavailable");
  }

  function initProblemPage() {
    const date = currentDate();
    const day = findDay(date);

    if (!day) {
      showStatus(date);
      return;
    }

    document.querySelector("[data-day-label]").textContent = `${day.label}のなぞ`;
    const image = document.querySelector("[data-problem-image]");
    image.src = day.image;
    image.alt = `${day.label}の問題画像`;
    image.addEventListener("error", () => {
      document.querySelector("[data-image-error]").hidden = false;
    });

    const openButton = document.querySelector("[data-open-puzzle]");
    const puzzleArea = document.querySelector("[data-puzzle-area]");
    openButton.addEventListener("click", () => {
      puzzleArea.hidden = false;
      openButton.hidden = true;
      puzzleArea.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    setScreen("today");
  }

  function safeEqual(a, b) {
    if (a.length !== b.length) return false;
    let mismatch = 0;
    for (let index = 0; index < a.length; index += 1) {
      mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
    }
    return mismatch === 0;
  }

  function initCompletePage() {
    const date = currentDate();
    const params = new URLSearchParams(location.search);
    const requestedDay = params.get("day") || "";
    const suppliedKey = params.get("key") || "";
    const day = findDay(date);

    if (
      !day ||
      requestedDay !== day.date.replaceAll("-", "") ||
      !safeEqual(suppliedKey, day.key)
    ) {
      setScreen("invalid");
      return;
    }

    const image = document.querySelector("[data-answer-image]");
    image.src = day.image;
    image.alt = `${day.label}の答え`;
    image.addEventListener("error", () => {
      document.querySelector("[data-image-error]").hidden = false;
    });
    setScreen("complete");
  }

  const page = document.body.dataset.page;
  if (page === "problem") initProblemPage();
  if (page === "complete") initCompletePage();
})();
