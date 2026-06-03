const yearSelect = document.querySelector("#year");
const makeSelect = document.querySelector("#make");
const modelSelect = document.querySelector("#model");

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
modelSelect.disabled = true;
addOptions(yearSelect, years);

yearSelect.addEventListener("change", () => {
  resetSelect(makeSelect, "Select make");
  resetSelect(modelSelect, "Select model");
  modelSelect.disabled = true;

  if (yearSelect.value === "") {
    makeSelect.disabled = true;
    return;
  }

  const matchingRows = partsData.filter((part) => part.year === yearSelect.value);
  const makes = getUniqueValues(matchingRows, "make");

  addOptions(makeSelect, makes);
  makeSelect.disabled = false;
});

makeSelect.addEventListener("change", () => {
  resetSelect(modelSelect, "Select model");

  if (makeSelect.value === "") {
    modelSelect.disabled = true;
    return;
  }

  const matchingRows = partsData.filter((part) => {
    return part.year === yearSelect.value && part.make === makeSelect.value;
  });
  const models = getUniqueValues(matchingRows, "model");

  addOptions(modelSelect, models);
  modelSelect.disabled = false;
});
