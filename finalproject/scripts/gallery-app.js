// URL of our local data source
const DATA_URL = "data/culture.json";

// Global variables to store loaded data
let culturalItems = [];

document.addEventListener("DOMContentLoaded", () => {
    // Essential DOM elements
    const galleryGrid = document.getElementById("gallery-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cultureModal = document.getElementById("culture-modal");
    const closeModalBtn = document.getElementById("close-modal");

    // 1. Initialize data loading
    loadCulturalData(galleryGrid);

    // 2. Configure event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            // Remove active class from all buttons and apply it to the clicked button
            filterButtons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");

            const selectedCategory = e.target.getAttribute("data-category");
            filterAndDisplay(selectedCategory, galleryGrid);
        });
    });

    // 3. Configure modal dialog box closing actions
    if (closeModalBtn && cultureModal) {
        closeModalBtn.addEventListener("click", () => {
            cultureModal.close(); // Native closing method of the <dialog> tag
        });

        // Close the window if the user clicks outside the modal layout frame
        cultureModal.addEventListener("click", (e) => {
            if (e.target === cultureModal) {
                cultureModal.close();
            }
        });
    }
});

/**
 * Asynchronously fetches cultural data via Fetch API and handles execution exceptions
 */
async function loadCulturalData(container) {
    try {
        const response = await fetch(DATA_URL);

        if (!response.ok) {
            throw new Error(`HTTP error detected! Status: ${response.status}`);
        }

        // Parse received JSON dataset
        culturalItems = await response.json();

        // Initial rendering of all items (15+)
        displayCards(culturalItems, container);

    } catch (error) {
        console.error("Unable to load cultural data sources:", error);
        if (container) {
            container.innerHTML = `<p class="error-message">Sorry, an error occurred while loading the cultural treasures. Please try again later.</p>`;
        }
    }
}

/**
 * Filters the object array based on the selected category flag
 */
function filterAndDisplay(category, container) {
    if (category === "all") {
        displayCards(culturalItems, container);
    } else {
        // Utilizing the required array.filter() built-in method logic
        const filteredList = culturalItems.filter(item => item.category === category);
        displayCards(filteredList, container);
    }
}

/**
 * Dynamically builds and injects HTML cards into the DOM grid layout using Template Literals
 */
function displayCards(items, container) {
    if (!container) return;

    // Clear target container (wipes out the initial loading placeholder text string)
    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = `<p class="no-items">No items found matching this category selection.</p>`;
        return;
    }

    // loop through data elements efficiently with forEach
    items.forEach((item, index) => {
        // Create an article structural element node for each distinct card item
        const card = document.createElement("article");
        card.classList.add("culture-card");

        // PERFORMANCE FIX: Optimize above-the-fold content loading
        // First 4 elements render instantly to satisfy Largest Contentful Paint (LCP)
        const isAboveFold = index < 4;
        const imgAttributes = isAboveFold
            ? 'fetchpriority="high"'
            : 'loading="lazy"';

        // Card payload layout adjusted to matching display scale (212x141) to pass image audits
        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${item.imageUrl}" alt="${item.name}" ${imgAttributes} width="212" height="141">
            </div>
            <div class="card-info">
                <span class="card-category">${item.category}</span>
                <h3>${item.name}</h3>
                <p class="card-region">📍 ${item.region}</p>
                <p class="card-short-desc">${item.description}</p>
                <button class="view-details-btn">Discover History</button>
            </div>
        `;

        // Click event listener setup to open up detailed modal data profiles
        card.addEventListener("click", () => {
            openDetailsModal(item);
        });

        container.appendChild(card);
    });
}

/**
 * Fills out and brings up the modal dialog window with detailed structural item properties
 */
function openDetailsModal(item) {
    const cultureModal = document.getElementById("culture-modal");
    const modalDetails = document.getElementById("modal-details");

    if (cultureModal && modalDetails) {
        // Dynamic rendering of target detail layout properties via template literal strings
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

        // Modern accessible native modal element call trigger 
        cultureModal.showModal();
    }
}