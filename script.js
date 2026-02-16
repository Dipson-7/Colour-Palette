const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", function (e) {
  // If user clicks the copy icon
  if (e.target.classList.contains("copy-btn")) {
    const box = e.target.closest(".color-box");
    const hexValue = box.querySelector(".hex-value").textContent;

    navigator.clipboard.writeText(hexValue)
      .then(() => showCopySuccess(e.target))
      .catch((err) => console.log(err));
  }

  // If user clicks the color area
  else if (e.target.classList.contains("color")) {
    const box = e.target.closest(".color-box");
    const hexValue = box.querySelector(".hex-value").textContent;

    navigator.clipboard.writeText(hexValue)
      .then(() => showCopySuccess(box.querySelector(".copy-btn")))
      .catch((err) => console.log(err));
  }
});

function generatePalette() {
  const colors = [];
  for (let i = 0; i < 4; i++) {
    colors.push(generateRandomColor());
  }
  updatePaletteDisplay(colors);
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePaletteDisplay(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");
  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    if (!color) return;

    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");

    colorDiv.style.backgroundColor = color; // ✅ fixed
    hexValue.textContent = color;
  });
}

function showCopySuccess(copyBtn) {
  if (!copyBtn) return;

  copyBtn.classList.remove("far", "fa-copy");
  copyBtn.classList.add("fas", "fa-check");
  copyBtn.style.color = "#48bb78";

  setTimeout(() => {
    copyBtn.classList.remove("fas", "fa-check");
    copyBtn.classList.add("far", "fa-copy");
    copyBtn.style.color = "";
  }, 1500);
}

generatePalette();
