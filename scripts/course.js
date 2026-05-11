const courses = [
    { code: "CSE 110", name: "Introduction to Programming", credits: 2, category: "CSE", completed: true },
    { code: "CSE 111", name: "Programming with Functions", credits: 2, category: "CSE", completed: false },
    { code: "CSE 210", name: "Programming with Classes", credits: 2, category: "CSE", completed: false },
    { code: "WDD 130", name: "Web Fundamentals", credits: 3, category: "WDD", completed: true },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, category: "WDD", completed: true },
    { code: "WDD 231", name: "Web Frontend Development I", credits: 3, category: "WDD", completed: false }
];

function displayCourses(filter = "All") {
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = "";

    const filteredCourses = filter === "All" ? courses : courses.filter(c => c.category === filter);

    filteredCourses.forEach(course => {
        const div = document.createElement("div");

       
        div.classList.add("course-card");
        div.classList.add(course.completed ? "completed" : "not-completed");

        const checkmark = course.completed ? "✓ " : "";
        div.textContent = `${checkmark}${course.code}`;

        courseList.appendChild(div);
    });

    
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById("totalCredits").textContent =
        `The total number of credits listed below is ${totalCredits}`;
}

document.getElementById("filterAll").addEventListener("click", () => displayCourses("All"));
document.getElementById("filterWDD").addEventListener("click", () => displayCourses("WDD"));
document.getElementById("filterCSE").addEventListener("click", () => displayCourses("CSE"));

displayCourses();