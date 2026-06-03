const yearSelect = document.querySelector("#year");
const makeSelect = document.querySelector("#make");

function getUniqueValues(data, key) {
  const values = data.map((item) => item[key]);
  return [...new Set(values)].sort();
}

function resetSelect(selectElement, placeholderText) {
  selectElement.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = placeholderText;

  selectElement.appendChild(placeholderOption);
}

function addOptions(selectElement, options) {
  options.forEach((optionText) => {
    const option = document.createElement("option");

    option.value = optionText;
    option.textContent = optionText;

    selectElement.appendChild(option);
  });
}

const years = getUniqueValues(partsData, "year");

makeSelect.disabled = true;
addOptions(yearSelect, years);

yearSelect.addEventListener("change", () => {
  resetSelect(makeSelect, "Select make");

  if (yearSelect.value === "") {
    makeSelect.disabled = true;
    return;
  }

  const matchingRows = partsData.filter((part) => part.year === yearSelect.value);
  const makes = getUniqueValues(matchingRows, "make");

  addOptions(makeSelect, makes);
  makeSelect.disabled = false;
});
