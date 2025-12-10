// pages/settings/settings.js

document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.querySelector(".theme-button");
  const themePopup = document.getElementById("themePopup");
  const settingsPage = document.querySelector(".settings-page");
  const sidebarButtons = document.querySelectorAll(".side-btn");

  // Safety: if any core elements are missing, do nothing
  if (!themeBtn || !themePopup || !settingsPage) return;

  // ✅ Open Theme Popup from "Change Theme"
  themeBtn.addEventListener("click", () => {
    // Show popup
    themePopup.classList.add("active");

    // Temporarily hide the settings content behind it
    settingsPage.classList.remove("active");
  });

  // ✅ Close popup whenever ANY sidebar tab is clicked
  //    (Discover, Friends, Profile, Library, *and* Settings)
  sidebarButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (themePopup.classList.contains("active")) {
        themePopup.classList.remove("active");
      }
      // We don't force any page .active here:
      // interactive.js already handles which .page is active.
    });
  });
});
