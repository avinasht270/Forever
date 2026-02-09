/* ---------- FLOATING HEARTS ---------- */
const hearts = document.querySelector(".hearts");
setInterval(() => {
  const h = document.createElement("span");
  h.innerText = Math.random() > 0.5 ? "💖" : "💗";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 14 + Math.random() * 20 + "px";
  h.style.animationDuration = 6 + Math.random() * 6 + "s";
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 12000);
}, 450);

/* ---------- PHASE SWITCH ---------- */
function showPhase(id) {
  document.querySelectorAll(".phase").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ---------- PHASE 1 ---------- */
document.getElementById("beginBtn").onclick = () => {
  navigator.vibrate?.(100);
  showPhase("password");
};

document.getElementById("unlockBtn").onclick = () => {
  const input = document.getElementById("dateInput").value;
  const error = document.getElementById("error");

  if (input === "2022-12-24") {
    navigator.vibrate?.([80, 40, 80]);
    startPhase2();
  } else {
    error.style.display = "block";
    navigator.vibrate?.(60);
  }
};

/* ---------- PHASE 2 DATA ---------- */
const stories = [
  {
    images: ["images/convocation1.jpg","images/convocation2.jpg","images/convocation3.jpg"],
    lines: [
      ["You travelled to another state just to be there for me.","Quietly. Without expectations."],
      ["We laughed, clicked pictures,","and celebrated one of the biggest days of my life."],
      ["That day wasn’t just about a degree.","It was about knowing I wasn’t alone anymore."]
    ]
  },
  {
    images: ["images/delhi1.jpg","images/delhi2.jpg","images/delhi3.jpg"],
    lines: [
      ["Delhi gave us time.","Time to live together."],
      ["Cafés. Silence. Small routines.","Everything felt natural with you."],
      ["Loving you wasn’t hard.","Living with you felt right."]
    ]
  },
  {
    images: ["images/shillong1.jpg","images/shillong2.jpg","images/shillong3.jpg","images/shillong4.jpg"],
    lines: [
      ["Short visits.","No big plans."],
      ["Just presence.","Just us."],
      ["Watching you manage life on your own","made me admire you even more."],
      ["Those moments mattered more","than you’ll ever know."]
    ]
  },
  {
    images: ["images/manali1.jpg","images/manali2.jpg"],
    lines: [
      ["Arguments.","Chaos."],
      ["And then… mountains.","Riding with you behind me."],
      ["I wished time would slow down.","Just a little."]
    ]
  },
  {
    images: ["images/dharamshala1.jpg","images/dharamshala2.jpg","images/dharamshala3.jpg"],
    lines: [
      ["Your birthday.","Our time."],
      ["Scooter rides. Cafés.","Small fights. Big love."],
      ["This is how I want to live.","My life — with you."]
    ]
  }
];

/* ---------- STORY ENGINE ---------- */
let s = 0, i = 0, l = 0, c = 0, typing = false;
const bg = document.getElementById("story-bg");
const text = document.getElementById("typed-line");

function startPhase2() {
  showPhase("story");
  loadImage();
  typeLine();
}

function loadImage() {
  bg.style.opacity = 0;
  setTimeout(() => {
    bg.style.backgroundImage = `url('${stories[s].images[i]}')`;
    bg.style.opacity = 1;
  }, 400);
}

function typeLine() {
  typing = true;
  text.innerText = "";
  const line = stories[s].lines[i][l];
  c = 0;

  const interval = setInterval(() => {
    text.innerText += line.charAt(c++);
    if (c >= line.length) {
      clearInterval(interval);
      typing = false;
    }
  }, 35);
}

document.getElementById("story").addEventListener("click", () => {
  if (typing) return;

  l++;
  if (l < stories[s].lines[i].length) {
    typeLine();
    return;
  }

  l = 0;
  i++;
  if (i < stories[s].images.length) {
    loadImage();
    typeLine();
    return;
  }

  s++; i = 0;
  if (s < stories.length) {
    loadImage();
    typeLine();
  } else {
    text.innerText = "And that’s how our story keeps growing… 💖";
  }
});
