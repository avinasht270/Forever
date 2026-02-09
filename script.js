// HEARTS ON LOAD
for (let i = 0; i < 20; i++) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDelay = Math.random() * 2 + "s";
  document.querySelector(".hearts-container").appendChild(heart);
}

// BEGIN BUTTON
document.getElementById("beginBtn").addEventListener("click", () => {
  // Haptic feedback (mobile)
  if (navigator.vibrate) {
    navigator.vibrate(80);
  }

  document.getElementById("landing").classList.remove("active");
  document.getElementById("password").classList.add("active");
});

// UNLOCK LOGIC
document.getElementById("unlockBtn").addEventListener("click", () => {
  const input = document.getElementById("dateInput").value;
  const error = document.getElementById("errorMsg");

  if (input === "2022-12-24") {
    if (navigator.vibrate) {
      navigator.vibrate([60, 40, 60]);
    }
    error.style.color = "green";
    error.innerText = "Unlocked 💖";

    setTimeout(() => {
      // PHASE 2 will start here
      alert("Phase 2 starts here 🚀");
    }, 800);
  } else {
    error.innerText = "Hmm… try again 😉";
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  }
});
