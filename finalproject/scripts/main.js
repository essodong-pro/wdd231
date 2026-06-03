
document.addEventListener("DOMContentLoaded", () => {
    // 1. Automatic management of footer dates
    initFooterData();

    // 2. Responsive navigation menu handling (Hamburger)
    initResponsiveNav();
});

/**
 * Dynamically inserts the current year and the document's last modified date
 */
function initFooterData() {
    const yearSpan = document.getElementById("current-year");
    const lastModifiedSpan = document.getElementById("last-modified");

    // Dynamic year
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Document modification date
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}

/**
 * Manages the hamburger menu display on small viewports
 */
function initResponsiveNav() {
    const menuButton = document.getElementById("menu-button");
    const mainNav = document.getElementById("main-nav");

    if (menuButton && mainNav) {
        menuButton.addEventListener("click", () => {
            // Toggle the 'open' class on the navigation layout elements
            mainNav.classList.toggle("open");
            menuButton.classList.toggle("open");

            // Accessibility: update the aria-expanded state attributes
            const isOpen = mainNav.classList.contains("open");
            menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }
}