// Sidebar button active + theme switching
const buttons = document.querySelectorAll(".side-btn");
const html = document.documentElement;

function setTheme(theme) {
    // remove all theme classes
    html.classList.remove(
        "profile-theme",
        "library-theme",
        "friends-theme",
        "discover-theme",
        "settings-theme"
    );

    // add the selected theme
    if (theme) html.classList.add(theme);
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        // 1. Set active state
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // 2. Determine which button was pressed
        const id = btn.querySelector(".icon")?.id;

        // 3. Switch themes
        if (id === "profile") setTheme("profile-theme");
        else if (id === "library") setTheme("library-theme");
        else if (id === "friends") setTheme("friends-theme");
        else if (id === "discover") setTheme("discover-theme");
        else if (id === "settings") setTheme("settings-theme");
        else setTheme(null); // fallback
    });
});
