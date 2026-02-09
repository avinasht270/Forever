// HEARTS
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

// PHASE SWITCH
function showPhase(id) {
  document.querySelectorAll(".phase").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// BEGIN
document.getElementById("beginBtn").onclick = () => {
  navigator.vibrate?.(100);
  showPhase("password");
};

// UNLOCK
document.getElementById("unlockBtn").onclick = () => {
  const input = document.getElementById("dateInput").value;
  const error = document.getElementById("error");

  if (input === "2022-12-24") {
    navigator.vibrate?.([80,40,80]);
    showPhase("story");
  } else {
    error.style.display = "block";
    navigator.vibrate?.(60);
  }
};

// STORY NAVIGATION
const chapters = document.querySelectorAll(".chapter");
let index = 0;

chapters[index].classList.add("active");

document.querySelectorAll(".next").forEach(btn => {
  btn.onclick = () => {
    chapters[index].classList.remove("active");
    index++;
    chapters[index].classList.add("active");

    const imgs = chapters[index].querySelectorAll(".image-stack img");
    if (imgs.length > 1) {
      let i = 0;
      imgs[i].classList.add("active");
      setInterval(() => {
        imgs[i].classList.remove("active");
        i = (i + 1) % imgs.length;
        imgs[i].classList.add("active");
      }, 3500);
    }
  };
});
