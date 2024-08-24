const formContainer = document.getElementById("form-container");
const itemsSection = document.getElementById("items-section");
const posterPreview = document.getElementById("poster-preview");

const buttonStates = {
  heading: false,
  image: false,
  description: false,
};

const sectionOrder = ["heading", "image", "description"];

function createHeadingElement() {
  const fieldset = document.createElement("fieldset");
  fieldset.className =
    "flex-1 border-dashed border border-purple-300 p-4 rounded-lg relative heading-section";
  fieldset.innerHTML = `
    <legend class="bg-gray-200 px-2 rounded-lg pb-1 text-sm font-bold flex justify-between items-center">
      <span>Heading</span>
      <button class="absolute top-0 right-0 bg-white text-red-500 rounded-full px-1 shadow delete-btn">
        <i class="fas fa-times"></i>
      </button>
    </legend>
    <div class="mt-3">
      <input id="heading-input" type="text" placeholder="Dashboard" class="w-full p-2 text-sm border-2 rounded bg-white mb-2" />
      <div class="flex justify-between items-center">
        <div class="flex gap-1">
          <button class="bg-white px-2 py-1 text-sm font-semibold alignment-btn">
            <i class="fas fa-user-circle mr-1"></i> Left
          </button>
          <button class="bg-white px-2 py-1 text-sm font-semibold alignment-btn">
            <i class="fa-solid fa-sliders fa-rotate-90 mr-1"></i> Center
          </button>
          <button class="bg-white px-2 py-1 text-sm font-semibold alignment-btn">
            <i class="fa-solid fa-download mr-1"></i> Right
          </button>
        </div>
        <div class="flex gap-1">
          <button class="bg-white px-2 py-1 text-sm font-semibold color-btn">
            <i class="fas fa-user-circle mr-1"></i> Blue
          </button>
          <button class="bg-white px-2 py-1 text-sm font-semibold color-btn">
            <i class="fa-solid fa-sliders fa-rotate-90 mr-1"></i> Black
          </button>
          <button class="bg-white px-2 py-1 text-sm font-semibold color-btn">
            <i class="fa-solid fa-download mr-1"></i> Green
          </button>
        </div>
      </div>
    </div>
  `;

  fieldset
    .querySelector("#heading-input")
    .addEventListener("input", function () {
      updateHeadingPreview(this.value);
    });

  // Add alignment button event listeners
  const alignmentButtons = fieldset.querySelectorAll(".alignment-btn");
  alignmentButtons.forEach((button) => {
    button.addEventListener("click", function () {
      alignmentButtons.forEach((btn) => {
        btn.classList.remove("border-2", "border-blue-500", "text-blue-500");
      });
      button.classList.add("border-2", "border-blue-500", "text-blue-500");
      const alignment = button.textContent.trim().toLowerCase();
      updateHeadingPreview(null, alignment);
    });
  });

  // Add color button event listeners
  const colorButtons = fieldset.querySelectorAll(".color-btn");
  colorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      colorButtons.forEach((btn) => {
        btn.classList.remove("border-2", "border-blue-500", "text-blue-500");
      });
      button.classList.add("border-2", "border-blue-500", "text-blue-500");
      const color = button.textContent.trim().toLowerCase();
      updateHeadingPreview(null, null, color);
    });
  });

  return fieldset;
}

function createImageElement() {
  const fieldset = document.createElement("fieldset");
  fieldset.className =
    "flex-1 border-dashed border border-purple-300 p-4 rounded-lg relative image-section";
  fieldset.innerHTML = `
    <legend class="bg-gray-200 px-2 rounded-lg pb-1 text-sm font-bold flex justify-between items-center">
      <span>Poster Image</span>
      <button class="absolute top-0 right-0 bg-white text-red-500 rounded-full px-1 shadow delete-btn">
        <i class="fas fa-times"></i>
      </button>
    </legend>
    <div class="bg-white hover:bg-gray-100 transition duration-300 mt-3 py-16 flex justify-center items-center border-dashed border-2 border-gray-300 rounded-lg">
      <input id="image-input" type="file" accept="image/*" class="hidden" />
      <label for="image-input" class="text-center cursor-pointer">
        <div class="flex flex-col items-center">
          <i class="fas fa-cloud-upload-alt text-2xl text-gray-400 mb-3"></i>
          <p class="text-gray-400">
            <span class="font-bold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-400 mt-1">
            SVG, PNG, JPG or GIF (MAX. 800×400px)
          </p>
        </div>
      </label>
    </div>
  `;

  fieldset
    .querySelector("#image-input")
    .addEventListener("change", function () {
      updateImagePreview(this);
    });

  return fieldset;
}

function createDescriptionElement() {
  const fieldset = document.createElement("fieldset");
  fieldset.className =
    "flex-1 border-dashed border border-purple-300 p-4 rounded-lg relative description-section";
  fieldset.innerHTML = `
    <legend class="bg-gray-200 px-2 rounded-lg pb-1 text-sm font-bold flex justify-between items-center">
      <span>Description</span>
      <button class="absolute top-0 right-0 bg-white text-red-500 rounded-full px-1 shadow delete-btn">
        <i class="fas fa-times"></i>
      </button>
    </legend>
    <div class="mt-3">
      <textarea id="description-input" rows="3" placeholder="Write your thoughts here..." class="w-full p-2 text-sm border-2 rounded bg-white"></textarea>
    </div>
  `;

  fieldset
    .querySelector("#description-input")
    .addEventListener("input", function () {
      updateDescriptionPreview(this.value);
    });

  return fieldset;
}

