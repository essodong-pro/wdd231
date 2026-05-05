const courses = [
    { code: "WDD 130", name: "Web Fundamentals", credits: 3, category: "WDD", completed: true },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, category: "WDD", completed: true },
    { code: "WDD 231", name: "Web Frontend Development", credits: 3, category: "WDD", completed: false },
    { code: "CSE 110", name: "Introduction to Programming", credits: 2, category: "CSE", completed: true },
    { code: "CSE 210", name: "Programming with Classes", credits: 2, category: "CSE", completed: false }
];

function displayCourses(filter = "All") {
    const container = document.getElementById("courseList");
    container.innerHTML = "";
    let totalCredits = 0;

    courses.forEach(course => {
        if (filter === "All" || course.category === filter) {
            const item = document.createElement("div");
            item.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;
            item.className = course.completed ? "completed" : "not-completed";
            container.appendChild(item);
            totalCredits += course.credits;
        }
    });

    document.getElementById("totalCredits").textContent = `Total credits: ${totalCredits}`;
}

document.getElementById("filterAll").addEventListener("click", () => displayCourses("All"));
document.getElementById("filterWDD").addEventListener("click", () => displayCourses("WDD"));
document.getElementById("filterCSE").addEventListener("click", () => displayCourses("CSE"));

displayCourses();
