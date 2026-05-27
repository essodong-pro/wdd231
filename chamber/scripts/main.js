// --- CONFIGURATION ---
const apiKey = '9d2e53a62ca420d3c2cda88ac5d39210';
const lat = '6.1375'; // Coordinates for Lomé, Togo
const lon = '1.2125';

const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const membersUrl = 'data/members.json';

// --- INITIALIZE TIMERS & DATA ON LOAD ---
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('weather-card')) {
        fetchWeather();
    }
    if (document.getElementById('spotlight-container')) {
        fetchSpotlights();
    }

    // --- JOIN PAGE: Hidden Timestamp Influx ---
    const timestampField = document.getElementById("formTimestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // --- JOIN PAGE: Native Modal Overlay Controls ---
    const openButtons = document.querySelectorAll(".modal-open-btn");
    const closeButtons = document.querySelectorAll(".modal-close-btn");

    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    const modals = document.querySelectorAll(".membership-modal");
    modals.forEach(modal => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    });

    // --- JOIN PAGE: Cascade Animation Sequences ---
    const membershipCards = document.querySelectorAll(".membership-card");
    if (membershipCards.length > 0) {
        membershipCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add("animate-visible");
            }, index * 120);
        });
    }

    // --- THANK YOU PAGE: Param Extraction & Rendering ---
    const outputContainer = document.getElementById("submissionOutput");
    if (outputContainer) {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has("firstName")) {
            const firstName = urlParams.get("firstName");
            const lastName = urlParams.get("lastName");
            const email = urlParams.get("email");
            const phone = urlParams.get("phone");
            const organization = urlParams.get("organization");
            let timestamp = urlParams.get("timestamp") || "N/A";

            if (timestamp !== "N/A") {
                try {
                    timestamp = new Date(timestamp).toLocaleString();
                } catch (e) {
                    console.error("Timestamp display format failure:", e);
                }
            }

            // Updated to h2 to satisfy strict sequentially-descending heading audits
            outputContainer.innerHTML = `
                <h2>Application Information Overview</h2>
                <p><strong>First Name:</strong> ${firstName}</p>
                <p><strong>Last Name:</strong> ${lastName}</p>
                <p><strong>Email Address:</strong> ${email}</p>
                <p><strong>Mobile Phone:</strong> ${phone}</p>
                <p><strong>Business / Organization:</strong> ${organization}</p>
                <p><strong>Submission Record Date:</strong> ${timestamp}</p>
            `;
        } else {
            outputContainer.innerHTML = `<p style="color: #d9534f; font-weight: bold;">No active registration query stream located. Please visit our application system.</p>`;
        }
    }
});

// --- OPENWEATHERMAP API FETCH ---
async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error('Weather API request failed.');
        const data = await response.json();

        displayWeather(data);
    } catch (error) {
        console.error("Weather handling error:", error);
        document.getElementById('weather-card').innerHTML = `<p class="error-msg">Weather currently unavailable.</p>`;
    }
}

function displayWeather(data) {
    const weatherCard = document.getElementById('weather-card');
    const forecastCard = document.getElementById('forecast-card');

    // 1. Process Current Conditions
    const currentData = data.list[0];
    const currentTemp = Math.round(currentData.main.temp);
    const weatherDesc = currentData.weather[0].description;
    const weatherIconCode = currentData.weather[0].icon;
    const weatherIconSrc = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

    if (weatherCard) {
        weatherCard.innerHTML = `
            <div class="weather-current-layout">
                <img src="${weatherIconSrc}" alt="${weatherDesc}" width="75" height="75">
                <div class="weather-digits">
                    <p class="current-temp-text">${currentTemp}°C</p>
                    <p class="current-desc-text">${weatherDesc.toUpperCase()}</p>
                </div>
            </div>
        `;
    }

    if (forecastCard) {
        forecastCard.innerHTML = '';
        const midDayForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

        midDayForecasts.forEach(dayPoint => {
            const timestampDate = new Date(dayPoint.dt * 1000);
            const dayStringName = timestampDate.toLocaleDateString('en-US', { weekday: 'long' });
            const forecastTemp = Math.round(dayPoint.main.temp);

            const forecastElement = document.createElement('div');
            forecastElement.className = 'forecast-item';
            forecastElement.innerHTML = `
                <span class="forecast-day-label">${dayStringName}:</span>
                <span class="forecast-temp-val">${forecastTemp}°C</span>
            `;
            forecastCard.appendChild(forecastElement);
        });
    }
}

// --- RANDOM MEMBER SPOTLIGHT GENERATOR ---
async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error('Members JSON resource failed to load.');
        const membersList = await response.json();

        // Filter: Keep only premium members (Gold = 3, Silver = 2)
        const premiumMembers = membersList.filter(member => member.membership === 3 || member.membership === 2);

        // Randomize the premium array order
        const shuffledMembers = premiumMembers.sort(() => 0.5 - Math.random());

        // Slice out either 2 or 3 items to show dynamically
        const selectedSpotlights = shuffledMembers.slice(0, 3);

        displaySpotlights(selectedSpotlights);
    } catch (error) {
        console.error("Spotlight rendering error:", error);
        document.getElementById('spotlight-container').innerHTML = `<p class="error-msg">Failed to load business spotlights.</p>`;
    }
}

function displaySpotlights(selectedMembers) {
    const container = document.getElementById('spotlight-container');
    if (!container) return;
    container.innerHTML = '';

    selectedMembers.forEach(member => {
        // Humanize membership value names for the badges
        const tierLabel = member.membership === 3 ? 'Gold' : 'Silver';

        const card = document.createElement('div');
        card.className = `spotlight-card tier-${tierLabel.toLowerCase()}`;
        card.innerHTML = `
            <h3>${member.name}</h3>
            <div class="spotlight-logo-wrap">
                <img src="images/${member.image}" alt="${member.name} Logo" width="${member.width}" height="${member.height}" loading="lazy">
            </div>
            <p class="membership-tag">${tierLabel} Member</p>
            <p class="spotlight-info">"${member.info}"</p>
            <hr>
            <p class="spotlight-contact">📍 ${member.address}</p>
            <p class="spotlight-contact">📞 ${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener" class="spotlight-link">Visit Website</a>
        `;
        container.appendChild(card);
    });
}