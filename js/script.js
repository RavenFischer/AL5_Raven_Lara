// ---------------------------
// STARTSEITE: Image Slider
// ---------------------------
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

if (nextBtn && prevBtn && slides.length > 0) {
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
  showSlide(currentSlide);
}

// ---------------------------
// SHOPSEITE: Filterfunktion
// ---------------------------
const filter = document.getElementById("duft-filter");
const produkte = document.querySelectorAll(".produkt-card");

if (filter) {
  filter.addEventListener("change", () => {
    const selected = filter.value;
    produkte.forEach((card) => {
      const duft = card.getAttribute("data-duft");
      if (selected === "alle" || selected === duft) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// ------------------------------------
// KONTAKT: Formularvalidierung einfach
// ------------------------------------
const kontaktFormular = document.getElementById("kontaktformular");

if (kontaktFormular) {
  kontaktFormular.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const nachricht = document.getElementById("nachricht").value.trim();

    if (!name || !email || !nachricht) {
      alert("Bitte alle Felder ausfüllen.");
      return;
    }

    alert("Vielen Dank für deine Nachricht!");
    kontaktFormular.reset();
  });
}

// ---------------------------
// MEMORY-SPIEL (Basisversion)
// ---------------------------
const memoryContainer = document.getElementById("memory-spiel");
const memoryStatus = document.getElementById("memory-status");

if (memoryContainer) {
  const kartenSymbole = ["🕯️", "🌿", "🌸", "🍋", "🕯️", "🌿", "🌸", "🍋"];
  let offeneKarten = [];
  let geloestePaare = 0;

  kartenSymbole.sort(() => 0.5 - Math.random());

  kartenSymbole.forEach((symbol) => {
    const karte = document.createElement("div");
    karte.classList.add("memory-karte");
    karte.dataset.symbol = symbol;
    karte.textContent = "";
    karte.addEventListener("click", () => {
      if (karte.classList.contains("offen") || offeneKarten.length === 2)
        return;

      karte.textContent = symbol;
      karte.classList.add("offen");
      offeneKarten.push(karte);

      if (offeneKarten.length === 2) {
        setTimeout(() => {
          if (
            offeneKarten[0].dataset.symbol === offeneKarten[1].dataset.symbol
          ) {
            offeneKarten[0].style.backgroundColor = "#bbf7d0";
            offeneKarten[1].style.backgroundColor = "#bbf7d0";
            geloestePaare++;
            if (geloestePaare === kartenSymbole.length / 2) {
              memoryStatus.textContent =
                "Bravo! Du hast alle Paare gefunden! 🎉";
            }
          } else {
            offeneKarten.forEach((k) => {
              k.textContent = "";
              k.classList.remove("offen");
            });
          }
          offeneKarten = [];
        }, 800);
      }
    });
    memoryContainer.appendChild(karte);
  });
}
