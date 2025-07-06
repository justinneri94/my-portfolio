const windowEl = document.getElementById("main-window");
const titleBar = windowEl.querySelector(".title-bar");
const closeBtn = windowEl.querySelector(".close");
const maximizeBtn = windowEl.querySelector(".maximize");
const minimizeBtn = windowEl.querySelector(".minimize");
const content = windowEl.querySelector(".window-content");

let isDragging = false;
let offsetX, offsetY;
let isMaximized = false;
let isMinimized = false;

// Dragging logic
titleBar.style.cursor = "grab";

titleBar.addEventListener("mousedown", (e) => {
  if (isMaximized) return; // Disable dragging when maximized
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
  if (isDragging) {
    windowEl.style.left = `${e.clientX - offsetX}px`;
    windowEl.style.top = `${e.clientY - offsetY}px`;
  }
});

// Close button
closeBtn.addEventListener("click", () => {
  windowEl.style.display = "none";
});

// Minimize button — toggles only content
minimizeBtn.addEventListener("click", () => {
  if (!isMinimized) {
    content.style.display = "none";
    isMinimized = true;
  } else {
    content.style.display = "block";
    isMinimized = false;
  }
});

// Maximize button — toggle fullscreen style
maximizeBtn.addEventListener("click", () => {
  if (!isMaximized) {
    // Save current size & position
    windowEl.dataset.originalWidth = windowEl.style.width || `${windowEl.offsetWidth}px`;
    windowEl.dataset.originalHeight = windowEl.style.height || `${windowEl.offsetHeight}px`;
    windowEl.dataset.originalLeft = windowEl.style.left || `${windowEl.offsetLeft}px`;
    windowEl.dataset.originalTop = windowEl.style.top || `${windowEl.offsetTop}px`;

    // Maximize
    windowEl.style.width = "80vw";
    windowEl.style.height = "80vh";
    windowEl.style.left = "10vw";
    windowEl.style.top = "10vh";

    isMaximized = true;
  } else {
    // Restore
    windowEl.style.width = windowEl.dataset.originalWidth;
    windowEl.style.height = windowEl.dataset.originalHeight;
    windowEl.style.left = windowEl.dataset.originalLeft;
    windowEl.style.top = windowEl.dataset.originalTop;

    isMaximized = false;
  }
});

// Splash fade (optional)
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  if (splash) {
    setTimeout(() => splash.classList.add('fade-out'), 1500);
  }
});
