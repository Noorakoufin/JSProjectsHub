document.getElementById("search-bar").addEventListener("keyup", () => {
  // Main search function
  let input = document.getElementById("search-bar");
  let gridItem = document.querySelectorAll(".grid_item");
  let container = document.querySelector(".grid_container");
  const noResults = document.getElementById("noResults");
  let found = false;
  let visibleItems = 0;
  gridItem.forEach((element) => {
    const heading = element.querySelector("h3").textContent.toLowerCase().trim();
    if (heading.includes(input.value.toLowerCase().trim())) {
      element.classList.remove("hidden");
      visibleItems++;

      found = true;
    } else {
      element.classList.add("hidden");
    }
  });
  // Adjust the grid layout based on the number of visible items
  if (visibleItems === 0) {
    container.style.display = "block";
    container.style.marginBottom = "0";
  } else if (visibleItems <= 3) {
    container.style.gridTemplateRows = `repeat(1, 25vw)`; // Set rows according to visible items
  } else if (visibleItems <= 6) {
    container.style.gridTemplateRows = `repeat(2, 25vw)`;
  } else {
    container.style.gridTemplateRows = "repeat(4, 25vw)";
    container.style.rowGap = "10rem";
    container.style.columnGap = "7rem";
  }

  // Show or hide the no-results message
  noResults.style.display = found ? "none" : "block";
});

