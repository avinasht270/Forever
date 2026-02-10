/* HEARTS */
const hearts = document.querySelector(".hearts");
setInterval(() => {
  const h = document.createElement("span");
  h.innerText = Math.random() > 0.5 ? "💖" : "💗";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 12 + Math.random() * 18 + "px";
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 15000);
}, 1200);

/* PHASE CONTROL */
function show(id) {
  document.querySelectorAll(".phase").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* LANDING */
beginBtn.onclick = () => {
  navigator.vibrate?.(80);
  show("password");
};

/* PASSWORD */
unlockBtn.onclick = () => {
  if (dateInput.value === "2022-12-24") {
    navigator.vibrate?.([60,30,60]);
    show("unlock");
    setTimeout(startGratitude, 2200);
  } else {
    error.style.display = "block";
  }
};

/* BACKGROUND SWAP */
const bgA = document.getElementById("bgA");
const bgB = document.getElementById("bgB");
let activeBg = bgA, nextBg = bgB;

function setBg(src) {
  nextBg.style.backgroundImage = `url(${src})`;
  nextBg.classList.remove("hidden");
  activeBg.classList.add("hidden");
  [activeBg, nextBg] = [nextBg, activeBg];
}

/* TYPEWRITER */
let typing = false;
function typeLine(line, i = 0) {
  typing = true;
  const el = document.getElementById("typed-line");
  el.innerText = line.slice(0, i);
  if (i < line.length) {
    setTimeout(() => typeLine(line, i + 1), 36);
  } else {
    typing = false;
  }
}

/* GRATITUDE */
const gratitude = [
  "Before we go anywhere…",
  "I just want to say thank you.",
  "Thank you for choosing me.",
  "For standing by my side.",
  "This… is our story."
];

let g = 0;
let mode = "gratitude";

function startGratitude() {
  show("story");
  chapter.innerText = "";
  typeLine(gratitude[g]);
}

/* STORY DATA */
const story = [
  {
    title: "The Beginning",
    images: ["images/convocation1.jpg","images/convocation2.jpg","images/convocation3.jpg"],
    lines: [
      "You crossed states just to be there for me.",
      "Standing beside me on the most important day of my life.",
      "That’s when I knew… this was real."
    ]
  },
  {
    title: "Delhi",
    images: ["images/delhi1.jpg","images/delhi2.jpg","images/delhi3.jpg"],
    lines: [
      "A full week together.",
      "Your accent with waiters.",
      "Delhi never felt this warm."
    ]
  },
  {
    title: "Shillong",
    images: ["images/shillong1.jpg","images/shillong2.jpg","images/shillong3.jpg"],
    lines: [
      "Short visits.",
      "No big plans.",
      "Just presence."
    ]
  },
  {
    title: "Manali",
    images: ["images/manali1.jpg","images/manali2.jpg"],
    lines: [
      "Arguments turned into laughter.",
      "Scooter rides through mountains.",
      "I wished time would stop."
    ]
  },
  {
    title: "Dharamshala",
    images: ["images/dharamshala1.jpg","images/dharamshala2.jpg"],
    lines: [
      "Your birthday week.",
      "Small fights. Big love.",
      "Every mile was worth it."
    ]
  }
];

let s = 0, i = 0, l = 0;

/* TAP TO PROGRESS */
document.getElementById("story").onclick = () => {
  if (typing) return;

  if (mode === "gratitude") {
    g++;
    if (g < gratitude.length) {
      typeLine(gratitude[g]);
    } else {
      mode = "story";
      chapter.innerText = story[s].title;
      setBg(story[s].images[i]);
      typeLine(story[s].lines[l]);
    }
    return;
  }

  l++;
  if (l < story[s].lines.length) {
    typeLine(story[s].lines[l]);
    return;
  }

  l = 0;
  i++;
  if (i < story[s].images.length) {
    setBg(story[s].images[i]);
    typeLine(story[s].lines[l]);
    return;
  }

  s++;
  i = 0;
  if (s < story.length) {
    chapter.innerText = story[s].title;
    setBg(story[s].images[i]);
    typeLine(story[s].lines[l]);
  } else {
    show("final");
  }
};

/* FINAL */
noBtn.onclick = () => {
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * 70 + "%";
  noBtn.style.top = Math.random() * 70 + "%";
};

yesBtn.onclick = () => {
  alert("I knew it 💖");
};
