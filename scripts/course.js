const courses = [
    { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "WDD231", name: "Web Frontend Development", credits: 3, completed: false },
    { code: "CSE212", name: "Programming with Data Structures", credits: 3, completed: false }
];

// Example: dynamically display courses
const courseSection = document.createElement("section");
courseSection.innerHTML = "<h2>Courses</h2>";

courses.forEach(course => {
    const card = document.createElement("div");
    card.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;
    card.style.backgroundColor = course.completed ? "#c8e6c9" : "#ffcdd2"; // green if completed, red if not
    courseSection.appendChild(card);
});

document.querySelector("main").appendChild(courseSection);
