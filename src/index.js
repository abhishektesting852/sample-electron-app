const currentTheme = document.querySelector("#current-theme");
const toggleThemeBtn = document.querySelector("#toggle-theme-btn");
const resetThemeBtn = document.querySelector("#reset-theme-btn");
const notificationBtn = document.querySelector("#notification-btn");
const progressBar = document.querySelector("#progress-bar");
const progress = document.querySelector("#progress");

toggleThemeBtn.addEventListener("click", async () => {
  const theme = await window.darkMode.toggleTheme();
  currentTheme.innerText = theme;
});
resetThemeBtn.addEventListener("click", async () => {
  const theme = await window.darkMode.resetTheme();
  currentTheme.innerText = theme;
});

notificationBtn.addEventListener("click", () => {
  new Notification("New Message", {
    body: "Hello World, 👋",
    icon: "./assets/app-icon.png",
  });
});

let i = 0;
let interval;

interval = setInterval(() => {
  if (i < 100) {
    i++;
    progress.innerText = i;
    progressBar.style.width = `${i}%`;
    window.progressCounter.status(i);
  } else {
    clearInterval(interval);
  }
}, 150);
