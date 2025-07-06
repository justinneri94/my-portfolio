
const windowEl = document.getElementById("main-window");
const titleBar = windowEl.querySelector(".title-bar");
const closeBtn = windowEl.querySelector(".close");
const maximizeBtn = windowEl.querySelector(".maximize");
const minimizeBtn = windowEl.querySelector(".minimize");

let isDragging = false;
let offsetX, offsetY;

// Minimize Button
document.querySelector('.minimize').addEventListener('click', () => {
  const win = document.getElementById('main-window');
  win.style.opacity = '0';
  setTimeout(() => {
    win.style.display = 'none';
  }, 200);
});

let isMaximized = false;
const mainWindow = document.getElementById('main-window');

document.querySelector('.maximize').addEventListener('click', () => {
  if (!isMaximized) {
    // Store current position & size
    mainWindow.dataset.originalWidth = mainWindow.style.width || `${mainWindow.offsetWidth}px`;
    mainWindow.dataset.originalHeight = mainWindow.style.height || `${mainWindow.offsetHeight}px`;
    mainWindow.dataset.originalLeft = mainWindow.style.left || `${mainWindow.offsetLeft}px`;
    mainWindow.dataset.originalTop = mainWindow.style.top || `${mainWindow.offsetTop}px`;

    // Expand
    mainWindow.style.width = '80vw';
    mainWindow.style.height = '80vh';
    mainWindow.style.left = '10vw';
    mainWindow.style.top = '10vh';

    isMaximized = true;
  } else {
    // Restore original
    mainWindow.style.width = mainWindow.dataset.originalWidth;
    mainWindow.style.height = mainWindow.dataset.originalHeight;
    mainWindow.style.left = mainWindow.dataset.originalLeft;
    mainWindow.style.top = mainWindow.dataset.originalTop;

    isMaximized = false;
  }
});

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
  if (isDragging) {
    windowEl.style.left = `${e.clientX - offsetX}px`;
    windowEl.style.top = `${e.clientY - offsetY}px`;
  }
});

closeBtn.addEventListener("click", () => {
  windowEl.style.display = "none";
});

minimizeBtn.addEventListener("click", () => {
  const content = windowEl.querySelector(".window-content");
  content.style.display = content.style.display === "none" ? "block" : "none";
});

maximizeBtn.addEventListener("click", () => {
  windowEl.classList.toggle("fullscreen");
});

window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  setTimeout(() => splash.classList.add('fade-out'), 1500);
});
