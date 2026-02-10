const hearts = document.querySelector(".hearts");

setInterval(() => {
  const heart = document.createElement("span");
  heart.innerText = Math.random() > 0.5 ? "💖" : "💗";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 14 + Math.random() * 20 + "px";
  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), 12000);
}, 800);
