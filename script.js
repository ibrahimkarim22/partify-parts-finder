const yearSelect = document.querySelector("#year");

function getUniqueValues(data, key) {
  const values = data.map((item) => item[key]);
  return [...new Set(values)].sort();
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

addOptions(yearSelect, years);
