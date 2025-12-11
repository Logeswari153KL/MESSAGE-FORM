
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const repasswordField = document.getElementById("repassword");


const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");
const repassError = document.getElementById("repassError");


const dot1 = document.getElementById("dot1");
const dot2 = document.getElementById("dot2");
const dot3 = document.getElementById("dot3");


const nextBtn = document.getElementById("nextBtn");


const togglePassword = document.getElementById("togglePassword");
if (togglePassword) {
    togglePassword.addEventListener("click", () => {
        const type = passwordField.type === "password" ? "text" : "password";
        passwordField.type = type;
        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-eye-slash");
    });
}

const toggleRePassword = document.getElementById("toggleRePassword");
if (toggleRePassword) {
    toggleRePassword.addEventListener("click", () => {
        const type = repasswordField.type === "password" ? "text" : "password";
        repasswordField.type = type;
        toggleRePassword.classList.toggle("fa-eye");
        toggleRePassword.classList.toggle("fa-eye-slash");
    });
}


function validateName() {
    if (!nameField.value.trim()) {
        nameError.textContent = "Name cannot be empty";
        return false;
    }
    nameError.textContent = "";
    return true;
}

function validateEmail() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(emailField.value.trim())) {
        emailError.textContent = "Invalid email address";
        return false;
    }
    emailError.textContent = "";
    return true;
}

function validatePassword() {
    const pw = passwordField.value;
    let score = 0;

    if (pw.length >= 6) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    dot1.style.background = score >= 2 ? "red" : "#ccc";
    dot2.style.background = score >= 3 ? "orange" : "#ccc";
    dot3.style.background = score >= 4 ? "green" : "#ccc";

    if (pw.length < 6) {
        passError.textContent = "Password must be at least 6 characters";
        return false;
    }

    passError.textContent = "";
    return true;
}

function validateRePassword() {
    if (repasswordField.value !== passwordField.value) {
        repassError.textContent = "Passwords do not match";
        return false;
    }
    repassError.textContent = "";
    return true;
}

function updateNextBtn() {
    if (validateName() && validateEmail() && validatePassword() && validateRePassword()) {
        nextBtn.disabled = false;
        nextBtn.classList.add("enabled");
    } else {
        nextBtn.disabled = true;
        nextBtn.classList.remove("enabled");
    }
}

if (nameField) nameField.addEventListener("input", updateNextBtn);
if (emailField) emailField.addEventListener("input", updateNextBtn);
if (passwordField) passwordField.addEventListener("input", updateNextBtn);
if (repasswordField) repasswordField.addEventListener("input", updateNextBtn);


if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
        e.preventDefault();
           if (!nextBtn.disabled) {
            console.log("Form validated — moving to message page");
            window.location.href = "message.html";
        } else {
            console.log("Form validation failed");
        }
    });
}


// -MESSAGE PAGE SCRIPT - //

const msgBox = document.getElementById("msgBox");
const msgCount = document.getElementById("msgCount");
const msgError = document.getElementById("msgError");
const finalSubmit = document.getElementById("finalSubmit");

if (msgBox) {
    msgBox.addEventListener("input", () => {
        const len = msgBox.value.length;
        msgCount.textContent = `${len} / 200 characters`;

        console.log(`Characters typed: ${len}`);

        if (len >= 200) {
            msgError.textContent = "Maximum character limit reached!";
            console.log("Character limit reached (200)");
        } else {
            msgError.textContent = "";
        }
    });
}


if (finalSubmit) {
    finalSubmit.addEventListener("click", () => {
        if (msgBox.value.trim() === "") {
            msgError.textContent = "Message cannot be empty";
            console.log("Message empty — cannot submit");
            return;
        }

        console.log("Message submitted successfully");
        window.location.href = "success.html";
    });
}
