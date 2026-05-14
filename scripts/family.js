async function loadFamilyData() {
    try {
        const response = await fetch("ward_members.json");
        const data = await response.json();

        const container = document.getElementById("familyData");

        // Build HTML
        let html = `
      <p><strong>Family Name:</strong> ${data.family_name}</p>
      <p><strong>Move-in Date:</strong> ${data.move_in_date}</p>
      <p><strong>Number of People:</strong> ${data.number_of_people}</p>
      <p><strong>Visited by Bishopric:</strong> ${data.visited_by_bishopric ? "Yes" : "No"}</p>
      <h3>Family Members:</h3>
      <ul>
        ${data.family_members.map(member => `
          <li>${member.name} — ${member.gender}, born ${member.birthdate}</li>
        `).join("")}
      </ul>
    `;

        container.innerHTML = html;
    } catch (error) {
        console.error("Error loading family data:", error);
    }
}

loadFamilyData();
