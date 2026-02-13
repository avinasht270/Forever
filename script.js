const music = document.getElementById("bgMusic");
const bgLayer = document.getElementById("globalBackground");

/* STORY DATA */
const story = [
    {
        title: "Convocation",
        scenes: [
            { img: "images/convocation1.jpg", text: "You took a leap of faith, flying across the states while still in college..." },
            { img: "images/convocation2.jpg", text: "...hiding it from home just to stand by my side, on one of my most important day of life" },
            { img: "images/convocation3.jpg", text: "In that crowded hall, I knew right then: You are my forever." }
        ]
    },
    {
        title: "Delhi",
        scenes: [
            { img: "images/delhi1.jpg", text: "They say living together reveals who a person truly is." },
            { img: "images/delhi2.jpg", text: "For us? It revealed magic. Just you, me, and the city lights." },
            { img: "images/delhi3.jpg", text: "We didn't just survive the close quarters; we flourished." }
        ]
    },
    {
        title: "Shillong",
        scenes: [
            { img: "images/shillong1.jpg", text: "You never really liked Shillong much. But I loved seeing you there" },
            { img: "images/shillong2.jpg", text: "Managing everything on your own. Away from home, but never weak" },
            { img: "images/shillong3.jpg", text: "Strong. Mature. And still the same clumsy girl I tease." }
        ]
    },
    {
        title: "Manali Chaos",
        scenes: [
            { img: "images/manali1.jpg", text: "Yes. No. Not possible. Arguments. And then finally… we’re going." },
            { img: "images/manali2.jpg", text: "Mountains. Scooter rides. You behind me. For two days, the world felt paused. I wished it lasted longer." }
        ]
    },
    {
        title: "Dharamshala",
        scenes: [
            { img: "images/dharamshala1.jpg", text: "Your birthday week. Scooters and café hopping. Small fights. Big love." },
            { img: "images/dharamshala2.jpg", text: "And that 16km Himachali Dham ride? Maybe unnecessary. Still worth it." },
            { img: "images/dharamshala3.jpg", text: "We never let arguments win. Our fights don't break us; they build us." }
        ]
    }
];

let chapterIndex = 0;
let sceneIndex = 0;
let isTyping = false;
let heartInterval;
let musicInterval;

// --- NAVIGATION ---
function goTo(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(id);
    target.classList.add("active");

    // Clear manual Backgrounds first
    bgLayer.style.backgroundImage = "none";

    if (id === "chapterStory") {
        bgLayer.className = "background-layer dark-mode-bg";
        stopHearts();
    } 
    else if (id === "preQuestion") {
        bgLayer.className = "background-layer suspense-mode";
        stopHearts();
        fadeOutMusic();
    }
    else if (id === "final") {
        bgLayer.className = "background-layer"; // Clean class
        // FORCE FOREVER.JPG BACKGROUND
        bgLayer.style.backgroundImage = "url('images/forever.jpg')";
        stopHearts();
    }
    else {
        bgLayer.className = "background-layer light-mode";
        if (!heartInterval) startHearts();
    }
}

function unlock() {
    const val = document.getElementById("dateInput").value;
    if (val === "2022-12-24") {
        goTo("gratitude");
        fadeInMusic();
    } else {
        document.getElementById("errorMsg").innerText = "Oops! Not correct. Think about the Airport 😉";
    }
}

function startStory() {
    chapterIndex = 0; sceneIndex = 0;
    playChapter(0);
}

function playChapter(index) {
    goTo("chapterStory");
    
    const overlay = document.getElementById("cinematicOverlay");
    const bigTitle = document.getElementById("chapterTitleDisplay");
    const staticTitle = document.getElementById("staticChapterTitle");
    const bg = document.getElementById("storyBg");

    // 1. Reset & Hide UI
    document.getElementById("nextChapterBtn").classList.add("hidden");
    document.getElementById("tapPrompt").style.display = "none"; 
    document.getElementById("storyText").innerText = "";
    
    // Hide titles initially so they don't ghost
    staticTitle.classList.add("hidden-fade"); 
    bigTitle.style.opacity = 0; 

    // 2. Fade Overlay to Black
    overlay.style.opacity = 1;
    
    // 3. WAIT for black screen, THEN swap text
    setTimeout(() => {
        bigTitle.innerText = story[index].title;
        staticTitle.innerText = story[index].title;
        
        // Fade in Big Title now that it's updated
        bigTitle.style.opacity = 1; 
        
        const imgUrl = story[index].scenes[0].img;
        const img = new Image();
        img.src = imgUrl;
        
        img.onload = () => {
            bg.style.backgroundImage = `url('${imgUrl}')`;
            
            // 4. Reveal Scene
            setTimeout(() => {
                bigTitle.style.opacity = 0; // Fade out big title first
                setTimeout(() => {
                    overlay.style.opacity = 0; // Then fade overlay
                    bg.classList.add("loaded"); 
                    staticTitle.classList.remove("hidden-fade"); // Show static title
                    setTimeout(() => showScene(), 500);
                }, 800);
            }, 2000);
        };
    }, 1000);
}

