const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    try {
        const response = await fetch(url);        // fetch JSON
        const data = await response.json();       // convert to JS object
        console.table(data.prophets);             // check data in console
        displayProphets(data.prophets);           // pass array to display function
    } catch (error) {
        console.error("Error fetching prophets:", error);
    }
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // create card
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');
        const birthInfo = document.createElement('p');

        // fill content
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthInfo.textContent = `Born: ${prophet.birthdate} in ${prophet.birthplace}`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '200');
        portrait.setAttribute('height', '250');

        // append to card
        card.appendChild(fullName);
        card.appendChild(birthInfo);
        card.appendChild(portrait);

        // add card to page
        cards.appendChild(card);
    });
};

getProphetData();
