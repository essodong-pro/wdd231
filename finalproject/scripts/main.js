function initFooterData() {
    const yearSpan = document.getElementById("current-year");
    const lastModifiedSpan = document.getElementById("last-modified");

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}

function initResponsiveNav() {
    const menuButton = document.getElementById("menu-button");
    const mainNav = document.getElementById("main-nav");

    if (menuButton && mainNav) {
        menuButton.addEventListener("click", () => {
            mainNav.classList.toggle("open");
            menuButton.classList.toggle("open");

            const isOpen = mainNav.classList.contains("open");
            menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }
}

initFooterData();
initResponsiveNav();