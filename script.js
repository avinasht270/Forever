/* HEARTS */
const hearts = document.querySelector(".hearts");
let heartInterval = setInterval(spawnHeart, 1200);
function spawnHeart() {
  const h = document.createElement("span");
  h.innerText = Math.random() > 0.5 ? "💖" : "💗";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 12 + Math.random() * 18 + "px";
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 15000);
}

/* PHASE CONTROL */
function show(id) {
  document.querySelectorAll(".phase").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* LANDING */
beginBtn.onclick = () => show("password");

/* PASSWORD */
unlockBtn.onclick = () => {
  if (dateInput.value === "2022-12-24") {
    show("unlock");
    setTimeout(startGratitude, 2200);
  } else {
    error.style.display = "block";
  }
};

/* BACKGROUND */
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
    setTimeout(() => typeLine(line, i + 1), 34);
  } else {
    typing = false;
  }
}

/* GRATITUDE */
const gratitude = [
  "Before we go anywhere…",
  "I just want to say thank you.",
  "Thank you for choosing me.",
  "This… is our story."
];
let g = 0;
let mode = "gratitude";

/* STORY DATA */
const story = [
  {
    title: "The Beginning",
    scenes: [
      { img: "images/convocation1.jpg", lines: [
        "You were still in college.",
        "And yet, you crossed states just to be there for me."
      ]},
      { img: "images/convocation2.jpg", lines: [
        "Hiding it from home.",
        "Standing beside me among my friends."
      ]},
      { img: "images/convocation3.jpg", lines: [
        "That’s when I knew…",
        "This was real."
      ]}
    ]
  },
  {
    title: "Delhi",
    scenes: [
      { img: "images/delhi1.jpg", lines: [
        "A full week together.",
        "No filters. No distance."
      ]},
      { img: "images/delhi2.jpg", lines: [
        "Fancy dinners.",
        "Your English accent with waiters."
      ]},
      { img: "images/delhi3.jpg", lines: [
        "Delhi never felt this warm."
      ]}
    ]
  },
  {
    title: "Shillong",
    scenes: [
      { img: "images/shillong1.jpg", lines: [
        "Short visits between life and work.",
        "You managing everything on your own."
      ]},
      { img: "images/shillong2.jpg", lines: [
        "You didn’t love Shillong.",
        "But I loved watching you there."
      ]},
      { img: "images/shillong3.jpg", lines: [
        "Strong.",
        "Brave.",
        "Home."
      ]}
    ]
  },
  {
    title: "Manali",
    scenes: [
      { img: "images/manali1.jpg", lines: [
        "Yes. No. Not possible.",
        "Arguments before agreement."
      ]},
      { img: "images/manali2.jpg", lines: [
        "Scooter rides through mountains.",
        "Time felt too short."
      ]}
    ]
  },
  {
    title: "Dharamshala",
    scenes: [
      { img: "images/dharamshala1.jpg", lines: [
        "Your birthday week.",
        "Us. Again."
      ]},
      { img: "images/dharamshala2.jpg", lines: [
        "Small fights.",
        "Big love."
      ]},
      { img: "images/dharamshala3.jpg", lines: [
        "A 16km ride I still hear about.",
        "And I’d do it again."
      ]}
    ]
  }
];

let chapterIndex = 0, sceneIndex = 0, lineIndex = 0;
let chapterIntro = true;
let finished = false;

/* START */
function startGratitude() {
  show("story");
  typeLine(gratitude[g]);
}

/* TAP */
document.getElementById("story").onclick = () => {
  if (typing || finished) return;

  if (mode === "gratitude") {
    g++;
    if (g < gratitude.length) {
      typeLine(gratitude[g]);
    } else {
      mode = "chapter";
      chapterIntro = true;
      showChapter();
    }
    return;
  }

  if (chapterIntro) {
    chapterIntro = false;
    sceneIndex = 0;
    lineIndex = 0;
    setBg(story[chapterIndex].scenes[sceneIndex].img);
    typeLine(story[chapterIndex].scenes[sceneIndex].lines[lineIndex]);
    return;
  }

  lineIndex++;
  if (lineIndex < story[chapterIndex].scenes[sceneIndex].lines.length) {
    typeLine(story[chapterIndex].scenes[sceneIndex].lines[lineIndex]);
    return;
  }

  lineIndex = 0;
  sceneIndex++;
  if (sceneIndex < story[chapterIndex].scenes.length) {
    setBg(story[chapterIndex].scenes[sceneIndex].img);
    typeLine(story[chapterIndex].scenes[sceneIndex].lines[lineIndex]);
    return;
  }

  chapterIndex++;
  chapterIntro = true;
  if (chapterIndex < story.length) {
    showChapter();
  } else {
    finished = true;
    show("final");
  }
};

function showChapter() {
  const ch = document.getElementById("chapter");
  ch.innerText = "";
  ch.classList.remove("chapter-reveal");
  void ch.offsetWidth; // force reflow
  ch.innerText = story[chapterIndex].title;
  ch.classList.add("chapter-reveal");
  document.getElementById("typed-line").innerText = "";
}

/* FINAL */
noBtn.onclick = () => {
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * 70 + "%";
  noBtn.style.top = Math.random() * 70 + "%";
};

yesBtn.onclick = () => {
  clearInterval(heartInterval);
  heartInterval = setInterval(spawnHeart, 250);
  show("celebrate");
};
