// Interactive Valentines app
window.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const buttonsWrap = document.querySelector(".buttons");
  const overlay = document.getElementById("overlay");
  const heartsContainer = document.getElementById("hearts");
  const successPage = document.getElementById("successPage");
  const bgHearts = document.getElementById("bgHearts");

  if (
    !yesBtn ||
    !noBtn ||
    !buttonsWrap ||
    !overlay ||
    !heartsContainer ||
    !successPage ||
    !bgHearts
  ) {
    console.warn("Missing DOM elements");
    return;
  }

  // Create animated background hearts
  function createBackgroundHearts() {
    const hearts = ["💖", "💕", "💗", "💘", "💝", "🌹", "💐"];

    for (let i = 0; i < 22; i++) {
      const heart = document.createElement("div");
      heart.className = "bg-heart";
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + "%";
      heart.style.fontSize = 1.5 + Math.random() * 1.5 + "rem";
      heart.style.opacity = 0.2 + Math.random() * 0.2;
      const duration = 8 + Math.random() * 4;
      heart.style.animationDuration = duration + "s";
      heart.style.animationDelay = Math.random() * 2 + "s";
      bgHearts.appendChild(heart);
    }

    // Regenerate hearts periodically
    setInterval(() => {
      const oldHeart = bgHearts.querySelector(".bg-heart");
      if (oldHeart) {
        const newHeart = document.createElement("div");
        newHeart.className = "bg-heart";
        newHeart.textContent =
          hearts[Math.floor(Math.random() * hearts.length)];
        newHeart.style.left = Math.random() * 100 + "%";
        newHeart.style.fontSize = 1.5 + Math.random() * 1.5 + "rem";
        newHeart.style.opacity = 0.2 + Math.random() * 0.2;
        const duration = 8 + Math.random() * 4;
        newHeart.style.animationDuration = duration + "s";
        newHeart.style.animationDelay = "0s";
        bgHearts.appendChild(newHeart);

        if (bgHearts.children.length > 15) {
          oldHeart.remove();
        }
      }
    }, 3000);
  }

  // Create falling petals
  function createFallingPetals() {
    setInterval(() => {
      const petal = document.createElement("div");
      petal.className = "falling-petal";
      const delay = Math.random() * 2;
      const duration = 6 + Math.random() * 4;
      petal.style.left = Math.random() * 100 + "%";
      petal.style.animationDelay = delay + "s";
      petal.style.animationDuration = duration + "s";
      document.body.appendChild(petal);

      setTimeout(() => petal.remove(), duration * 1000 + delay * 1000);
    }, 800);
  }

  let noBtnDisabled = false;
  let placeholder = null;

  // Dodge the No button away from mouse
  function moveNoBtnAway() {
    // Create placeholder to maintain layout if not already created
    if (!placeholder) {
      placeholder = document.createElement("div");
      placeholder.className = "no-placeholder";
      placeholder.textContent = "No";
      noBtn.parentNode.insertBefore(placeholder, noBtn);
    }

    // Add dodging class to switch to absolute positioning
    noBtn.classList.add("dodging");

    const wrap = buttonsWrap.getBoundingClientRect();
    const btnWidth = 80; // Approximate button width
    const btnHeight = 50; // Approximate button height

    // Always make dramatic jumps - force it to corners and edges every time!
    const containerWidth = wrap.width;
    const containerHeight = Math.max(wrap.height, 150);

    // Get current button position to avoid staying in same area
    const currentBtn = noBtn.getBoundingClientRect();
    const currentX = currentBtn.left - wrap.left;
    const currentY = currentBtn.top - wrap.top;

    // Define dramatic positions - corners and edges
    const dramaticPositions = [
      { x: 20, y: 20 }, // Top left corner
      { x: containerWidth - btnWidth - 20, y: 20 }, // Top right corner
      { x: 20, y: containerHeight - btnHeight - 20 }, // Bottom left corner
      {
        x: containerWidth - btnWidth - 20,
        y: containerHeight - btnHeight - 20,
      }, // Bottom right corner
      { x: 20, y: containerHeight / 2 - btnHeight / 2 }, // Left edge center
      {
        x: containerWidth - btnWidth - 20,
        y: containerHeight / 2 - btnHeight / 2,
      }, // Right edge center
      { x: containerWidth / 2 - btnWidth / 2, y: 20 }, // Top edge center
      {
        x: containerWidth / 2 - btnWidth / 2,
        y: containerHeight - btnHeight - 20,
      }, // Bottom edge center
    ];

    // Filter out positions that are too close to current position
    const farPositions = dramaticPositions.filter((pos) => {
      const distance = Math.sqrt(
        Math.pow(pos.x - currentX, 2) + Math.pow(pos.y - currentY, 2),
      );
      return distance > 100; // Must be at least 100px away
    });

    // If no far positions available, use all positions
    const availablePositions =
      farPositions.length > 0 ? farPositions : dramaticPositions;

    // Pick a random dramatic position
    const randomPosition =
      availablePositions[Math.floor(Math.random() * availablePositions.length)];

    noBtn.style.left = `${randomPosition.x}px`;
    noBtn.style.top = `${randomPosition.y}px`;
  }

  // Dodge on mouse move
  buttonsWrap.addEventListener("mousemove", (e) => {
    if (noBtnDisabled) return;

    const btn = noBtn.getBoundingClientRect();
    const dist = Math.sqrt(
      Math.pow(e.clientX - (btn.left + btn.width / 2), 2) +
        Math.pow(e.clientY - (btn.top + btn.height / 2), 2),
    );

    if (dist < 100) {
      moveNoBtnAway();
    }
  });

  // Block clicks on No button
  noBtn.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      moveNoBtnAway();
    },
    true,
  );

  // Hearts animation
  function createHearts(count = 30) {
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("span");
      heart.className = "heart";
      heart.textContent = "💖";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.fontSize = 12 + Math.random() * 24 + "px";
      const duration = 3000 + Math.random() * 2000;
      const delay = Math.random() * 600;
      heart.style.animationDuration = duration + "ms";
      heart.style.animationDelay = delay + "ms";
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), duration + delay + 100);
    }
  }

  // Get image transition elements
  const imageTransition1 = document.getElementById("imageTransition1");
  const imageTransition2 = document.getElementById("imageTransition2");
  const imageTransition3 = document.getElementById("imageTransition3");

  // Function to hide main page elements
  function hideMainPage() {
    document.querySelector(".container").style.display = "none";
    document.querySelector(".rose-container").style.display = "none";
    document.querySelector(".rose-foreground").style.display = "none";
    document.querySelector(".background-hearts").style.display = "none";
  }

  // Function to create floating hearts and roses
  function createFloatingElements(container) {
    const hearts = ["💖", "💕", "💗", "💘", "💝", "❤️", "💓", "💞"];
    const roses = ["🌹", "🌺", "🌸", "💐"];

    // Create hearts
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + "%";
      heart.style.animationDelay = Math.random() * 2 + "s";
      container.appendChild(heart);

      // Remove after animation
      setTimeout(() => heart.remove(), 4000 + Math.random() * 1000);
    }

    // Create roses
    for (let i = 0; i < 8; i++) {
      const rose = document.createElement("div");
      rose.className = "floating-rose";
      rose.textContent = roses[Math.floor(Math.random() * roses.length)];
      rose.style.left = Math.random() * 100 + "%";
      rose.style.animationDelay = Math.random() * 3 + "s";
      container.appendChild(rose);

      // Remove after animation
      setTimeout(() => rose.remove(), 5000 + Math.random() * 1000);
    }
  }

  // Function to create sparkles
  function createSparkles(container) {
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = Math.random() * 100 + "%";
      sparkle.style.top = Math.random() * 100 + "%";
      sparkle.style.animationDelay = Math.random() * 2 + "s";
      container.appendChild(sparkle);

      // Remove after animation
      setTimeout(() => sparkle.remove(), 3000 + Math.random() * 1000);
    }
  }

  // Yes button handler with image transitions
  yesBtn.addEventListener("click", () => {
    noBtnDisabled = true;
    yesBtn.disabled = true;
    noBtn.disabled = true;

    document.body.classList.add("celebrate");
    overlay.classList.remove("hidden");

    createHearts(50);
    setTimeout(() => createHearts(30), 600);
    setTimeout(() => createHearts(30), 1200);
    setTimeout(() => createHearts(20), 1800);

    // Start image transition sequence after initial celebration
    setTimeout(() => {
      // Hide main page and overlay, show first image
      hideMainPage();
      overlay.classList.add("hidden");
      imageTransition1.classList.remove("hidden");
      imageTransition1.classList.add("show");

      // Add floating animations
      const heartsContainer1 =
        imageTransition1.querySelector(".transition-hearts");
      const sparklesContainer1 = imageTransition1.querySelector(
        ".transition-sparkles",
      );
      createFloatingElements(heartsContainer1);
      createSparkles(sparklesContainer1);
    }, 2000);

    // Transition to second image (shorter first image - 1.5 seconds)
    setTimeout(() => {
      imageTransition1.classList.remove("show");
      setTimeout(() => {
        imageTransition1.classList.add("hidden");
        imageTransition2.classList.remove("hidden");
        imageTransition2.classList.add("show");

        // Add floating animations
        const heartsContainer2 =
          imageTransition2.querySelector(".transition-hearts");
        const sparklesContainer2 = imageTransition2.querySelector(
          ".transition-sparkles",
        );
        createFloatingElements(heartsContainer2);
        createSparkles(sparklesContainer2);
      }, 800);
    }, 3500);

    // Transition to third image with text overlay (longer second image - 4 seconds)
    setTimeout(() => {
      imageTransition2.classList.remove("show");
      setTimeout(() => {
        imageTransition2.classList.add("hidden");
        imageTransition3.classList.remove("hidden");
        imageTransition3.classList.add("show");

        // Add floating animations
        const heartsContainer3 =
          imageTransition3.querySelector(".transition-hearts");
        const sparklesContainer3 = imageTransition3.querySelector(
          ".transition-sparkles",
        );
        createFloatingElements(heartsContainer3);
        createSparkles(sparklesContainer3);
      }, 800);
    }, 7500);

    // Optional: Show success page after all images (longer third image - 6 seconds)
    setTimeout(() => {
      successPage.classList.add("show");
    }, 13500);
  });

  // Initial No button position
  // (removed) keep buttons aligned on load; dodge only on mousemove

  // Start background hearts animation
  createBackgroundHearts();
});
