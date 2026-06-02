document.addEventListener("DOMContentLoaded", () => {
    calculateVisitor();
    generateDiscoverCards();
});

function calculateVisitor() {
    const messageZone = document.getElementById("visitor-message");
    if (!messageZone) return;

    const lastVisit = localStorage.getItem("derniereVisiteChambre");
    const now = Date.now();

    if (!lastVisit) {
        messageZone.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const differenceMs = now - parseInt(lastVisit);
        const msPerDay = 24 * 60 * 60 * 1000;
        const daysElapsed = Math.floor(differenceMs / msPerDay);

        if (differenceMs < msPerDay) {
            messageZone.textContent = "Back so soon! Awesome!";
        } else {
            if (daysElapsed === 1) {
                messageZone.textContent = "You last visited 1 day ago.";
            } else {
                messageZone.textContent = `You last visited ${daysElapsed} days ago.`;
            }
        }
    }

    localStorage.setItem("derniereVisiteChambre", now);
}

async function generateDiscoverCards() {
    const gridContainer = document.getElementById("discover-grid");
    if (!gridContainer) return;

    try {
        const response = await fetch('data/discover.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const discoverItems = await response.json();

        discoverItems.forEach((item, index) => {
            const cardSection = document.createElement("section");
            cardSection.classList.add("discover-card", `area-card${index + 1}`);

            cardSection.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
                </figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <button type="button" class="learn-more-btn">Learn More</button>
            `;

            gridContainer.appendChild(cardSection);
        });

    } catch (error) {
        console.error("Could not fetch discover data:", error);
        gridContainer.innerHTML = `<p>Error loading content. Please try again later.</p>`;
    }
}