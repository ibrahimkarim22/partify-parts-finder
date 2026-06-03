const form = document.querySelector("#parts-finder-form");
const message = document.querySelector("#message");
const yearSelect = document.querySelector("#year");
const makeSelect = document.querySelector("#make");
const modelSelect = document.querySelector("#model");
const productTypeSelect = document.querySelector("#product-type");

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
productTypeSelect.disabled = true;
addOptions(yearSelect, years);

yearSelect.addEventListener("change", () => {
  message.textContent = "";
  resetSelect(makeSelect, "Select make");
  resetSelect(modelSelect, "Select model");
  resetSelect(productTypeSelect, "Select product type");
  modelSelect.disabled = true;
  productTypeSelect.disabled = true;

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
  message.textContent = "";
  resetSelect(modelSelect, "Select model");
  resetSelect(productTypeSelect, "Select product type");
  productTypeSelect.disabled = true;

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

modelSelect.addEventListener("change", () => {
  message.textContent = "";
  resetSelect(productTypeSelect, "Select product type");

  if (modelSelect.value === "") {
    productTypeSelect.disabled = true;
    return;
  }

  const matchingRows = partsData.filter((part) => {
    return (
      part.year === yearSelect.value &&
      part.make === makeSelect.value &&
      part.model === modelSelect.value
    );
  });
  const productTypes = getUniqueValues(matchingRows, "productType");

  addOptions(productTypeSelect, productTypes);
  productTypeSelect.disabled = false;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "";

  if (
    yearSelect.value === "" ||
    makeSelect.value === "" ||
    modelSelect.value === "" ||
    productTypeSelect.value === ""
  ) {
    message.textContent = "Please select a year, make, model, and product type.";
    return;
  }

  const matchingPart = partsData.find((part) => {
    return (
      part.year === yearSelect.value &&
      part.make === makeSelect.value &&
      part.model === modelSelect.value &&
      part.productType === productTypeSelect.value
    );
  });

  if (!matchingPart) {
    message.textContent = "No matching collection was found. Please try again.";
    return;
  }

  window.location.href = matchingPart.url;
});