function handleButtonClick(buttonId, createElementFn) {
  if (!buttonStates[buttonId]) {
    const element = createElementFn();

    // Remove existing element of the same type if present
    const existingElement = formContainer.querySelector(`.${buttonId}-section`);
    if (existingElement) {
      existingElement.remove();
    }

    // Insert the new element into the correct position
    const position = sectionOrder.indexOf(buttonId);
    const siblings = formContainer.querySelectorAll("fieldset");
    if (position < siblings.length) {
      formContainer.insertBefore(element, siblings[position]);
    } else {
      formContainer.appendChild(element);
    }

    // Move the items section after the new element
    formContainer.appendChild(itemsSection);

    // Update button state to prevent multiple insertions
    buttonStates[buttonId] = true;

    // Add delete functionality
    element.querySelector(".delete-btn").addEventListener("click", function () {
      element.remove();
      buttonStates[buttonId] = false;

      // Remove corresponding preview
      if (buttonId === "heading") {
        const headingPreview = posterPreview.querySelector("#heading-preview");
        if (headingPreview) {
          headingPreview.remove();
        }
      } else if (buttonId === "image") {
        const imagePreview = posterPreview.querySelector("#image-preview");
        if (imagePreview) {
          imagePreview.remove();
        }
      } else if (buttonId === "description") {
        const descriptionPreview = posterPreview.querySelector(
          "#description-preview"
        );
        if (descriptionPreview) {
          descriptionPreview.remove();
        }
      }

      updateItemsSection();
    });

    updateItemsSection();
  }
}

function updateItemsSection() {
  const addedElements = formContainer.querySelectorAll("fieldset");
  const componentButtons = itemsSection.querySelectorAll("button");

  let allButtonsAdded = true;

  componentButtons.forEach((button) => {
    const buttonId = button.id.replace("add-", "");

    if (buttonStates[buttonId]) {
      button.style.display = "none";
    } else {
      button.style.display = "block";
      allButtonsAdded = false; // Mark that not all buttons have been added
    }
  });

  // Show or hide items-section based on the state of buttons
  if (allButtonsAdded && addedElements.length > 0) {
    itemsSection.style.display = "none";
  } else {
    itemsSection.style.display = "block";
  }

  // Update the preview section order
  updatePreviewSectionOrder();
}

function updatePreviewSectionOrder() {
  const previewElements = {
    heading: posterPreview.querySelector("#heading-preview"),
    image: posterPreview.querySelector("#image-preview"),
    description: posterPreview.querySelector("#description-preview"),
  };

  // Clear preview section
  posterPreview.innerHTML = "";

  // Append elements in the order: Heading, Image, Description
  if (previewElements.heading)
    posterPreview.appendChild(previewElements.heading);
  if (previewElements.image) posterPreview.appendChild(previewElements.image);
  if (previewElements.description)
    posterPreview.appendChild(previewElements.description);

  // Ensure the preview section is visible
  posterPreview.style.display =
    posterPreview.childElementCount > 0 ? "block" : "none";
}

function updateHeadingPreview(text, alignment = null, color = null) {
  let headingPreview = posterPreview.querySelector("#heading-preview");

  if (!headingPreview) {
    headingPreview = document.createElement("h1");
    headingPreview.id = "heading-preview";
    posterPreview.appendChild(headingPreview);
  }

  if (text !== null) {
    headingPreview.textContent = text;
  }

  headingPreview.style.fontSize = "32px";

  if (alignment) {
    headingPreview.style.textAlign = alignment;
  }

  if (color) {
    headingPreview.style.color = color;
  }

  updatePreviewSectionOrder();
}

function updateImagePreview(inputElement) {
  const file = inputElement.files[0];
  let imagePreview = posterPreview.querySelector("#image-preview");

  if (!imagePreview) {
    imagePreview = document.createElement("img");
    imagePreview.id = "image-preview";
    posterPreview.appendChild(imagePreview);
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.className = "max-w-full h-auto mt-4";
      updatePreviewSectionOrder();
    };
    reader.readAsDataURL(file);
  }
}

function updateDescriptionPreview(text) {
  let descriptionPreview = posterPreview.querySelector("#description-preview");

  if (!descriptionPreview) {
    descriptionPreview = document.createElement("p");
    descriptionPreview.id = "description-preview";
    posterPreview.appendChild(descriptionPreview);
  }

  descriptionPreview.textContent = text;

  descriptionPreview.style.fontSize = "20px";
  descriptionPreview.style.marginTop = "10px";
  descriptionPreview.style.marginBottom = "50px";

  descriptionPreview.innerHTML = text.replace(/\n/g, "<br>");
  updatePreviewSectionOrder();
}

document.getElementById("add-heading").addEventListener("click", function () {
  handleButtonClick("heading", createHeadingElement);
});

document.getElementById("add-image").addEventListener("click", function () {
  handleButtonClick("image", createImageElement);
});

document
  .getElementById("add-description")
  .addEventListener("click", function () {
    handleButtonClick("description", createDescriptionElement);
  });
