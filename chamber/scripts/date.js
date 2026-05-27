document.addEventListener("DOMContentLoaded", () => {
    // --- WAYFINDING & FOOTER DATES ---
    const currentYearEl = document.getElementById("currentyear");
    const lastModifiedEl = document.getElementById("lastModified");

    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    if (lastModifiedEl) {
        lastModifiedEl.textContent = document.lastModified;
    }
});