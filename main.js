const windowEl = document.getElementById("main-window");
const titleBar = windowEl.querySelector(".title-bar");
const closeBtn = windowEl.querySelector(".close");
const maximizeBtn = windowEl.querySelector(".maximize");
const minimizeBtn = windowEl.querySelector(".minimize");
const content = windowEl.querySelector(".window-content");

let isDragging = false;
let offsetX, offsetY;
let isMaximized = false;

// --- DRAGGABLE WINDOW ---
titleBar.style.cursor = "grab";

titleBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  titleBar.style.cursor = "grabbing";
  offsetX = e.clientX - windowEl.offsetLeft;
  offsetY = e.clientY - windowEl.offsetTop;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  titleBar.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging && !isMaximized) {
    windowEl.style.left = `${e.clientX - offsetX}px`;
    windowEl.style.top = `${e.clientY - offsetY}px`;
  }
});

// --- CLOSE BUTTON ---
closeBtn.addEventListener("click", () => {
  windowEl.style.display = "none";
});

// --- MINIMIZE BUTTON ---
minimizeBtn.addEventListener("click", () => {
  if (content.style.display === "none") {
    content.style.display = "block";
    windowEl.style.height = windowEl.dataset.originalHeight || "auto";
  } else {
    content.style.display = "none";
    windowEl.dataset.originalHeight = windowEl.style.height;
    windowEl.style.height = "40px";
  }
});

// --- MAXIMIZE BUTTON ---
maximizeBtn.addEventListener("click", () => {
  if (!isMaximized) {
    // Store original position/size
    windowEl.dataset.originalWidth = windowEl.style.width || `${windowEl.offsetWidth}px`;
    windowEl.dataset.originalHeight = windowEl.style.height || `${windowEl.offsetHeight}px`;
    windowEl.dataset.originalLeft = windowEl.style.left || `${windowEl.offsetLeft}px`;
    windowEl.dataset.originalTop = windowEl.style.top || `${windowEl.offsetTop}px`;

    // Maximize
    windowEl.style.width = '80vw';
    windowEl.style.height = '80vh';
    windowEl.style.left = '10vw';
    windowEl.style.top = '10vh';

    isMaximized = true;
  } else {
    // Restore original
    windowEl.style.width = windowEl.dataset.originalWidth;
    windowEl.style.height = windowEl.dataset.originalHeight;
    windowEl.style.left = windowEl.dataset.originalLeft;
    windowEl.style.top = windowEl.dataset.originalTop;

    isMaximized = false;
  }
});

// Optional: Splash fade-out
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  if (splash) {
    setTimeout(() => splash.classList.add('fade-out'), 1500);
  }
});
