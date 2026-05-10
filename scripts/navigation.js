const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    
    menuButton.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
});