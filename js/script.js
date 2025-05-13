function switchKategorie(name, button) {
  // Alle Kategorien deaktivieren
  document.querySelectorAll(".produkt-grid").forEach((grid) => {
    grid.classList.remove("active");
    grid.style.display = "none";
  });

  // Gewählte Kategorie aktivieren
  const selectedGrid = document.getElementById(name);
  selectedGrid.classList.add("active");
  selectedGrid.style.display = "grid";

  // Alle Buttons deaktivieren
  document.querySelectorAll(".kategorie-bar button").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Geklickten Button aktivieren
  button.classList.add("active");

  // Hero-Bild aktualisieren basierend auf data-image
  const hero = document.querySelector(".shop-hero");
  const image = button.getAttribute("data-image");
  if (image) {
    hero.style.backgroundImage = `url('${image}')`;
  }

  // Filter erneut anwenden (falls nötig)
  filterProdukte();
}

function nextSlide(btn) {
  const wrapper = btn.closest(".produkt-image-wrapper");
  const images = wrapper.querySelectorAll(".produkt-image");
  let current = [...images].findIndex((img) =>
    img.classList.contains("active")
  );

  images[current].classList.remove("active");
  current = (current + 1) % images.length;
  images[current].classList.add("active");
}

function prevSlide(btn) {
  const wrapper = btn.closest(".produkt-image-wrapper");
  const images = wrapper.querySelectorAll(".produkt-image");
  let current = [...images].findIndex((img) =>
    img.classList.contains("active")
  );

  images[current].classList.remove("active");
  current = (current - 1 + images.length) % images.length;
  images[current].classList.add("active");
}

function filterProdukte() {
  const farbe = document.getElementById("farbe-filter")?.value.toLowerCase();
  const duft = document.getElementById("duft-filter")?.value.toLowerCase();
  const brenndauer = document
    .getElementById("brenndauer-filter")
    ?.value.toLowerCase();

  document.querySelectorAll(".produkt-grid").forEach((grid) => {
    if (!grid.classList.contains("active")) return;

    grid.querySelectorAll(".produkt-card").forEach((card) => {
      const matchFarbe = !farbe || card.dataset.farbe === farbe;
      const matchDuft = !duft || card.dataset.duft === duft;
      const matchBrenndauer =
        !brenndauer || card.dataset.brenndauer === brenndauer;

      card.style.display =
        matchFarbe && matchDuft && matchBrenndauer ? "block" : "none";
    });
  });
}

// Standard-Kategorie automatisch aktivieren beim Laden
window.addEventListener("DOMContentLoaded", () => {
  const defaultBtn = document.querySelector(".kategorie-bar button.active");
  if (defaultBtn) {
    const defaultKategorie = defaultBtn
      .getAttribute("onclick")
      .match(/'(.+?)'/)[1];
    switchKategorie(defaultKategorie, defaultBtn);
  }
});

function nextSlide(btn) {
  const wrapper = btn.closest(".produkt-image-wrapper");
  const images = wrapper.querySelectorAll(".produkt-image");
  let current = [...images].findIndex((img) =>
    img.classList.contains("active")
  );

  images[current].classList.remove("active");
  current = (current + 1) % images.length;
  images[current].classList.add("active");
}

function prevSlide(btn) {
  const wrapper = btn.closest(".produkt-image-wrapper");
  const images = wrapper.querySelectorAll(".produkt-image");
  let current = [...images].findIndex((img) =>
    img.classList.contains("active")
  );

  images[current].classList.remove("active");
  current = (current - 1 + images.length) % images.length;
  images[current].classList.add("active");
}
