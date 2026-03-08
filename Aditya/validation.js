export function validateForm() {
    // 1. Select dynamic input groups instead of single IDs
    const emailInputs = document.querySelectorAll('#email-container input');
    const phoneInputs = document.querySelectorAll('#phone-container input');
    
    const name = document.getElementById("name").value.trim();
    const department = document.getElementById("department").value;
    const workStatus = document.getElementById("workStatus").value;
    const workdate = document.getElementById("workdate").value;

    const nameErr = document.getElementById("name-error");
    const emailErr = document.getElementById("email-error");
    const phoneErr = document.getElementById("phone-error");
    const departmentErr = document.getElementById("department-error");
    const worErr = document.getElementById("work-error");
    const dateErr = document.getElementById("date-error");

    // Clear previous errors
    [nameErr, emailErr, phoneErr, departmentErr, worErr, dateErr].forEach(el => {
        if(el) {
            el.textContent = "";
            el.classList.add("hidden");
        }
    });

    let isValid = true;

    // --- Name Validation ---
    if (name === "" || /\d/.test(name)) {
        nameErr.textContent = "Invalid name (no numbers allowed).";
        nameErr.classList.remove("hidden");
        isValid = false;
    }

    // --- Dynamic Email Validation ---
    let allEmailsValid = true;
    emailInputs.forEach(input => {
        const val = input.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (val === "" || !emailPattern.test(val)) {
            allEmailsValid = false;
        }
    });
    if (!allEmailsValid) {
        emailErr.textContent = "Please provide valid email(s).";
        emailErr.classList.remove("hidden");
        isValid = false;
    }

    // --- Dynamic Phone Validation ---
    let allPhonesValid = true;
    phoneInputs.forEach(input => {
        const val = input.value.trim();
        // Check if each individual number is exactly 10 digits
        if (val.length !== 10 || isNaN(val)) {
            allPhonesValid = false;
        }
    });
    if (!allPhonesValid) {
        phoneErr.textContent = "Each phone number must be 10 digits.";
        phoneErr.classList.remove("hidden");
        isValid = false;
    }

    // --- Other Fields ---
    if (department === "") {
        departmentErr.textContent = "Select department.";
        departmentErr.classList.remove("hidden");
        isValid = false;
    }
    if (workdate === "") {
        dateErr.textContent = "Select date.";
        dateErr.classList.remove("hidden");
        isValid = false;
    }
    if (workStatus === "") {
        worErr.textContent = "Select status.";
        worErr.classList.remove("hidden");
        isValid = false;
    }

    return isValid; 
}

export function resetErrors() {
    const errors = ["name-error", "email-error", "phone-error", "department-error", "work-error", "date-error"];
    errors.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = "";
            el.classList.add("hidden");
        }
    });
}