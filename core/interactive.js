const buttons = document.querySelectorAll(".side-btn");
const html = document.documentElement;
const pages = document.querySelectorAll(".page");

function setTheme(theme) {
  html.classList.remove(
    "profile-theme",
    "library-theme",
    "friends-theme",
    "discover-theme",
    "settings-theme"
  );
  if (theme) html.classList.add(theme);
}

function setActivePage(id) {
  pages.forEach(p => p.classList.remove("active"));
  const target = document.querySelector(`.${id}-page`);
  if (target) target.classList.add("active");
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const id = btn.querySelector(".icon")?.id;

    if (id === "profile") setTheme("profile-theme");
    else if (id === "library") setTheme("library-theme");
    else if (id === "friends") setTheme("friends-theme");
    else if (id === "discover") setTheme("discover-theme");
    else if (id === "settings") setTheme("settings-theme");
    else setTheme(null);

    if (id) setActivePage(id);
  });
});
