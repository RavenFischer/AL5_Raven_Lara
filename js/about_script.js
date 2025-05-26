// Navigation Menu
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  toggleButton.addEventListener("click", function () {
    nav.classList.toggle("visible");
  });
});

// Kontaktformular
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("kontaktformular");
  const erfolg = document.getElementById("erfolgsmeldung");
  const spinner = document.getElementById("spinner");

  // Spinner beim Start verstecken
  spinner.classList.add("versteckt");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // ❌ Diese Zeile bitte entfernen – war doppelt:
    // const spinner = document.getElementById("spinner");

    spinner.classList.remove("versteckt");

    // Eingabewerte
    const vorname = form.vorname.value.trim();
    const nachname = form.nachname.value.trim();
    const email = form.email.value.trim();
    const telefon = form.telefon.value.trim();
    const bemerkung = form.bemerkung.value.trim();

    // Fehler-Reset
    document
      .querySelectorAll(".fehlermeldung")
      .forEach((el) => (el.textContent = ""));

    let fehler = false;

    if (vorname.length < 2) {
      document.getElementById("fehler-vorname").textContent =
        "Mindestens 2 Buchstaben.";
      fehler = true;
    }

    if (nachname.length < 2) {
      document.getElementById("fehler-nachname").textContent =
        "Mindestens 2 Buchstaben.";
      fehler = true;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      document.getElementById("fehler-email").textContent =
        "Bitte gültige E-Mail eingeben.";
      fehler = true;
    }

    if (telefon && !telefon.match(/^[0-9 +().-]{6,}$/)) {
      document.getElementById("fehler-telefon").textContent =
        "Ungültige Telefonnummer.";
      fehler = true;
    }

    if (bemerkung.length < 2) {
      document.getElementById("fehler-bemerkung").textContent =
        "Bitte Bemerkung eingeben.";
      fehler = true;
    }

    if (!fehler) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      erfolg.classList.remove("versteckt");
      form.reset();
    } else {
      erfolg.classList.add("versteckt");
    }

    spinner.classList.add("versteckt");
  });
});

/* Memory-Spiel */
document.addEventListener("DOMContentLoaded", function () {
  const bilder = [
    "img/Dekorationskerze_Eukalyptus.jpg",
    "img/Dekorationskerze_Eukalyptus.jpg",
    "img/Dekorationskerze_Orchidee.jpg",
    "img/Dekorationskerze_Orchidee.jpg",
    "img/Kerze_im_Glas_Golden_Harvest.jpg",
    "img/Kerze_im_Glas_Golden_Harvest.jpg",
    "img/Kerze_im_Glas_Spiced_Orange.jpg",
    "img/Kerze_im_Glas_Spiced_Orange.jpg",
    "img/Spezialkerze_Wild_Berry.jpg",
    "img/Spezialkerze_Wild_Berry.jpg",
    "img/Spezialkerze_Caramel_Popcorn.jpg",
    "img/Spezialkerze_Caramel_Popcorn.jpg",
    "img/Teelicht_Apfel.jpg",
    "img/Teelicht_Apfel.jpg",
    "img/Teelicht_Granatapfel.jpg",
    "img/Teelicht_Granatapfel.jpg",
  ];

  let memoryCards = [];
  let flippedCards = [];
  let timer;
  let timeLeft = 30;
  let started = false;

  const timeDisplay = document.getElementById("zeit");
  const grid = document.getElementById("memory-grid");
  const erfolgsBox = document.getElementById("memory-info");
  const timerBox = document.getElementById("timer");
  const startButton = document.getElementById("start-button");

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timeDisplay.textContent = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timer);
        alert("⏰ Zeit abgelaufen! Versuche es noch einmal.");
        location.reload();
      }
    }, 1000);
  }

  function createMemoryGame() {
    memoryCards = shuffle([...bilder]);
    grid.innerHTML = "";
    memoryCards.forEach((bild, index) => {
      const card = document.createElement("div");
      card.classList.add("memory-card");
      card.dataset.bild = bild;
      card.dataset.index = index;
      card.innerHTML = `<img src="${bild}" alt="Kerze" class="card-image" />`;
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    });
  }

  function flipCard(e) {
    const card = e.currentTarget;
    if (
      !started ||
      card.classList.contains("flipped") ||
      flippedCards.length === 2
    )
      return;

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (card1.dataset.bild === card2.dataset.bild) {
        flippedCards = [];
        if (
          document.querySelectorAll(".memory-card.flipped").length ===
          memoryCards.length
        ) {
          clearInterval(timer);
          erfolgsBox.classList.remove("versteckt");
        }
      } else {
        setTimeout(() => {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          flippedCards = [];
        }, 1000);
      }
    }
  }

  startButton.addEventListener("click", function () {
    started = true;
    timeLeft = 30;
    timeDisplay.textContent = timeLeft;
    erfolgsBox.classList.add("versteckt");
    timerBox.classList.remove("versteckt");
    grid.classList.remove("versteckt");
    createMemoryGame();
    startTimer();
  });
});

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