function showScene() {
    const chapter = story[chapterIndex];
    const scene = chapter.scenes[sceneIndex];
    const bg = document.getElementById("storyBg");

    document.getElementById("tapPrompt").style.display = "none";
    document.getElementById("nextChapterBtn").classList.add("hidden");

    if (sceneIndex > 0) {
        const nextImg = new Image();
        nextImg.src = scene.img;
        nextImg.onload = () => {
            bg.style.backgroundImage = `url('${scene.img}')`;
            startTyping(scene.text, chapter);
        }
    } else {
        startTyping(scene.text, chapter);
    }
}

function startTyping(text, chapter) {
    typeWriter("storyText", text, () => {
        if (sceneIndex < chapter.scenes.length - 1) {
            document.getElementById("tapPrompt").style.display = "block";
        } else {
            document.getElementById("tapPrompt").style.display = "none";
            document.getElementById("nextChapterBtn").classList.remove("hidden");
        }
    });
}

document.getElementById("chapterStory").onclick = (e) => {
    if (e.target.id === "nextChapterBtn") return;
    if (isTyping) return;
    const prompt = document.getElementById("tapPrompt");
    if (prompt.style.display === "block") {
        sceneIndex++;
        showScene();
    }
};

document.getElementById("nextChapterBtn").onclick = (e) => {
    e.stopPropagation();
    
    // TRANSITION START: Fade to Black
    const overlay = document.getElementById("cinematicOverlay");
    document.getElementById("staticChapterTitle").classList.add("hidden-fade");
    overlay.style.opacity = 1;

    setTimeout(() => {
        chapterIndex++;
        sceneIndex = 0;
        document.getElementById("storyBg").classList.remove("loaded");
        
        if (chapterIndex < story.length) {
            playChapter(chapterIndex);
        } else {
            showTogetherPage();
        }
    }, 1200);
};

// --- ENDING ---
function showTogetherPage() {
    goTo("together");
    const text = "We've traveled miles, fought battles, and built a home in each other's hearts.\n\nThrough every stumble and every laugh, I choose you.\n\nToday, tomorrow, always.\n\n";
    typeWriter("togetherText", text);
    
    setTimeout(() => {
        document.getElementById("together").onclick = () => {
            document.getElementById("together").onclick = null;
            goTo("preQuestion");
        };
    }, 3000);
}

document.getElementById("preQuestion").onclick = () => goTo("final");

document.getElementById("noBtn").onmouseover = function() {
    this.style.position = "absolute";
    this.style.left = Math.random() * 80 + "%";
    this.style.top = Math.random() * 80 + "%";
};

function sayYes() {
    bgLayer.style.backgroundImage = "none";
    bgLayer.className = "background-layer light-mode";
    startHearts(); 
    
    goTo("celebrate");
    document.getElementById("celebrateTitle").innerText = "I Knew It! ❤️";
    document.getElementById("celebrateBody").innerText = "You couldn't break my heart 😉.\nHappy Valentine's Day, my baby, my Forever.";
    
    startConfetti();
    fadeInMusic();
}

function typeWriter(id, text, cb) {
    const el = document.getElementById(id);
    el.innerText = "";
    isTyping = true;
    let i = 0;
    function type() {
        if (i < text.length) {
            el.innerText += text.charAt(i);
            i++;
            setTimeout(type, 35);
        } else {
            isTyping = false;
            if (cb) cb();
        }
    }
    type();
}

function fadeInMusic() {
    if (musicInterval) clearInterval(musicInterval);
    music.volume = 0;
    music.play().catch(e => console.log("Audio requires interaction"));
    let vol = 0;
    musicInterval = setInterval(() => {
        if (vol < 0.5) {
            vol += 0.05;
            music.volume = vol;
        } else {
            clearInterval(musicInterval);
        }
    }, 200);
}

function fadeOutMusic() {
    if (musicInterval) clearInterval(musicInterval);
    let vol = music.volume;
    musicInterval = setInterval(() => {
        if (vol > 0.05) {
            vol -= 0.05;
            music.volume = vol;
        } else {
            music.volume = 0;
            music.pause();
            clearInterval(musicInterval);
        }
    }, 200);
}

function startHearts() {
    if (heartInterval) return;
    heartInterval = setInterval(() => {
        const h = document.createElement("div");
        h.innerText = Math.random() > 0.5 ? "❤️" : "💕";
        h.className = "floater";
        h.style.left = Math.random() * 100 + "vw";
        h.style.animationDuration = Math.random() * 5 + 10 + "s";
        h.style.fontSize = Math.random() * 20 + 15 + "px";
        document.getElementById("heartContainer").appendChild(h);
        setTimeout(() => h.remove(), 15000);
    }, 800);
}

function stopHearts() {
    clearInterval(heartInterval);
    heartInterval = null;
    document.getElementById("heartContainer").innerHTML = "";
}

function startConfetti() {
    for(let i=0; i<150; i++) {
        const c = document.createElement("div");
        c.className = "confetti-piece";
        c.style.left = Math.random()*100 + "vw";
        c.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
        c.style.animation = `fall ${Math.random()*3 + 3}s linear forwards`;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 6000);
    }
}

startHearts();