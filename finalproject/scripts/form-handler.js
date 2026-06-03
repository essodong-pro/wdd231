function initFormHandler() {
    const form = document.querySelector(".cultural-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        const firstName = document.getElementById("fname");
        const lastName = document.getElementById("lname");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        let errors = [];

        if (!firstName || firstName.value.trim() === "") {
            errors.push("First name field is required.");
        }

        if (!lastName || lastName.value.trim() === "") {
            errors.push("Last name field is required.");
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email.value.trim())) {
            errors.push("Please provide a valid email format address.");
        }

        if (message && message.value.trim().length > 0 && message.value.trim().length < 15) {
            errors.push("To better serve your request, messages must be at least 15 characters long.");
        }

        if (errors.length > 0) {
            event.preventDefault();
            alert("Validation issues encountered:\n\n" + errors.join("\n"));
        } else {
            localStorage.setItem("usernameSubmitted", `${firstName.value.trim()} ${lastName.value.trim()}`);
        }
    });
}

initFormHandler();