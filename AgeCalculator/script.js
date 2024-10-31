  
  // Disable future dates
  document.getElementById("userdate").max = new Date().toISOString().split("T")[0];

function calculateAge() {
  let birthDate = new Date(document.getElementById("userdate").value); // input date from the user
  let todayDate = new Date(); // current date (today's)
  let result = document.getElementById("result"); // to store the result

  // if the birthdate is empty or invalid
  if (isNaN(birthDate)) {
    document.getElementById("alert").innerHTML = "Please enter a valid date*"; // error message
    result.innerHTML = "";
    return;
  } else document.getElementById("alert").innerHTML = ""; // clear error message

  const birthDetails = {
    birthYear: birthDate.getFullYear(),
    birthMonth: birthDate.getMonth() + 1,
    birthDate: birthDate.getDate(),
  }; // user DOB details

  const currentBirthDetails = {
    CurrentYear: todayDate.getFullYear(),
    CurrentMonth: todayDate.getMonth() + 1,
    CurrentDate: todayDate.getDate(),
  }; // current date details

  // year difference
  let yearDiff = currentBirthDetails.CurrentYear - birthDetails.birthYear;

  // month difference
  let monthDiff = currentBirthDetails.CurrentMonth - birthDetails.birthMonth;
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }

  // day difference
  let dayDiff = currentBirthDetails.CurrentDate - birthDetails.birthDate;
  if (dayDiff < 0) {
    monthDiff--;
    let noOfDaysInDob = daysInMonth(
      birthDetails.birthMonth,
      birthDetails.birthYear
    );
    dayDiff += noOfDaysInDob;
  }

  // handling negative monthDiff after day adjustment
  if (monthDiff < 0) {
    monthDiff = 11;
    yearDiff--;
  }

  // printing the result
  result.innerHTML = `You are <span>${yearDiff}</span> years <span>${monthDiff}</span> months and <span>${dayDiff}</span> days old !!`;
}

// calculating days in month
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
