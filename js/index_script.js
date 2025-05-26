document.addEventListener("DOMContentLoaded", function () {
  const begrussung = document.getElementById("begrussung");

  // Prüfen, ob es ein echter Aufruf oder Reload ist
  const navigationType = performance.getEntriesByType("navigation")[0].type;

  if (navigationType === "reload" || navigationType === "navigate") {
    // Animation wird angezeigt
    begrussung.style.display = "flex";
  } else {
    // Bei "back_forward" (z. B. Zurück-Button oder interne Navigation) wird es nicht angezeigt
    if (begrussung) {
      begrussung.style.display = "none";
    }
  }
});

// Navigation Menu
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  toggleButton.addEventListener("click", function () {
    nav.classList.toggle("visible");
  });
});

// Disclaimer-Popup
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("disclaimer-modal");
  const link = document.getElementById("disclaimer-link");
  const close = document.querySelector(".modal-schliessen");

  link.addEventListener("click", function (e) {
    e.preventDefault(); // verhindert das Springen
    modal.classList.remove("versteckt");
  });

  close.addEventListener("click", function () {
    modal.classList.add("versteckt");
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.add("versteckt");
    }
  });
});
