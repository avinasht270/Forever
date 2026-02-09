// PASSWORD
function unlock() {
  const pass = document.getElementById("password").value;
  if (pass === "forever") {
    document.getElementById("lock").style.opacity = 0;
    setTimeout(() => document.getElementById("lock").remove(), 600);
  } else {
    document.getElementById("error").innerText = "Wrong password";
  }
}

// HEARTS
for (let i = 0; i < 18; i++) {
  const h = document.createElement("div");
  h.className = "heart";
  h.innerText = "💖";
  h.style.left = Math.random()*100+"vw";
  h.style.animationDelay = Math.random()+"s";
  document.querySelector(".hearts-container").appendChild(h);
}
setTimeout(() => document.querySelector(".hearts-container").remove(), 3000);

// MUSIC ON FIRST SCROLL
let musicStarted = false;
window.addEventListener("scroll", () => {
  if (!musicStarted) {
    const music = document.getElementById("bg-music");
    music.volume = 0;
    music.play();
    let v = 0;
    const fade = setInterval(() => {
      v += 0.05;
      music.volume = v;
      if (v >= 0.6) clearInterval(fade);
    }, 120);
    musicStarted = true;
  }
});

// SCROLL-PROGRESS IMAGE MORPH
document.querySelectorAll(".morph").forEach(stack => {
  const imgs = stack.querySelectorAll("img");
  imgs[0].classList.add("visible");

  window.addEventListener("scroll", () => {
    const rect = stack.parentElement.getBoundingClientRect();
    const progress = 1 - Math.abs(rect.top) / window.innerHeight;
    const index = Math.min(
      imgs.length - 1,
      Math.max(0, Math.floor(progress * imgs.length))
    );
    imgs.forEach(img => img.classList.remove("visible"));
    imgs[index].classList.add("visible");
  });
});

// TEXT ANIMATION
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelector(".text-animate")?.classList.add("show");
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".observe").forEach(s => observer.observe(s));

function answer() {
  document.getElementById("reply").innerHTML =
    "<p>I’ll choose you — every single day ❤️<br>— Avinash</p>";
}
