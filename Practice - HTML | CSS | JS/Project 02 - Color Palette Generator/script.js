// dom elements
const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

// event listeners
generateBtn.addEventListener("click", generatePalette);

// handle copy to clipboard for both color divs and copy icons
paletteContainer.addEventListener("click", (e) => {
  const copyBtn = e.target.closest(".copy-btn");
  const colorDiv = e.target.closest(".color");

  if (copyBtn || colorDiv) {
    const hexValue = e.target.closest(".color-box").querySelector(".hex-value").textContent;
    const copyIcon = e.target.closest(".color-box").querySelector(".copy-btn");

    navigator.clipboard.writeText(hexValue)
      .then(() => showCopySuccess(copyIcon))
      .catch(err => console.log(err));
  }
});

// show visual feedback when color is copied
function showCopySuccess(element) {
  element.classList.replace("fa-copy", "fa-check");
  element.classList.replace("far", "fas");
  element.style.color = "#48bb78";

  setTimeout(() => {
    element.classList.replace("fa-check", "fa-copy");
    element.classList.replace("fas", "far");
    element.style.color = "";
  }, 1500);
}

// generate random hex color
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  return "#" + Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join("");
}

// create HTML for a single color box
function createColorBox(color) {
  return `
  <div class="color-box">
    <div class="color" style="background-color: ${color}"></div>
    <div class="color-info">
      <span class="hex-value">${color}</span>
      <i class="far fa-copy copy-btn" title="Copy to clipboard"></i>
    </div>
  </div>
`;
}

// generate 5 random colors and update display
function generatePalette() {
  const colors = Array.from({ length: 5 }, generateRandomColor);
  paletteContainer.innerHTML = colors.map(createColorBox).join("");
}

// generate initial palette on page load
generatePalette();
