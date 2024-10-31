document.getElementById("clickButton").addEventListener("click", () => {
  let inputText = document.getElementsByName("inputBox")[0];
  let results = document.getElementById("results");
  let errorMessage = document.getElementById("errorMsg");

  if (inputText.value == "") {
    errorMessage.innerHTML = "Enter a valid input";
    results.innerHTML = "";
    return;
  } else {
    errorMessage.innerHTML = "";
  }

  if (
    inputText.value.toLowerCase().trim() ==
    inputText.value.toLowerCase().trim().split("").reverse().join("")
  ) {
    results.innerHTML = `<span>'${inputText.value}'</span> is a palindrome!`;
  } else {
    results.innerHTML = `<span>'${inputText.value}'</span> is <span class="not">not</span> a palindrome!`;
  }
  inputText.addEventListener("input", () => {
    results.innerHTML = "";
    errorMessage.innerHTML = "";
  });
});

document.getElementsByName("inputBox")[0].addEventListener("keyup", () => {
  let availableKeywords = [
    "dad",
    "racecar",
    "123321",
    "level",
    "rotator",
    "wow",
    "refer",
    "madam",
    "malayalam",
    "radar",
    "repaper",
  ];
  let autoBox = document.querySelector(".autocomplete-box");
  let inputbox = document.getElementsByName("inputBox")[0];

  if (inputbox.value.length) {
    let filteredResult = availableKeywords.filter((keyword) => {
      return keyword.startsWith(inputbox.value.toLowerCase().trim());
    });

    let content = filteredResult.map((list) => {
      return `<li onclick="selectInput(this)">${list}</li>`;
    });

    autoBox.innerHTML = `<ul>${content.join("")}</ul>`;
  } else {
    autoBox.innerHTML = "";
  }
});

function selectInput(list) {
  document.getElementsByName("inputBox")[0].value = list.innerHTML;
  document.querySelector(".autocomplete-box").innerHTML = "";
}
