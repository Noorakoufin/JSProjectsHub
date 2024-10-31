const formInputs = document.querySelectorAll(".form-control");
const formHolder = document.querySelectorAll(".form-holder");
const submit = document.getElementById("submit");
let error = false;
let isValid = true;
// document.forms['myForm'].addEventListener('submit', (e) => {
//     e.preventDefault(); // Prevent form submission initially
// });
submit.addEventListener("click", (e) => {
  e.preventDefault();

  let allFilled = true;
  let isValid = true;
  // Loop through each input field to check if it's empty
  formInputs.forEach((input, index) => {
    if (input.value.trim() === "") {
      allFilled = false;
      setError(formHolder[index], "Please fill in this field");
    }
  });
  if (!allFilled) alert("Please fill in all fields");
  else {
    isValid = checkInput();
    const passwordsMatch = confirmPasswordValidate();
    const passwordValid = passwordValidate();
    if (isValid && passwordsMatch && passwordValid) {
      alert("The form is submitted successfully!"); // Submit form if all fields are filled
      formHolder.forEach((holder) => {
        holder.classList.remove("error", "success");
      });

      document.forms["myForm"].reset();
      document.forms["myForm"].submit();
    } else
      alert(
        "Form will not be submitted. Please ensure all fields are filled correctly."
      );
  }
});

// Main validation logic
function checkInput() {
  let isValid = true;
  formInputs.forEach((input, index) => {
    let value = input.value.trim();
    const telPattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/; // RegExp for phone number
    //(^)starts search from the beginning
    //($)till end
    let formGroup = formHolder[index];

    if (value === "") {
      setError(formGroup, "This field is required");
      isValid = false;
    } else if (input.type === "text" && value.length < 3) {
      setError(formGroup, "must be at least 3 characters long");
      isValid = false;
    } else if (input.type === "tel" && !telPattern.test(value)) {
      setError(formGroup, "Invalid phone number - Match the pattern");
      isValid = false;
    } else if (input.type === "email" && !value.includes("@gmail.com")) {
      setError(formGroup, "Invalid Email format");
      isValid = false;
    } else {
      setSuccess(formGroup);
    }
  });
  passwordValidate();
  confirmPasswordValidate();
  return isValid;
}

// Function to validate password
function passwordValidate() {
  const passwordInput = formInputs[3];
  const password = passwordInput.value.trim(); // Extracts the password input value
  const passReq = document.querySelector(".pass-requirements"); // Selects requirements container
  const passConditions = document.querySelectorAll("span.pass-req"); // Selects all conditions
  // Display requirements on focus and hide on blur
  passwordInput.addEventListener("focus", () => {
    passReq.style.display = "block";
  });
  passwordInput.addEventListener("blur", () => {
    passReq.style.display = "none";
  });
  let isValid = true;
  // Check each condition specifically
  passConditions.forEach((condition, index) => {
    if (index === 0 && /[A-Z]/.test(password)) {
      // Uppercase check
      condition.classList.add("valid");
      condition.classList.remove("invalid");
    } else if (index === 1 && /[a-z]/.test(password)) {
      // Lowercase check
      condition.classList.add("valid");
      condition.classList.remove("invalid");
    } else if (index === 2 && /[0-9]/.test(password)) {
      // Number check
      condition.classList.add("valid");
      condition.classList.remove("invalid");
    } else if (index === 3 && password.length >= 8) {
      // Minimum length check
      condition.classList.add("valid");
      condition.classList.remove("invalid");
    } else {
      condition.classList.add("invalid");
      condition.classList.remove("valid");
      isValid = false;
    }
  });
  return isValid;
}
//function to validate confirm password
function confirmPasswordValidate() {
  let isValid = true;
  const passwordInput = formInputs[3];
  const confirmPasswordInput = formInputs[4];
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  const confirmPasswordGroup = formHolder[4];
  if (password !== confirmPassword) {
    setError(confirmPasswordGroup, "Password do not match");
    return false;
  } else {
    if (confirmPassword && password === confirmPassword)
      setSuccess(confirmPasswordGroup);
    return true;
  }
}

// Function to display error
function setError(input, message) {
  input.classList.add("error");
  input.classList.remove("success");
  input.querySelector("small.error-message").textContent = message;
}

// Function to display success
function setSuccess(input) {
  input.classList.remove("error");
  input.classList.add("success");
}

// Input event listener for real-time validation on keyup
formInputs.forEach((input) => {
  input.addEventListener("input", checkInput);
});
