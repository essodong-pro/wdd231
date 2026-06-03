const DATA_URL = "data/culture.json";
let culturalItems = [];

document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.getElementById("gallery-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cultureModal = document.getElementById("culture-modal");
    const closeModalBtn = document.getElementById("close-modal");

    if (galleryGrid) {
        loadCulturalData(galleryGrid);
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            e.currentTarget.classList.add("active");

            const selectedCategory = e.currentTarget.getAttribute("data-category");
            filterAndDisplay(selectedCategory, galleryGrid);
        });
    });

    if (closeModalBtn && cultureModal) {
        closeModalBtn.addEventListener("click", () => {
            cultureModal.close();
        });

        cultureModal.addEventListener("click", (e) => {
            if (e.target === cultureModal) {
                cultureModal.close();
            }
        });
    }
});

async function loadCulturalData(container) {
    try {
        const response = await fetch(DATA_URL);

        if (!response.ok) {
            throw new Error(`HTTP error detected! Status: ${response.status}`);
        }

        culturalItems = await response.json();
        displayCards(culturalItems, container);

    } catch (error) {
        console.error("Unable to load cultural data sources:", error);
        if (container) {
            container.innerHTML = `<p class="error-message">Sorry, an error occurred while loading the cultural treasures. Please try again later.</p>`;
        }
    }
}

function filterAndDisplay(category, container) {
    if (category === "all") {
        displayCards(culturalItems, container);
    } else {
        const filteredList = culturalItems.filter(item => item.category === category);
        displayCards(filteredList, container);
    }
}

function displayCards(items, container) {
    if (!container) return;

    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = `<p class="no-items">No items found matching this category selection.</p>`;
        return;
    }

    items.forEach((item, index) => {
        const card = document.createElement("article");
        card.classList.add("culture-card");

        const isAboveFold = index < 4;
        const imgAttributes = isAboveFold ? 'fetchpriority="high"' : 'loading="lazy"';

        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${item.imageUrl}" alt="${item.name}" ${imgAttributes} width="212" height="141">
            </div>
            <div class="card-info">
                <span class="card-category">${item.category}</span>
                <h3>${item.name}</h3>
                <p class="card-region">📍 ${item.region}</p>
                <p class="card-short-desc">${item.description}</p>
                <button class="view-details-btn" type="button">Discover History</button>
            </div>
        `;

        card.addEventListener("click", () => {
            openDetailsModal(item);
        });

        container.appendChild(card);
    });
}

function openDetailsModal(item) {
    const cultureModal = document.getElementById("culture-modal");
    const modalDetails = document.getElementById("modal-details");

    if (cultureModal && modalDetails) {
        modalDetails.innerHTML = `
            <h2>${item.name}</h2>
            <p class="modal-meta"><strong>Category:</strong> ${item.category} | <strong>Region of Origin:</strong> ${item.region}</p>
            <div class="modal-body-layout">
                <img src="${item.imageUrl}" alt="${item.name}" class="modal-img-large" width="600" height="400">
                <div class="modal-text">
                    <h3>Description</h3>
                    <p>${item.description}</p>
                    <h3>Cultural Significance &amp; History</h3>
                    <p class="highlighted-details">${item.details}</p>
                </div>
            </div>
        `;

        cultureModal.showModal();
    }
}