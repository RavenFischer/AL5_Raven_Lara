// Navigation Menu
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  toggleButton.addEventListener("click", function () {
    nav.classList.toggle("visible");
  });
});

// Kategorien
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

window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash.substring(1); // z. B. "spezialkerzen"
  if (hash) {
    const button = document.querySelector(
      `.kategorie-bar button[onclick*="${hash}"]`
    );
    if (button) {
      switchKategorie(hash, button);
    }
  }
});

// Filter
document.addEventListener("DOMContentLoaded", function () {
  const duftFilter = document.getElementById("duft-filter");
  const farbeFilter = document.getElementById("farbe-filter");
  const brenndauerFilter = document.getElementById("brenndauer-filter");

  const produkte = document.querySelectorAll(".produkt-card");

  function filterProdukte() {
    const duft = duftFilter.value;
    const farbe = farbeFilter.value;
    const brenndauer = brenndauerFilter.value;

    produkte.forEach((produkt) => {
      const duftWert = produkt.dataset.duft;
      const farbeWert = produkt.dataset.farbe;
      const brenndauerWert = produkt.dataset.brenndauer;

      const duftOK = !duft || duft === duftWert;
      const farbeOK = !farbe || farbe === farbeWert;
      const brenndauerOK = !brenndauer || brenndauer === brenndauerWert;

      if (duftOK && farbeOK && brenndauerOK) {
        produkt.style.display = "flex";
      } else {
        produkt.style.display = "none";
      }
    });
  }

  duftFilter.addEventListener("change", filterProdukte);
  farbeFilter.addEventListener("change", filterProdukte);
  brenndauerFilter.addEventListener("change", filterProdukte);
});

// Slideshow
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

// Pop-Up Disclaimer
document.addEventListener("DOMContentLoaded", function () {
  const disclaimerLink = document.getElementById("disclaimer-link");
  const modal = document.getElementById("disclaimer-modal");
  const closeBtn = document.querySelector(".modal-schliessen");

  if (disclaimerLink && modal && closeBtn) {
    disclaimerLink.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.remove("versteckt");
    });

    closeBtn.addEventListener("click", function () {
      modal.classList.add("versteckt");
    });

    window.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.add("versteckt");
      }
    });
  }
});
