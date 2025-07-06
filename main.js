
const windowEl = document.getElementById("main-window");
const titleBar = windowEl.querySelector(".title-bar");
const closeBtn = windowEl.querySelector(".close");
const maximizeBtn = windowEl.querySelector(".maximize");
const minimizeBtn = windowEl.querySelector(".minimize");

let isDragging = false;
let offsetX, offsetY;

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
