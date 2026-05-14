async function loadMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    const container = document.querySelector('.members');
    container.innerHTML = '';
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>Membership Level: ${member.membership}</p>
    `;
        container.appendChild(card);
    });
}

document.querySelector('#grid').addEventListener('click', () => {
    document.querySelector('.members').classList.add('grid');
});

document.querySelector('#list').addEventListener('click', () => {
    document.querySelector('.members').classList.remove('grid');
});

loadMembers();
