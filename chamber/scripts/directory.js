async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading member data:", error);
    }
}

function displayMembers(members) {
    const container = document.querySelector('.members');
    container.innerHTML = '';

    members.forEach((member, index) => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        // Create the image element
        const image = document.createElement('img');
        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;

        image.setAttribute('width', member.width || 400);
        image.setAttribute('height', member.height || 250);

        if (index === 0) {
            image.setAttribute('fetchpriority', 'high');
            image.setAttribute('loading', 'eager');
        } else {
            image.setAttribute('loading', 'lazy');
        }

        card.innerHTML = `
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            <p><strong>Membership Level:</strong> ${member.membership}</p>
            <p class="info">${member.info}</p>
        `;

        card.prepend(image);
        container.appendChild(card);
    });
}

// Layout Toggle Logic
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');
const display = document.querySelector('.members');

gridButton.addEventListener('click', () => {
    display.classList.add('grid');
    display.classList.remove('list');
});

listButton.addEventListener('click', () => {
    display.classList.add('list');
    display.classList.remove('grid');
});

display.classList.add('grid');

loadMembers();